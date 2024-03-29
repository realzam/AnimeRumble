'use client';

import LoteriaInfoAdminProvider from '@/context/loteriaInfoAdmin/LoteriaInfoAdminProvider';

import { type LoteriaCardsDataType } from '@/types/loteriaQuery';
import { ScrollArea } from '@ui/ScrollArea';

import LoteriaCardList from './LoteriaCardList';
import LoteriaForm from './LoteriaForm';

interface Props {
	cards: LoteriaCardsDataType;
}
const DashboardLoteriaContainer = ({ cards }: Props) => {
	return (
		<LoteriaInfoAdminProvider initialCards={cards}>
			<div className='h-[calc(100vh-3.5rem-1px)]'>
				<ScrollArea className='h-full' type='always'>
					<div className='mx-auto mt-9 w-[70%]'>
						<div className='flex flex-col'>
							<LoteriaForm />
							<LoteriaCardList />
						</div>
					</div>
				</ScrollArea>
			</div>
		</LoteriaInfoAdminProvider>
	);
};

export default DashboardLoteriaContainer;
