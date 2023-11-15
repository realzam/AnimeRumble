import React, { useRef } from 'react';
import { trpc } from '@/trpc/client/client';
import { useObservable, useObserve } from '@legendapp/state/react';
import { useObservableQuery } from '@legendapp/state/react-hooks/useObservableQuery';
import { type UseBaseQueryResult } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';

import { type LoteriaCardsDataType } from '@/types/loteriaQuery';

import { LoteriaContex } from './LoteriaContex';

interface Props {
	initialCards: LoteriaCardsDataType;
	children: React.ReactNode;
}

type QQ = UseBaseQueryResult<LoteriaCardsDataType, unknown>;

const LoteriaProvider = ({ children, initialCards }: Props) => {
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

	return (
		<LoteriaContex.Provider
			value={{
				cards,
				props$,
				refForm,
			}}
		>
			{children}
		</LoteriaContex.Provider>
	);
};

export default LoteriaProvider;
