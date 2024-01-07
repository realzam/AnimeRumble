'use client';

import { Memo, Show } from '@legendapp/state/react';

import usePlayLoteriaUI from '@/hooks/usePlayLoteriaUI';
import { Spinner } from '@/components/web/Spinner';

import LoteriaGridGererateButtons from './LoteriaGridGererateButtons';
import LoteriaItemGrid from './LoteriaItemGrid';
import LoteriaPlaceBandge from './LoteriaPlaceBandge';

const LoteriaGrid = () => {
	const { plantilla, isGenerationRandomTable } = usePlayLoteriaUI();

	return (
		<div className='container mb-4 mt-3 max-w-[650px] p-1 xs:p-2'>
			<LoteriaGridGererateButtons />
			<LoteriaPlaceBandge />

			<div className='relative mt-3 grid grid-cols-4 gap-1 xs:gap-2 sm:gap-5'>
				<Memo>
					{() => (
						<>
							{plantilla.get().map((card) => (
								<LoteriaItemGrid key={card.id} {...card} />
							))}
						</>
					)}
				</Memo>
				<Show if={isGenerationRandomTable}>
					<div className='absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center space-y-3'>
						<div className='h-24 w-24'>
							<Spinner />
						</div>
						<div>Generando...</div>
					</div>
				</Show>
			</div>
		</div>
	);
};

export default LoteriaGrid;
