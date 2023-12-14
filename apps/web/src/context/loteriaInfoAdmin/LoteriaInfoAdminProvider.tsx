import React, { useRef } from 'react';
import { trpc } from '@/trpc/client/client';
import { useObservable, useObserve } from '@legendapp/state/react';
import { useObservableQuery } from '@legendapp/state/react-hooks/useObservableQuery';
import { type UseBaseQueryResult } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';

import { type LoteriaCardsDataType } from '@/types/loteriaQuery';

import { LoteriaInfoAdminContex, type UiType } from './LoteriaInfoAdminContex';

interface Props {
	initialCards: LoteriaCardsDataType;
	children: React.ReactNode;
}

type QQ = UseBaseQueryResult<LoteriaCardsDataType, unknown>;

const LoteriaInfoAdminProvider = ({ children, initialCards }: Props) => {
	const ui = useObservable<UiType>({
		CardsByPage: 8,
		page: 1,
		totalPages: Math.ceil(initialCards.length / 8),
	});
	const refForm = useRef<HTMLDivElement | null>(null);
	const utils = trpc.useUtils();
	const cards = useObservable(initialCards);
	const query$ = useObservableQuery({
		queryKey: getQueryKey(trpc.loteria.getCards, undefined, 'query'),
		queryFn: () =>
			utils.client.loteria.getCards
				.query()
				.then((res: LoteriaCardsDataType) => res),
		initialData: initialCards,
	});
	const props$ = useObservable<Omit<QQ, 'data'>>(() => {
		const q = query$.get();
		const { data: _, ...opt } = q;
		return opt;
	});

	useObserve(() => {
		const q = query$.get();
		const { data, ...opt } = q;
		console.log('LoteriaProvider', data);
		if (data) {
			cards.set(data);
		}
		props$.set(opt);
	});
	useObserve(() => {
		console.log('useObserve recalcular pagination');

		ui.set((u) => ({
			...u,
			page: 1,
			totalPages: Math.ceil(cards.get().length / ui.CardsByPage.get()),
		}));
	});

	return (
		<LoteriaInfoAdminContex.Provider
			value={{
				cards,
				props$,
				refForm,
				ui,
			}}
		>
			{children}
		</LoteriaInfoAdminContex.Provider>
	);
};

export default LoteriaInfoAdminProvider;
