import PlayLoteriaUIProvider from '@/context/playLoteriaUI/playLoteriaUIProvider';

import { ScrollArea } from '@/components/ui/ScrollArea';

import LoteriaCardEditDialog from './LoteriaCardEditDialog';
import LoteriaCountDownDialog from './LoteriaCountDownDialog';
import LoteriaGrid from './LoteriaGrid';
import LotericaPlayersCard from './LotericaPlayersCard';

const LoteriaPlayUi = () => {
	return (
		<PlayLoteriaUIProvider>
			<div className='flex h-[calc(100vh-3.5rem-1px)] w-full'>
				<LoteriaCountDownDialog />
				<LoteriaCardEditDialog />
				<ScrollArea className='h-full w-full' type='always'>
					<div className='flex w-full flex-col p-1 xs:p-2'>
						<LotericaPlayersCard />
						<LoteriaGrid />
					</div>
				</ScrollArea>
			</div>
		</PlayLoteriaUIProvider>
	);
};

export default LoteriaPlayUi;
