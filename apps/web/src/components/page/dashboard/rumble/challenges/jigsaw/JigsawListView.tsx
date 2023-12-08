'use client';

import Image from 'next/image';
import { trpc } from '@/trpc/client/client';

import { Card } from '@/components/ui/Card';
import { Spinner } from '@/components/web/Spinner';

const JigsawListView = () => {
	const { data, isLoading } = trpc.rumble.getJigsaws.useQuery(undefined, {
		initialData: [],
	});

	return (
		<div className='mt-16 px-5'>
			{isLoading || !data || data.length == 0 ? (
				<div className='mx-auto h-16 w-16'>
					<Spinner />
				</div>
			) : (
				<div className='grid grid-cols-2 gap-4'>
					{data.map((j) => (
						<Card
							key={j.id}
							className='relative col-span-1 h-56 w-full overflow-hidden'
						>
							<Image alt={j.name} src={j.img} fill className='object-contain' />
						</Card>
					))}
				</div>
			)}
		</div>
	);
};

export default JigsawListView;
