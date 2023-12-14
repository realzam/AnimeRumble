import React from 'react';

import { ScrollArea } from '@/components/ui/ScrollArea';

import LoteriaGrid from './LoteriaGrid';
import LotericaPlayersCard from './LotericaPlayersCard';

const LoteriaPlayUi = () => {
	return (
		<div className='flex h-[calc(100vh-3.5rem-1px)] w-full'>
			<ScrollArea className='h-full w-full' type='always'>
				<div className='flex w-full flex-col p-1 xs:p-2'>
					<LotericaPlayersCard />
					<LoteriaGrid />
				</div>
			</ScrollArea>
		</div>
	);
};

export default LoteriaPlayUi;
