import Image from 'next/image';
import { Pause, Play } from 'lucide-react';

import { formatTime } from '@/lib/utils';
import useAnimeAudio from '@/hooks/useAnimeAudio';
import { ScrollArea } from '@ui/ScrollArea';
import { Button } from '@/components/ui/Button';
import { Card, CardDescription, CardTitle } from '@/components/ui/Card';

import AnimeAudioPlayer from './AnimeAudioPlayer';

const SoundtrackPlayerContainer = () => {
	const {
		currentTrack,
		tracksLength,
		tracks,
		playing,
		getDurationTrack,
		playSelectedTrack,
	} = useAnimeAudio();
	return (
		<Card className='relative mx-auto max-w-[700px] overflow-hidden'>
			<Image
				src={currentTrack.img || ''}
				alt={currentTrack.anime}
				className='absolute object-cover'
				fill
			/>
			<div className='grid w-full grid-cols-4 bg-slate-900/80 p-4 text-white backdrop-blur-md'>
				<div className='col-span-2 flex flex-col items-center p-4'>
					<Image
						width={200}
						height={200}
						src={currentTrack.img || ''}
						alt={currentTrack.anime}
						className='rounded-lg shadow-lg'
					/>
					<AnimeAudioPlayer />
				</div>
				<div className='col-span-2 space-y-4'>
					<div className='space-y-2'>
						<CardTitle>Lista de Soundtracks</CardTitle>
						<CardDescription>{tracksLength} Soundtracks</CardDescription>
					</div>
					<div className='h-[200px] w-full'>
						<ScrollArea>
							{tracks.map((t, i) => (
								<Button
									key={t.id}
									variant={t === currentTrack ? 'default' : 'ghost'}
									className='flex w-full justify-between'
									onClick={() => playSelectedTrack(i)}
								>
									<div className='shrink-0'>
										{t === currentTrack ? (
											<>
												{playing ? (
													<Play className='h-4 w-4 fill-current' />
												) : (
													<Pause className='h-4 w-4 fill-current' />
												)}
											</>
										) : (
											i + 1
										)}
									</div>
									<div>{t.anime}</div>
									<div className='shrink-0'>
										{getDurationTrack(i) > 0
											? formatTime(getDurationTrack(i))
											: '...'}
									</div>
								</Button>
							))}
						</ScrollArea>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default SoundtrackPlayerContainer;
