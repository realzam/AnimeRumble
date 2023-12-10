import { For, Show } from '@legendapp/state/react';

import usePlayLoteria from '@/hooks/usePlayLoteria';
import { Spinner } from '@/components/web/Spinner';

import LoteriaItemGrid from './LoteriaItemGrid';

const LoteriaGrid = () => {
	const { props, currentCards } = usePlayLoteria();
	return (
		<Show
			if={props.isFetching}
			else={
				<div className='grid grid-cols-4 gap-0 xs:gap-5'>
					<For each={currentCards} item={LoteriaItemGrid} />
				</div>
			}
		>
			<div className='flex h-[508px] w-full items-center justify-center'>
				<div className='h-10 w-10'>
					<Spinner />
				</div>
			</div>
		</Show>
	);
};

export default LoteriaGrid;
