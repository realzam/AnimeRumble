'use client';

import LoteriaProvider from '@/context/loteria/LoteriaProvider';

import { type LoteriaCardsDataType } from '@/types/loteriaQuery';
import { ScrollArea } from '@ui/ScrollArea';

import LoteriaCardList from './LoteriaCardList';
import LoteriaForm from './LoteriaForm';

interface Props {
	cards: LoteriaCardsDataType;
}
const DashboardLoteriaContainer = ({ cards }: Props) => {
	return (
		<LoteriaProvider initialCards={cards}>
			<div className='h-[calc(100vh-3.5rem-1px)]'>
				<ScrollArea className='w-full'>
					<div className='flex h-[calc(100vh-3.5rem-1px)] flex-col items-center'>
						<div className='mt-9 w-[70%]'>
							<LoteriaForm />
							<LoteriaCardList />
						</div>
					</div>
				</ScrollArea>
			</div>
		</LoteriaProvider>
	);
};

export default DashboardLoteriaContainer;
