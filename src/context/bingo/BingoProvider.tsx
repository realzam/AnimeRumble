'use client';

import { trpc } from '@/trpc/client/client';
import { useObservable, useObserve } from '@legendapp/state/react';
import { useObservableQuery } from '@legendapp/state/react-hooks/useObservableQuery';
import { type UseBaseQueryResult } from '@tanstack/react-query';
import { getQueryKey } from '@trpc/react-query';

import { type BingoReactivesDataType } from '@/types/bingoQuery';

import { BingoContex } from './BingoContex';

interface Props {
	initialReactives: BingoReactivesDataType;
	children: React.ReactNode;
}

type QQ = UseBaseQueryResult<BingoReactivesDataType, unknown>;

const BingoProvider = ({ children, initialReactives }: Props) => {
	const utils = trpc.useUtils();
	const reactives = useObservable<BingoReactivesDataType>(initialReactives);
	const query$ = useObservableQuery({
		queryKey: getQueryKey(trpc.bingo.getReactives, undefined, 'query'),
		queryFn: () =>
			utils.client.bingo.getReactives
				.query()
				.then((res: BingoReactivesDataType) => res),
		initialData: initialReactives,
	});
	const props$ = useObservable<Omit<QQ, 'data'>>(() => {
		const q = query$.get();
		const { data: _, ...opt } = q;
		return opt;
	});

	useObserve(() => {
		const q = query$.get();
		const { data, ...opt } = q;
		console.log('BingoProvider', data);
		if (data) {
			reactives.set(data);
		}
		props$.set(opt);
	});

	return (
		<BingoContex.Provider
			value={{
				props$,
				reactives,
			}}
		>
			{children}
		</BingoContex.Provider>
	);
};

export default BingoProvider;
