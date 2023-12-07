import { useCallback, useEffect, useRef, useState } from 'react';
import { useMount, useObservable } from '@legendapp/state/react';
import { useAudioPlayer } from 'react-use-audio-player';

import { AnimePlayerContext, type AnimeTrack } from './AnimePlayerContext';

interface Props {
	tracks: AnimeTrack[];
	preloadNextTrack?: boolean;
	children: React.ReactNode;
}

type TypeTracksLoadedInfo = Record<string, number>;

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

	const [playOnLoad, setPlayOnLoad] = useState(false);
	const [endLastTrack, setEndLastTrack] = useState(false);
	const [forceNextSong, setForceNextSong] = useState(false);
	const [tracksLoaded, setTracksLoaded] = useState<TypeTracksLoadedInfo>({});

	const [waitForLoadInfo, setWaitForLoadInfo] = useState(false);
	const [waitForNextLoadInfo, setWaitForNextLoadInfo] = useState(false);

	const startInterval = useCallback(() => {
		clearInterval(p.current);
		p.current = setInterval(() => {
			pos.set(getPosition());
		}, 10);
	}, [getPosition, pos]);

	useEffect(() => {
		if (currentTrack) {
			const t = tracksLoaded[currentTrack.song];
			if (!t) {
				console.log('track was not found in loaded tracks getting info...');
				setWaitForLoadInfo(true);
			}
			load(currentTrack.song, {
				html5: true,
				format: 'mp3',
				onload: () => {
					console.log('finish onload track', currentTrack.song);
					if (playOnLoad) {
						play();
						setPlayOnLoad(false);
					}
				},

				onend: () => {
					if (songIndex === tracks.length - 1) {
						setEndLastTrack(true);
					}
					forceNext();
				},
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [load, currentTrack]);

	useEffect(() => {
		if (waitForLoadInfo && duration > 0) {
			console.log('save first track load info', {
				url: currentTrack.song,
				duration,
			});

			setTracksLoaded((s) => ({ ...s, [currentTrack.song]: duration }));
			setWaitForLoadInfo(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [duration]);

	useEffect(() => {
		if (waitForNextLoadInfo && nextSongState.duration > 0) {
			console.log('save nextSongState load info', {
				url: nextSongState.src,
				duration,
			});

			setTracksLoaded((s) => ({
				...s,
				[nextSongState.src!]: nextSongState.duration,
			}));
			setWaitForNextLoadInfo(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [nextSongState.duration]);

	useEffect(() => {
		console.log('tracks changed, new length', {
			tracksLength: tracks.length,
			tracks,
		});

		if (!playing && endLastTrack) {
			console.log('playing the new last song :)');
			nextSong();
			setEndLastTrack(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [tracks]);

	const preloadNextSong = () => {
		if (preloadNextTrack && songIndex + 1 < tracks.length) {
			const next = tracks[songIndex + 1];
			console.log('preload next song');
			nextSongState.load(next.song);
			setWaitForNextLoadInfo(true);
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
			console.log('useEffect. next forceNext', {
				songIndex,
				tracksLength: tracks.length,
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
		});
		setForceNextSong(true);
	};

	const nextSong = () => {
		console.log('next nextSong', {
			songIndex,
			tracksLength: tracks.length,
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

	const getDurationTrack = (url: string) => {
		const trackLoaded = tracksLoaded[url];
		return trackLoaded || 0;
	};

	return (
		<AnimePlayerContext.Provider
			value={{
				position: pos,
				tracksLength: tracks.length,
				trackIndex: songIndex,
				isReady,
				duration,
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
			}}
		>
			{tracks.length > 0 ? children : <div>Empty</div>}
		</AnimePlayerContext.Provider>
	);
};

export default AnimePlayerProvider;
