'use client';

import { useCallback, useEffect, useRef } from 'react';
import {
	Computed,
	Memo,
	Show,
	useMount,
	useObservable,
	useUnmount,
} from '@legendapp/state/react';
import { Pause, Play } from 'lucide-react';
import { useAudioPlayer } from 'react-use-audio-player';

import { formatTime } from '@/lib/utils';
import { Button } from '@ui/Button';
import { Slider } from '@ui/Slider';

interface Props {
	src: string;
	name: string;
}

const SimpleAnimeAudioPlayer = ({ src, name }: Props) => {
	const {
		load,
		getPosition,
		duration,
		togglePlayPause,
		isLoading,
		playing,
		pause,
		play,
		seek,
		stop,
		cleanup,
	} = useAudioPlayer();

	const p = useRef<NodeJS.Timeout | undefined>(undefined);

	const position = useObservable(0);

	const startInterval = useCallback(() => {
		clearInterval(p.current);
		p.current = setInterval(() => {
			position.set(getPosition());
		}, 10);
	}, [getPosition, position]);

	const clearProgress = () => {
		clearInterval(p.current);
	};

	useMount(() => {
		load(src, {
			format: 'mp3',
		});
	});

	useUnmount(() => {
		stop();
		cleanup();
	});

	useEffect(() => {
		if (playing) {
			startInterval();
		} else {
			clearInterval(p.current);
		}
	}, [playing, startInterval]);

	return (
		<div className='flex flex-col space-y-3 p-4'>
			{/* song info (name and time) */}
			<div className='flex justify-between font-semibold'>
				<p>{name}</p>
				<div className='mr-8 flex'>
					<Memo>{() => formatTime(position.get())}</Memo>
					<p>/{formatTime(duration)}</p>
				</div>
			</div>

			{/* Progress bar */}

			<Computed>
				{() => (
					<Slider
						className='cursor-pointer'
						value={[position.get()]}
						max={duration}
						disabled={isLoading}
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

			{/* Controls */}
			<div>
				<Button
					variant='ghost'
					size='icon'
					onClick={() => togglePlayPause()}
					type='button'
					disabled={isLoading}
				>
					<Show if={playing} else={<Play className='fill-current' />}>
						<Pause className='fill-current' />
					</Show>
				</Button>
			</div>
		</div>
	);
};

export default SimpleAnimeAudioPlayer;
