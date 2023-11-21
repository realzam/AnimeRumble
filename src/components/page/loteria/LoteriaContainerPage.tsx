'use client';

import Image from 'next/image';
import { trpc } from '@/trpc/client/client';
import { Computed, Show, useObservable } from '@legendapp/state/react';

import { type LoteriaCardsDataType } from '@/types/loteriaQuery';
import { cn } from '@/lib/utils';
import { AspectRatio } from '@ui/AspectRatio';
import { Button } from '@ui/Button';
import { Card } from '@ui/Card';
import { ScrollArea } from '@ui/ScrollArea';
import { Spinner } from '@/components/web/Spinner';

interface Props {
	cards: LoteriaCardsDataType;
}
const LoteriaContainerPage = ({ cards }: Props) => {
	const ractivesMarked = useObservable<boolean[]>(
		Array.from({ length: 20 }).map(() => false),
	);

	const { data, refetch, isFetching } = trpc.loteria.getRandomCards.useQuery(
		undefined,
		{
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			enabled: false,
			initialData: cards,
		},
	);
	return (
		<ScrollArea className='h-full' type='always'>
			<div className='container mt-2 max-w-[600px] p-1 xs:p-2'>
				{isFetching ? (
					<div className='flex h-[508px] w-full items-center justify-center'>
						<div className='h-10 w-10'>
							<Spinner />
						</div>
					</div>
				) : (
					<>
						<div className='grid grid-cols-4 gap-0 xs:gap-5'>
							{data.map((card, i) => (
								<Computed key={card.id}>
									{() => (
										<Card
											className='flex cursor-pointer select-none shadow-lg transition-all duration-300 xs:p-2 xs:hover:scale-[1.05] xs:hover:ring xs:hover:ring-primary'
											onClick={() => {
												ractivesMarked[i].toggle();
											}}
										>
											<AspectRatio ratio={3 / 5}>
												<Image
													alt='up'
													src={card.img}
													className={cn(
														'rounded-sm',
														card.fit === 'cover'
															? 'object-cover'
															: 'object-fit',
													)}
													fill
												/>
												<div className='absolute bottom-0 w-full bg-slate-900/50 px-3 text-center text-xs capitalize text-white backdrop-blur-sm xs:text-sm'>
													{`${card.index}. ${card.title}`}
												</div>
												<Show if={ractivesMarked[i].get()}>
													<div className='absolute h-full w-full rounded-sm bg-slate-900/70 backdrop-blur-[2px]' />
												</Show>
											</AspectRatio>
										</Card>
									)}
								</Computed>
							))}
						</div>
					</>
				)}
				<div className='mt-5 flex justify-center'>
					<Button
						className='mr-5'
						variant='gradient'
						onClick={async () => {
							await refetch();
							ractivesMarked.set(Array.from({ length: 20 }).map(() => false));
						}}
					>
						Generar plantilla
					</Button>
					<Button
						className='ml-5'
						variant='destructive'
						onClick={() => {
							ractivesMarked.set(Array.from({ length: 20 }).map(() => false));
						}}
					>
						Limpiar plantilla
					</Button>
				</div>
			</div>
		</ScrollArea>
	);
};

export default LoteriaContainerPage;
