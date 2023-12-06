import Image from 'next/image';
import { trpc } from '@/trpc/client/client';

import { type GalleryDataType } from '@/types/rumbleQuery';
import { capitalized, cn } from '@/lib/utils';
import { Card, CardTitle } from '@/components/ui/Card';
import { Spinner } from '@/components/web/Spinner';

const GalleryListView = () => {
	const { data, isLoading } = trpc.rumble.getGallery.useQuery(undefined, {
		initialData: [],
	});
	if (isLoading) {
		return (
			<div className='mx-auto mt-16 h-16 w-16'>
				<Spinner />
			</div>
		);
	}
	return (
		<div className='mx-auto my-10 grid max-w-[800px] grid-cols-1 gap-4'>
			{data.map((g) => (
				<GalleryListItem key={g.id} gallery={g} />
			))}
		</div>
	);
};

const GalleryListItem = ({ gallery }: { gallery: GalleryDataType[0] }) => {
	return (
		<Card className='relative col-span-1 h-80 w-full p-2'>
			<div className='grid h-full w-full grid-cols-3'>
				<div className='relative col-span-2'>
					<Image
						src={gallery.img}
						alt={gallery.question}
						layout='fill'
						objectFit='contain'
					/>
				</div>
				<div className='col-span-1 flex flex-col items-center justify-center p-3'>
					<CardTitle className='text-lg'>{gallery.question}</CardTitle>
					<div className='mt-3 space-y-5'>
						{gallery.options.map((o, i) => (
							<p
								key={i}
								className={cn(
									i === gallery.answer && 'font-semibold text-green-500',
								)}
							>
								{`${gallery.isMultipleOption ? i + 1 + '.' : ''} ${capitalized(
									o,
								)}`}
							</p>
						))}
					</div>
				</div>
			</div>
		</Card>
	);
};

export default GalleryListView;
