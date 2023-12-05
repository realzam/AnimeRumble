import { useCallback, useEffect, useRef, useState } from 'react';
import { useMount, useObservable } from '@legendapp/state/react';
import { useAudioPlayer } from 'react-use-audio-player';

import { AnimePlayerContext, type AnimeTrack } from './AnimePlayerContext';

interface Props {
	tracks: AnimeTrack[];
	preloadNextTrack?: boolean;
	children: React.ReactNode;
}

interface TrackLoadedInfo {
	url: string;
	duration: number;
	isReady: boolean;
}

const AnimePlayerProvider = ({
	children,
	tracks,
	preloadNextTrack = false,
}: Props) => {
	const {
		load,
		togglePlayPause,
		playing,
		getPosition,
		duration,
		play,
		pause,
		seek,
		stop,
		isReady,
	} = useAudioPlayer();

	const nextSongState = useAudioPlayer();
	const p = useRef<NodeJS.Timeout | undefined>(undefined);
	const [songIndex, setSongIndex] = useState(0);
	const pos = useObservable(0);
	const [currentTrack, setCurrentTrack] = useState<AnimeTrack>(tracks[0]);

	const [tracksLoaded, setTracksLoaded] = useState<TrackLoadedInfo[]>(
		Array.from({ length: tracks.length }, () => ({
			url: '',
			duration: 0,
			isReady: false,
		})),
	);

	const [trackInfoLoaded, setTrackInfoLoaded] = useState<TrackLoadedInfo>(
		tracksLoaded[0],
	);
	const [waitForLoadInfo, setWaitForLoadInfo] = useState(false);
	const [waitForNextLoadInfo, setWaitForNextLoadInfo] = useState(false);

	const [playOnLoad, setPlayOnLoad] = useState(false);
	const [endLastTrack, setEndLastTrack] = useState(false);
	const [scroll, setScroll] = useState(false);
	const [scrollToTrack, setScrollToTrack] = useState('');
	const [forceNextSong, setForceNextSong] = useState(false);

	const startInterval = useCallback(() => {
		clearInterval(p.current);
		p.current = setInterval(() => {
			pos.set(getPosition());
		}, 10);
	}, [getPosition, pos]);

	useEffect(() => {
		if (currentTrack) {
			const index = tracksLoaded.findIndex((t) => t.url === currentTrack.song);
			if (index === -1) {
				console.log('track was not found in loaded tracks getting info...');
				setTrackInfoLoaded({
					url: '',
					duration: 0,
					isReady: false,
				});
				setWaitForLoadInfo(true);
			}
			load(currentTrack.song, {
				format: 'mp3',
				onload: () => {
					console.log('finish onload track', currentTrack.song);
					if (index !== -1) {
						console.log('track was previus load', tracksLoaded[index]);
						setTrackInfoLoaded(tracksLoaded[index]);
						if (playOnLoad) {
							play();
							setPlayOnLoad(false);
						}
					}
				},
				onend: () => {
					if (songIndex === tracks.length - 1) {
						setEndLastTrack(true);
						setScroll(true);
					}
					forceNext();
				},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [load, currentTrack]);

	useEffect(() => {
		console.log('tracks changed, new length', {
			tracksLength: tracks.length,
			tracks,
		});

		const diff = tracks.length - tracksLoaded.length;
		if (diff > 0) {
			console.log('addig new voidtracks', diff);

			const newVoidTracks = Array.from({ length: diff }, () => ({
				url: '',
				duration: 0,
				isReady: false,
			}));
			setTracksLoaded((s) => [...s, ...newVoidTracks]);
			preloadNextSong();
		}
		if (!playing && endLastTrack) {
			console.log('playing the new last song :)');
			nextSong();
			setEndLastTrack(false);
			setScrollToTrack(tracks[songIndex + 1].song);
			setTimeout(() => {
				setScroll(false);
			}, 500);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tracks]);

	useEffect(() => {
		if (waitForLoadInfo && duration > 0 && isReady) {
			console.log('save first track load info', {
				url: currentTrack.song,
				isReady,
				duration,
			});
			const track = {
				url: currentTrack.song,
				isReady,
				duration,
			};
			const newTracks = tracksLoaded.map((t, i) =>
				i === songIndex ? track : t,
			);
			setTracksLoaded(newTracks);
			setWaitForLoadInfo(false);
			setTrackInfoLoaded(track);
			if (playOnLoad) {
				play();
				setPlayOnLoad(false);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [duration, isReady]);

	/* next load info */
	useEffect(() => {
		if (
			waitForNextLoadInfo &&
			nextSongState.duration > 0 &&
			nextSongState.isReady
		) {
			const track = {
				url: nextSongState.src!,
				isReady: nextSongState.isReady,
				duration: nextSongState.duration,
			};
			console.log('save next track load info', track);

			const newTracks = tracksLoaded.map((t, i) =>
				i === songIndex + 1 ? track : t,
			);

			setTracksLoaded(newTracks);
			setWaitForNextLoadInfo(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [nextSongState.duration, nextSongState.isReady]);

	const preloadNextSong = () => {
		if (preloadNextTrack && songIndex + 1 < tracks.length) {
			const next = tracks[songIndex + 1];
			console.log('preload next song', tracksLoaded.length);
			const indexNext = tracksLoaded.findIndex((t) => t.url === next.song);
			if (indexNext === -1) {
				console.log('getting next song info');
				nextSongState.load(next.song);
				setWaitForNextLoadInfo(true);
			} else {
				console.log('next song already exists');
			}
		}
	};

	useEffect(() => {
		stop();
		pos.set(0);
		setCurrentTrack(tracks[songIndex]);
		preloadNextSong();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [songIndex]);

	useEffect(() => {
		if (playing) {
			startInterval();
		} else {
			clearInterval(p.current);
		}
	}, [playing, startInterval]);

	useEffect(() => {
		if (forceNextSong) {
			console.log('next forceNext', {
				songIndex,
				tracksLength: tracks.length,
				tracksLoadedLength: tracksLoaded.length,
			});
			nextSong();
			setForceNextSong(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [forceNextSong, , setForceNextSong]);

	useMount(() => {
		if (playing) {
			startInterval();
		} else {
			clearInterval(p.current);
		}
	});

	const clearProgress = () => {
		clearInterval(p.current);
	};

	const forceNext = () => {
		console.log('next forceNext', {
			songIndex,
			tracksLength: tracks.length,
			tracksLoadedLength: tracksLoaded.length,
		});
		setForceNextSong(true);
	};

	const nextSong = () => {
		console.log('next nextSong', {
			songIndex,
			tracksLength: tracks.length,
			tracksLoadedLength: tracksLoaded.length,
		});
		if (songIndex < tracks.length - 1) {
			setPlayOnLoad(true);
			setSongIndex((prev) => prev + 1);
			console.log('next click new:', songIndex);
		}
	};

	const previusSong = () => {
		console.log('prev click', songIndex);
		if (songIndex > 0) {
			setPlayOnLoad(true);
			setSongIndex((prev) => prev - 1);
			console.log('prev click new:', songIndex);
		}
	};

	const playSelectedTrack = (index: number) => {
		if (index >= 0 && index < tracks.length && index !== songIndex) {
			setPlayOnLoad(true);
			setSongIndex(index);
		}
	};

	const getDurationTrack = (index: number) => {
		if (index >= 0 && index < tracksLoaded.length) {
			return tracksLoaded[index].duration;
		}
		return 0;
	};

	return (
		<AnimePlayerContext.Provider
			value={{
				position: pos,
				tracksLength: tracks.length,
				trackIndex: songIndex,
				isReady: trackInfoLoaded.isReady,
				duration: trackInfoLoaded.duration,
				tracks,
				currentTrack,
				previusSong,
				nextSong,
				playing,
				togglePlayPause,
				seek,
				play,
				pause,
				clearProgress,
				stop,
				playSelectedTrack,
				getDurationTrack,
				scroll,
				scrollToTrack,
			}}
		>
			{tracks.length > 0 ? children : <div>Empty</div>}
		</AnimePlayerContext.Provider>
	);
};

export default AnimePlayerProvider;
