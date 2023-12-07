import { useEffect, useMemo } from 'react';
import { type AnimeTrack } from '@/context/animePlayer/AnimePlayerContext';
import { Pause, Play } from 'lucide-react';
import { activateTextTruncateScroll } from 'text-truncate-scroll';

import { formatTime } from '@/lib/utils';
import useAnimeAudio from '@/hooks/useAnimeAudio';
import { Button } from '@/components/ui/Button';

interface Props {
	track: AnimeTrack;
	index: number;
}

const SoundTrackListViewItem = ({ track, index }: Props) => {
	const { currentTrack, playing, getDurationTrack, playSelectedTrack } =
		useAnimeAudio();

	const trackDuration = useMemo(
		() => getDurationTrack(track.song),
		[track.song, getDurationTrack],
	);
	useEffect(() => {
		activateTextTruncateScroll();
	}, []);

	return (
		<Button
			variant={track === currentTrack ? 'default' : 'ghost'}
			className='grid w-full grid-cols-8 transition-colors duration-300'
			onClick={() => playSelectedTrack(index)}
		>
			<div className='col-span-1 flex justify-center'>
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
			<div className='text-truncate-scroll col-span-6 h-full text-left'>
				{track.anime}
			</div>
			<div className='col-span-1'>
				{trackDuration > 0 ? formatTime(trackDuration) : '...'}
			</div>
		</Button>
	);
};

export default SoundTrackListViewItem;
