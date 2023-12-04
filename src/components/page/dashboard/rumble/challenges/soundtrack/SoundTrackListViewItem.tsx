import { useMemo, useRef } from 'react';
import { type AnimeTrack } from '@/context/animePlayer/AnimePlayerContext';
import { useMount } from '@legendapp/state/react';
import { Pause, Play } from 'lucide-react';

import { formatTime } from '@/lib/utils';
import useAnimeAudio from '@/hooks/useAnimeAudio';
import { Button } from '@/components/ui/Button';

interface Props {
	track: AnimeTrack;
	index: number;
}
const SoundTrackListViewItem = ({ track, index }: Props) => {
	const {
		currentTrack,
		playing,
		getDurationTrack,
		playSelectedTrack,
		scroll,
		scrollToTrack,
	} = useAnimeAudio();

	const trackDuration = useMemo(
		() => getDurationTrack(index),
		[index, getDurationTrack],
	);
	const scollToRef = useRef<HTMLButtonElement | null>(null);

	useMount(() => {
		if (scroll && scrollToTrack === track.song) {
			scollToRef.current?.scrollIntoView();
		}
	});

	return (
		<Button
			ref={scollToRef}
			variant={track === currentTrack ? 'default' : 'ghost'}
			className='flex w-full justify-between transition-colors duration-300'
			onClick={() => playSelectedTrack(index)}
		>
			<div className='shrink-0'>
				{track === currentTrack ? (
					<>
						{playing ? (
							<Play className='h-4 w-4 fill-current' />
						) : (
							<Pause className='h-4 w-4 fill-current' />
						)}
					</>
				) : (
					index + 1
				)}
			</div>
			<div>{track.anime}</div>
			<div className='shrink-0'>
				{trackDuration > 0 ? formatTime(trackDuration) : '...'}
			</div>
		</Button>
	);
};

export default SoundTrackListViewItem;
