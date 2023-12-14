import { For, Show } from '@legendapp/state/react';

import usePlayLoteriaUI from '@/hooks/usePlayLoteriaUI';
import { Spinner } from '@/components/web/Spinner';

import LoteriaGridGererateButtons from './LoteriaGridGererateButtons';
import LoteriaItemGrid from './LoteriaItemGrid';

const LoteriaGrid = () => {
	const { currentCards, props } = usePlayLoteriaUI();
	return (
		<div className='container mb-4 mt-3 max-w-[620px] p-1 xs:p-2'>
			<LoteriaGridGererateButtons />
			<div className='relative mt-3 grid grid-cols-4 gap-2 xs:gap-5'>
				<For each={currentCards} item={LoteriaItemGrid} />
				<Show if={props.isFetching}>
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
