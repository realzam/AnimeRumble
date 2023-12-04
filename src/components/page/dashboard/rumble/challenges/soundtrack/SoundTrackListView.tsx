'use client';

import AnimePlayerProvider from '@/context/animePlayer/AnimePlayerProvider';
import { trpc } from '@/trpc/client/client';

import { Spinner } from '@/components/web/Spinner';

import SoundtrackPlayerContainer from './SoundtrackPlayerContainer';

const SoundTrackListView = () => {
	const { data, isLoading } = trpc.rumble.getSoundtrack.useQuery(undefined, {
		initialData: [],
		// staleTime: Infinity,
		// cacheTime: Infinity,
	});

	return (
		<div className='mt-16 px-5 '>
			{isLoading || !data || data.length == 0 ? (
				<div className='mx-auto h-16 w-16'>
					<Spinner />
				</div>
			) : (
				<AnimePlayerProvider tracks={data || []}>
					<SoundtrackPlayerContainer />
				</AnimePlayerProvider>
			)}
		</div>
	);
};

export default SoundTrackListView;
