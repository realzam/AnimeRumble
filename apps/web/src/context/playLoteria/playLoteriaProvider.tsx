import React, { useCallback, useMemo } from 'react';
import { trpc } from '@/trpc/client/client';
import { useMount, useObservable, useObserve } from '@legendapp/state/react';
import { useObservableQuery } from '@legendapp/state/react-hooks/useObservableQuery';
import { getQueryKey } from '@trpc/react-query';

import { type LoteriaCardsDataType } from '@/types/loteriaQuery';
import { type TypeLoteriaRandomQueryProps } from '@/types/rumbleQuery';
import { quitarAcentos } from '@/lib/utils';

import {
	PlayLoteriaContext,
	type RactivesMarkedRecord,
	type SearchCard,
} from './playLoteriaContext';

interface Props {
	children: React.ReactNode;
	allCards: LoteriaCardsDataType;
	currentCa: LoteriaCardsDataType;
}

const PlayLoteriaProvider = ({ children, allCards, currentCa }: Props) => {
	const currentCards = useObservable([...currentCa]);
	const playMode = useObservable(true);

	const ractivesMarked = useObservable<RactivesMarkedRecord>(() => {
		const ractive: RactivesMarkedRecord = {};
		currentCards.get().forEach((value) => {
			Object.assign(ractive, { [value.id]: false });
		});
		return ractive;
	});

	const utils = trpc.useUtils();
	const query$ = useObservableQuery({
		queryKey: getQueryKey(trpc.loteria.getRandomCards),
		queryFn: () =>
			utils.client.loteria.getRandomCards
				.query()
				.then((res) => res)
				.catch(),
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		enabled: false,
		initialData: currentCards,
	});

	const props = useObservable<TypeLoteriaRandomQueryProps>(() => {
		const q = query$.get();
		const { data: _, ...opt } = q;
		return opt;
	});

	useObserve(query$, () => {
		const q = query$.get();
		const { data, ...opt } = q;
		if (data) {
			currentCards.set(data);
		}
		props.set(opt);
	});

	const clearPlantilla = () => {
		Object.keys(ractivesMarked.get()).forEach(function (key) {
			ractivesMarked[key].set(false);
		});
	};

	const generateRandomCards = async () => {
		const e = props.get();
		await e.refetch();
	};

	const clearText = useCallback((text: string) => {
		return text.toLowerCase().trim().replace(/\s+/g, '');
	}, []);

	const searchList = useMemo<SearchCard[]>(
		() =>
			allCards.map((c, i) => ({
				...c,
				titleSearch: clearText(quitarAcentos(c.title)),
				disable: !!currentCards.get().find((d) => d.id === c.id),
				index: i + 1,
			})),
		[allCards, clearText, currentCards],
	);

	const toggleActiveCard = (key: string) => {
		if (playMode.get()) {
			ractivesMarked[key].set(!ractivesMarked.get()[key]);
		}
	};
	const replaceCard = (from: string, to: string) => {
		const newCards = [...currentCards.get()];
		const iFrom = newCards.findIndex((c) => c.id === from);
		const iTo = allCards.find((c) => c.id === to);
		console.log('test', newCards, iFrom, !!iTo);

		if (iFrom != -1 && iTo) {
			console.log('replaceCard before', currentCards.get());
			newCards[iFrom] = iTo;
			currentCards.set([...newCards]);
			console.log('replaceCard after', currentCards.get());
		}
	};

	useMount(() => {
		playMode.set(true);
		clearPlantilla();
	});

	return (
		<PlayLoteriaContext.Provider
			value={{
				props,
				generateRandomCards,
				clearPlantilla,
				playMode,
				allCards,
				currentCards,
				searchList,
				replaceCard,
				toggleActiveCard,
				ractivesMarked,
			}}
		>
			{children}
		</PlayLoteriaContext.Provider>
	);
};

export default PlayLoteriaProvider;
