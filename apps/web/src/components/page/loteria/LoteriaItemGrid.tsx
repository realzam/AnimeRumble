import Image from 'next/image';
import { Memo, Show, useComputed } from '@legendapp/state/react';

import { type LoteriaCardDataType } from '@/types/loteriaQuery';
import { cn, getStyleClassCardFit } from '@/lib/utils';
import usePlayLoteriaUI from '@/hooks/usePlayLoteriaUI';
import { AspectRatio } from '@/components/ui/AspectRatio';
import { Card } from '@/components/ui/Card';

import LoteriaEditCardButton from './LoteriaEditCardButton';

type Props = LoteriaCardDataType;
const LoteriaItemGrid = (card: Props) => {
	const {
		allowEditPlantilla,
		plantillaChecks,
		isGenerationRandomTable,
		isPlaying,
		checkCard,
	} = usePlayLoteriaUI();

	const overlay = useComputed(
		() => plantillaChecks[card.id].get() || isGenerationRandomTable.get(),
	);

	const isClickable = useComputed(
		() => isPlaying.get() && !plantillaChecks[card.id].get(),
	);
	return (
		<Memo>
			{() => (
				<Card
					className={cn(
						'flex select-none shadow-lg transition-all duration-300 xs:p-2',
						isClickable.get() &&
							'cursor-pointer xs:hover:scale-[1.05] xs:hover:ring xs:hover:ring-primary',
					)}
					onClick={() => {
						if (isPlaying.get() && !overlay.get()) {
							checkCard(card.id);
						}
					}}
				>
					<AspectRatio ratio={3 / 5}>
						<Image
							alt={card.title}
							src={card.img}
							className={cn('rounded-sm', getStyleClassCardFit(card.fit))}
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
							fill
							priority
							draggable='false'
						/>
						<Show if={allowEditPlantilla}>
							<LoteriaEditCardButton id={card.id} />
						</Show>
						<div className='absolute bottom-0 w-full bg-slate-900/80 px-3 text-center text-2xs font-semibold capitalize tracking-wider text-white backdrop-blur-sm xs:text-xs sm:text-sm'>
							{card.title}
						</div>

						<Show if={overlay}>
							<div className='absolute h-full w-full rounded-sm rounded-b bg-slate-900/70 backdrop-blur-[2px]' />
						</Show>
					</AspectRatio>
				</Card>
			)}
		</Memo>
	);
};

export default LoteriaItemGrid;
