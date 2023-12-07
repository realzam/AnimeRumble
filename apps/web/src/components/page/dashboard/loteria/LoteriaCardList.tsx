'use client';

import { Computed, useSelector } from '@legendapp/state/react';

import useLoteria from '@/hooks/useLoteria';
import { CardTitle } from '@ui/Card';

import EmptyLoteriaCardList from './EmptyLoteriaCardList';
import ListPagination from './ListPagination';
import LoteriaCardListItem from './LoteriaCardListItem';

const LoteriaCardList = () => {
	const { cards, ui } = useLoteria();
	const cc = useSelector(() =>
		cards
			.get()
			.filter(
				(c) =>
					c.index > (ui.page.get() - 1) * ui.CardsByPage.get() &&
					c.index <= ui.page.get() * ui.CardsByPage.get(),
			),
	);
	return (
		<div className='my-5'>
			<CardTitle>Cartas de loteria</CardTitle>
			<div className='mt-5'>
				<ListPagination />
				<Computed>
					{() => {
						return cards.get().length > 0 ? (
							<div className='grid grid-cols-4 gap-1 xs:gap-5'>
								{cc.map((c) => (
									<LoteriaCardListItem key={c.id} card={c} />
								))}
							</div>
						) : (
							<EmptyLoteriaCardList />
						);
					}}
				</Computed>
				<ListPagination />
			</div>
		</div>
	);
};

export default LoteriaCardList;
