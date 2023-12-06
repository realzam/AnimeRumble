'use client';

import { Computed, Show, useUnmount } from '@legendapp/state/react';
import { Pause, Play, SkipBack, SkipForward } from 'lucide-react';

import { formatTime } from '@/lib/utils';
import useAnimeAudio from '@/hooks/useAnimeAudio';
import { Button } from '@ui/Button';
import { Slider } from '@ui/Slider';

import SountrackInfoDialog from './SountrackInfoDialog';

const AnimeAudioPlayer = () => {
	const {
		playing,
		togglePlayPause,
		duration,
		position,
		pause,
		play,
		seek,
		isReady,
		nextSong,
		previusSong,
		clearProgress,
		tracksLength,
		trackIndex,
		stop,
	} = useAnimeAudio();
	useUnmount(() => {
		stop();
	});

	return (
		<div className='mt-3 w-full flex-col space-y-3'>
			{/* Progress bar */}
			<div className='flex justify-between space-x-3'>
				<Computed>
					{() => (
						<div className='min-w-[45px] shrink-0'>
							{formatTime(position.get())}
						</div>
					)}
				</Computed>
				<Computed>
					{() => (
						<Slider
							className='cursor-pointer'
							value={[position.get()]}
							max={duration}
							disabled={!isReady}
							onPointerDown={() => {
								clearProgress();
								pause();
							}}
							onValueCommit={(v) => {
								seek(v[0]);
								play();
							}}
							onValueChange={(v) => {
								position.set(v[0]);
							}}
						/>
					)}
				</Computed>

				<div className='min-w-[45px] shrink-0'>{formatTime(duration)}</div>
			</div>
			{/* Controls */}
			<div className='flex justify-evenly'>
				<Button
					variant='ghost'
					size='icon'
					onClick={() => previusSong()}
					type='button'
					disabled={!isReady || trackIndex <= 0}
				>
					<SkipBack className='fill-current' />
				</Button>

				<Button
					variant='ghost'
					size='icon'
					onClick={() => togglePlayPause()}
					type='button'
					// disabled={!isReady}
				>
					<Show if={playing} else={<Play className='fill-current' />}>
						<Pause className='fill-current' />
					</Show>
				</Button>

				<Button
					variant='ghost'
					size='icon'
					onClick={() => nextSong()}
					type='button'
					disabled={!isReady || trackIndex >= tracksLength - 1}
				>
					<SkipForward className='fill-current' />
				</Button>
				<SountrackInfoDialog />
			</div>
		</div>
	);
};

export default AnimeAudioPlayer;
