'use client';

import AnimePlayerProvider from '@/context/animePlayer/AnimePlayerProvider';
import { trpc } from '@/trpc/client/client';

import { Spinner } from '@/components/web/Spinner';

import SoundTrackListView from './SoundTrackListView';

const SoundtrackPlayerContainer = () => {
	const { data, isLoading } = trpc.rumble.getSoundtrack.useQuery(undefined, {
		initialData: [],
	});

	return (
		<div className='mt-16 px-5'>
			{isLoading || !data || data.length == 0 ? (
				<div className='mx-auto h-16 w-16'>
					<Spinner />
				</div>
			) : (
				<AnimePlayerProvider tracks={data || []} preloadNextTrack>
					<SoundTrackListView />
				</AnimePlayerProvider>
			)}
		</div>
	);
};

export default SoundtrackPlayerContainer;
