'use client';

import { Computed } from '@legendapp/state/react';

import useLoteria from '@/hooks/useLoteria';
import { CardTitle } from '@ui/Card';

import EmptyLoteriaCardList from './EmptyLoteriaCardList';
import LoteriaCardListItem from './LoteriaCardListItem';

const LoteriaCardList = () => {
	const { cards } = useLoteria();
	return (
		<div className='my-5 '>
			<CardTitle>Cartas de loteria</CardTitle>
			<div className='mt-5'>
				<Computed>
					{() => {
						return cards.get().length > 0 ? (
							<div className='grid grid-cols-4 gap-1 xs:gap-5'>
								{cards.get().map((c) => (
									<LoteriaCardListItem key={c.id} card={c} />
								))}
							</div>
						) : (
							<EmptyLoteriaCardList />
						);
					}}
				</Computed>
			</div>
		</div>
	);
};

export default LoteriaCardList;
