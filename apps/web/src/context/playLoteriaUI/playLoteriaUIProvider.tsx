import React, { useCallback, useMemo, useState, type FC } from 'react';
import { trpc } from '@/trpc/client/client';
import { useMount, useObservable, useObserve } from '@legendapp/state/react';
import { useObservableQuery } from '@legendapp/state/react-hooks/useObservableQuery';
import { getQueryKey } from '@trpc/react-query';

import { type LoteriaCardsDataType } from '@/types/loteriaQuery';
import { type TypeLoteriaRandomQueryProps } from '@/types/rumbleQuery';
import { quitarAcentos } from '@/lib/utils';

import {
	PlayLoteriaUIContext,
	type RactivesMarkedRecord,
	type SearchCard,
} from './playLoteriaUIContext';

interface Props {
	children: React.ReactNode;
	allCards: LoteriaCardsDataType;
	initialCards: LoteriaCardsDataType;
}

const PlayLoteriaUIProvider: FC<Props> = ({
	children,
	allCards,
	initialCards,
}) => {
	const currentCards$ = useObservable<LoteriaCardsDataType>([...initialCards]);
	const playMode = useObservable(true);

	const ractivesMarked = useObservable<RactivesMarkedRecord>(() => {
		const ractive: RactivesMarkedRecord = {};
		currentCards$.get().forEach((value) => {
			Object.assign(ractive, { [value.id]: false });
		});
		return ractive;
	});

	const clearText = useCallback((text: string) => {
		return text.toLowerCase().trim().replace(/\s+/g, '');
	}, []);

	const initialsearchList = useMemo<SearchCard[]>(
		() =>
			allCards.map((c, i) => ({
				...c,
				titleSearch: clearText(quitarAcentos(c.title)),
				disable: false,
				index: i + 1,
			})),
		[allCards, clearText],
	);

	const searchListProcess = () => {
		const newSearchList = [...initialsearchList];
		currentCards$.get().forEach((c) => {
			newSearchList[c.index - 1] = {
				...newSearchList[c.index - 1],
				disable: true,
			};
		});
		return newSearchList;
	};

	const [searchList, setSearchList] =
		useState<SearchCard[]>(searchListProcess());

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
		initialData: initialCards,
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
			currentCards$.set(data);
		}
		props.set(opt);
	});

	useObserve(currentCards$, () => {
		const ractive: RactivesMarkedRecord = {};
		currentCards$.get().forEach((value) => {
			Object.assign(ractive, { [value.id]: false });
		});
		ractivesMarked.set(ractive);
		setSearchList(searchListProcess());
	});

	const clearPlantilla = () => {
		Object.keys(ractivesMarked.get()).forEach(function (key) {
			ractivesMarked[key].set(false);
		});
	};

	const checkAllPlantilla = () => {
		Object.keys(ractivesMarked.get()).forEach(function (key) {
			ractivesMarked[key].set(true);
		});
	};

	const generateRandomCards = async () => {
		checkAllPlantilla();
		const e = props.get();
		await e.refetch({});
		clearPlantilla();
	};

	const toggleActiveCard = (key: string) => {
		if (playMode.get()) {
			ractivesMarked[key].set(!ractivesMarked.get()[key]);
		}
	};

	const replaceCard = (from: string, to: string) => {
		const newCards = [...currentCards$.get()];
		const iFrom = newCards.findIndex((c) => c.id === from);
		const iTo = allCards.find((c) => c.id === to);
		console.log('test', newCards, iFrom, !!iTo);

		if (iFrom != -1 && iTo) {
			console.log('replaceCard before', currentCards$.get());
			newCards[iFrom] = iTo;
			currentCards$.set([...newCards]);
			console.log('replaceCard after', currentCards$.get());
		}
	};

	useMount(() => {
		playMode.set(true);
		clearPlantilla();
	});

	return (
		<PlayLoteriaUIContext.Provider
			value={{
				props,
				generateRandomCards,
				clearPlantilla,
				allCards,
				currentCards: currentCards$,
				searchList,
				replaceCard,
				toggleActiveCard,
				ractivesMarked,
			}}
		>
			{children}
		</PlayLoteriaUIContext.Provider>
	);
};

export default PlayLoteriaUIProvider;
