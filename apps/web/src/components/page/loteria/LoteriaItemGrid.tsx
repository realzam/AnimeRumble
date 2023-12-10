import Image from 'next/image';
import { type ObservableObject } from '@legendapp/state';
import { Computed, Show, useComputed } from '@legendapp/state/react';

import { type LoteriaCardsDataType } from '@/types/loteriaQuery';
import { cn } from '@/lib/utils';
import usePlayLoteria from '@/hooks/usePlayLoteria';
import { AspectRatio } from '@/components/ui/AspectRatio';
import { Card } from '@/components/ui/Card';

import CreateLoteriaDialog from './CreateLoteriaDialog';

interface Props {
	id: string;
	item: ObservableObject<LoteriaCardsDataType[0]>;
}
const LoteriaItemGrid = ({ item: card, id }: Props) => {
	const { playMode, toggleActiveCard, ractivesMarked } = usePlayLoteria();
	const overlay = useComputed(() => playMode.get() && ractivesMarked[id].get());
	const edit = useComputed(() => !playMode.get());
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
						toggleActiveCard(id);
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
							<CreateLoteriaDialog id={id} />
						</Show>
						<div className='absolute bottom-0 w-full bg-slate-900/50 px-3 text-center text-xs capitalize text-white backdrop-blur-sm xs:text-sm'>
							{`${card.index.get()}. ${card.title.get()}`}
						</div>

						<Show if={overlay}>
							<div className='absolute h-full w-full rounded-sm bg-slate-900/70 backdrop-blur-[2px]' />
						</Show>
					</AspectRatio>
				</Card>
			)}
		</Computed>
	);
};

export default LoteriaItemGrid;
