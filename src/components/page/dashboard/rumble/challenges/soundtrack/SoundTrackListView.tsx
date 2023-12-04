import Image from 'next/image';

import { cn } from '@/lib/utils';
import useAnimeAudio from '@/hooks/useAnimeAudio';
import { ScrollArea } from '@ui/ScrollArea';
import { Card, CardDescription, CardTitle } from '@/components/ui/Card';

import AnimeAudioPlayer from './AnimeAudioPlayer';
import SoundTrackListViewItem from './SoundTrackListViewItem';

const SoundTrackListView = () => {
	const { currentTrack, tracksLength, tracks } = useAnimeAudio();
	return (
		<Card className='relative mx-auto max-w-[700px] overflow-hidden'>
			<Image
				src={currentTrack.img || '/images/albumCover.jpg'}
				alt={currentTrack.anime}
				className='absolute object-cover'
				fill
			/>
			<div className='grid w-full grid-cols-4 bg-slate-900/70 p-4 text-white backdrop-blur-md'>
				<div className='col-span-2 flex flex-col items-center p-4'>
					<div className='relative h-[200px] w-[200px]'>
						<Image
							fill
							src={currentTrack.img || '/images/albumCover.jpg'}
							alt={currentTrack.anime}
							className={cn('rounded-lg shadow-lg')}
						/>
					</div>
					<AnimeAudioPlayer />
				</div>
				<div className='col-span-2 space-y-4'>
					<div className='space-y-2'>
						<CardTitle>Lista de Soundtracks</CardTitle>
						<CardDescription>{tracksLength} Soundtracks</CardDescription>
					</div>
					<div className='h-[250px] w-full'>
						<ScrollArea className='h-full' type='always'>
							<div className='h-full space-y-2 pr-2'>
								{tracks.map((t, i) => (
									<SoundTrackListViewItem key={t.id} track={t} index={i} />
								))}
							</div>
						</ScrollArea>
					</div>
				</div>
			</div>
		</Card>
	);
};

export default SoundTrackListView;
