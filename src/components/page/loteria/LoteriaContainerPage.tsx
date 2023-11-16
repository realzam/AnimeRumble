'use client';

import Image from 'next/image';
import { trpc } from '@/trpc/client/client';

import { type LoteriaCardsDataType } from '@/types/loteriaQuery';
import { AspectRatio } from '@/components/ui/AspectRatio';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface Props {
	cards: LoteriaCardsDataType;
}
const LoteriaContainerPage = ({ cards }: Props) => {
	const { data, refetch } = trpc.loteria.getRandomCards.useQuery(undefined, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		enabled: false,
		initialData: cards,
	});
	return (
		<div className='container mt-2 max-w-[800px] p-1 xs:p-2'>
			<div className='grid grid-cols-4 gap-1 xs:gap-5'>
				{data.map((card) => (
					<Card key={card.id} className='flex p-2'>
						<AspectRatio ratio={3 / 5}>
							<Image
								alt='up'
								src={card.img}
								className={card.fit === 'cover' ? 'object-cover' : 'object-fit'}
								fill
							/>
							<div className='absolute bottom-0 w-full bg-slate-900/40 text-center text-white'>
								{`${card.index}. ${card.title}`}
							</div>
						</AspectRatio>
					</Card>
				))}
			</div>
			<div className='mt-5'>
				<Button
					className='mr-5'
					variant='secondary'
					onClick={() => {
						refetch();
					}}
				>
					Generar
				</Button>
				<Button className='ml-5' variant='destructive'>
					Limpiar
				</Button>
			</div>
		</div>
	);
};

export default LoteriaContainerPage;
