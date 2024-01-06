'use client';

import Image from 'next/image';
import { Memo, Show, useObservable, useObserve } from '@legendapp/state/react';
import { Search } from 'lucide-react';

import { clearText, cn, getStyleClassCardFit } from '@/lib/utils';
import usePlayLoteriaUI from '@/hooks/usePlayLoteriaUI';
import { Dialog, DialogContent } from '@ui/Dialog';
import { ScrollArea } from '@ui/ScrollArea';
import { AspectRatio } from '@/components/ui/AspectRatio';
import { Card } from '@/components/ui/Card';
import { ReactiveInput } from '@/components/web/ReactiveInput';

const LoteriaCardEditDialog = () => {
	const {
		editCardPlantilla,
		showEditPlantillaDialog,
		closeEditPlantillaDialog,
		allCardsSearch,
	} = usePlayLoteriaUI();

	const search = useObservable('');
	const list = useObservable(allCardsSearch.get());

	useObserve(allCardsSearch, () => {
		list.set(allCardsSearch.get());
	});

	useObserve(search, () => {
		const target = allCardsSearch
			.get()
			.filter((c) => c.titleSearch.includes(clearText(search.get())));
		list.set(target);
	});

	return (
		<Memo>
			{() => (
				<Dialog
					open={showEditPlantillaDialog.get()}
					onOpenChange={() => {
						closeEditPlantillaDialog();
					}}
				>
					<DialogContent className='p-0 sm:max-w-[600px]'>
						<div className='relative h-12'>
							<Search className='absolute left-3 top-4 h-4 w-4' />
							<ReactiveInput
								value={search}
								className='h-12 rounded-none border-0 border-b-2 px-9 focus-visible:border-primary focus-visible:ring-0'
							/>
						</div>
						<ScrollArea className='h-[272px] p-4' type='always'>
							<div className='grid grid-cols-4 gap-2 p-1'>
								{list.get().map((card) => (
									<Card
										key={card.id}
										className={cn(
											'select-none shadow-lg xs:p-2',
											!card.disable &&
												'cursor-pointer transition-all duration-300 xs:hover:ring-1 xs:hover:ring-primary',
										)}
										onClick={() => {
											console.log('click replace card');

											if (!card.disable) {
												editCardPlantilla(card.id);
											}
										}}
									>
										<AspectRatio ratio={3 / 5}>
											<div className='relative h-full w-full overflow-hidden rounded-sm'>
												<Image
													className={getStyleClassCardFit(card.fit)}
													alt={card.title}
													src={card.img}
													sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
													draggable='false'
													fill
													priority
												/>
												<div className='absolute bottom-0 w-full rounded-b-sm bg-slate-900/50 px-3 text-center text-xs capitalize text-white backdrop-blur-sm xs:text-sm'>
													{`${card.index}. ${card.title}`}
												</div>
												<Show if={card.disable}>
													<div className='absolute left-0 h-full w-full rounded-sm bg-slate-900/70 backdrop-blur-[2px]' />
												</Show>
											</div>
										</AspectRatio>
									</Card>
								))}
							</div>
						</ScrollArea>
					</DialogContent>
				</Dialog>
			)}
		</Memo>
	);
};

export default LoteriaCardEditDialog;
