'use client';

import BingoProvider from '@/context/bingo/BingoProvider';

import { type BingoReactivesDataType } from '@/types/bingoQuery';
import { CardTitle } from '@ui/Card';
import { ScrollArea } from '@/components/ui/ScrollArea';

import BingoForm from './BingoForm';
import BingoTable from './BingoTable';

interface Props {
	reactives: BingoReactivesDataType;
}
const DashboardBingoContainer = ({ reactives }: Props) => {
	return (
		<BingoProvider initialReactives={reactives}>
			<div className='h-[calc(100vh-3.5rem-1px)]'>
				<ScrollArea className='h-full' type='always'>
					<div className='mx-auto mt-9 w-[70%]'>
						<div className='flex flex-col'>
							<BingoForm />
							<div className='mt-5 '>
								<CardTitle>Reactivos de bingo</CardTitle>
								<BingoTable />
							</div>
						</div>
					</div>
				</ScrollArea>
			</div>
		</BingoProvider>
	);
};

export default DashboardBingoContainer;
