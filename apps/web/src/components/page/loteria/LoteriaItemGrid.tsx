import Image from 'next/image';
import { type ObservableObject } from '@legendapp/state';
import { Computed, Show, useComputed } from '@legendapp/state/react';

import { type LoteriaCardsDataType } from '@/types/loteriaQuery';
import { cn } from '@/lib/utils';
import usePlayLoteria from '@/hooks/usePlayLoteria';
// import CreateLoteriaDialog from './CreateLoteriaDialog';
import usePlayLoteriaUI from '@/hooks/usePlayLoteriaUI';
import { AspectRatio } from '@/components/ui/AspectRatio';
import { Card } from '@/components/ui/Card';

import LoteriaCardEditDialog from './LoteriaCardEditDialog';

interface Props {
	id: string;
	item: ObservableObject<LoteriaCardsDataType[0]>;
}
const LoteriaItemGrid = ({ item: card, id }: Props) => {
	const { stateGame } = usePlayLoteria();
	const { ractivesMarked, toggleActiveCard, props } = usePlayLoteriaUI();
	const playMode = useComputed(() => stateGame.get() === 'play');
	const overlay = useComputed(() => ractivesMarked[id].get());
	const edit = useComputed(
		() => stateGame.get() === 'lobby' && !props.isFetching.get(),
	);
	return (
		<Computed>
			{() => (
				<Card
					className={cn(
						'flex select-none shadow-lg transition-all duration-300 xs:p-2',
						playMode.get() &&
							'cursor-pointer xs:hover:scale-[1.05] xs:hover:ring xs:hover:ring-primary',
					)}
					onClick={() => {
						if (playMode.get()) {
							toggleActiveCard(id);
						}
					}}
				>
					<AspectRatio ratio={3 / 5}>
						<Image
							alt='up'
							src={card.img.get()}
							className={cn(
								'rounded-sm',
								card.fit.get() === 'cover' ? 'object-cover' : 'object-fit',
							)}
							fill
							priority
						/>
						<Show if={edit}>
							<LoteriaCardEditDialog id={id} />
						</Show>
						<div className='xs:text-sm absolute bottom-0 w-full bg-slate-900/80 px-3 text-center text-2xs font-semibold capitalize tracking-wider text-white backdrop-blur-sm'>
							{card.title.get()}
						</div>

						<Show if={overlay}>
							<div className='absolute h-full w-full rounded-sm rounded-b bg-slate-900/70 backdrop-blur-[2px]' />
						</Show>
					</AspectRatio>
				</Card>
			)}
		</Computed>
	);
};

export default LoteriaItemGrid;
