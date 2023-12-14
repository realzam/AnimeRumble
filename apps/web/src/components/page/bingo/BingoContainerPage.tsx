'use client';

import { trpc } from '@/trpc/client/client';
import { Computed, Show, useObservable } from '@legendapp/state/react';
import { ScrollArea } from '@radix-ui/react-scroll-area';

import { type BingoReactivesDataType } from '@/types/bingoQuery';
import { Button } from '@ui/Button';
import { Card, CardTitle } from '@ui/Card';
import { Spinner } from '@/components/web/Spinner';

interface Props {
	reactives: BingoReactivesDataType;
}
const BingoContainerPage = ({ reactives }: Props) => {
	const ractivesMarked = useObservable<boolean[]>(
		Array.from({ length: 16 }).map(() => false),
	);
	const { data, refetch, isFetching } = trpc.bingo.getRandomReactives.useQuery(
		undefined,
		{
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			enabled: false,
			initialData: reactives,
		},
	);
	return (
		<ScrollArea className='h-full' type='always'>
			<div className='container mt-2 max-w-[800px] p-1 xs:p-2'>
				{isFetching ? (
					<div className='flex h-[508px] w-full items-center justify-center'>
						<div className='h-10 w-10'>
							<Spinner />
						</div>
					</div>
				) : (
					<>
						<div className='grid grid-cols-4 gap-1 xs:gap-2 md:gap-5'>
							{data.map((reactive, i) => (
								<Computed key={reactive.id}>
									{() => (
										<>
											<Card
												className='relative flex h-36 cursor-pointer items-center justify-center overflow-hidden rounded-none text-center shadow-lg transition-all duration-300 xs:h-28 xs:rounded-xl xs:hover:scale-[1.05] xs:hover:ring xs:hover:ring-primary'
												onClick={() => {
													ractivesMarked[i].toggle();
												}}
											>
												<CardTitle className='xs:text-sm hyphens-auto text-xs'>
													{reactive.response}
												</CardTitle>
												<Show if={ractivesMarked[i].get()}>
													<div className='absolute h-full w-full bg-primary/20 backdrop-blur-[2px]' />
												</Show>
											</Card>
										</>
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
							ractivesMarked.set(Array.from({ length: 16 }).map(() => false));
						}}
					>
						Generar nueva plantilla
					</Button>
					<Button
						className='ml-5'
						variant='destructive'
						onClick={() => {
							ractivesMarked.set(Array.from({ length: 16 }).map(() => false));
						}}
					>
						Limpiar plantilla
					</Button>
				</div>
			</div>
		</ScrollArea>
	);
};

export default BingoContainerPage;
