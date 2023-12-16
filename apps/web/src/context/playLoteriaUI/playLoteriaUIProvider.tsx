import React, {
	useCallback,
	useEffect,
	useMemo,
	useState,
	type FC,
} from 'react';
import { trpc } from '@/trpc/client/client';
import { useComputed, useObservable, useObserve } from '@legendapp/state/react';
import { useObservableQuery } from '@legendapp/state/react-hooks/useObservableQuery';
import { getQueryKey } from '@trpc/react-query';

import { type LoteriaCardsDataType } from '@/types/loteriaQuery';
import { type TypeLoteriaRandomQueryProps } from '@/types/rumbleQuery';
import { quitarAcentos } from '@/lib/utils';
import usePlayLoteria from '@/hooks/usePlayLoteria';

import {
	PlayLoteriaUIContext,
	type RactivesMarkedRecord,
	type SearchCard,
} from './playLoteriaUIContext';

interface Props {
	children: React.ReactNode;
	allCards: LoteriaCardsDataType;
	initialCards: LoteriaCardsDataType;
	playersOnline: string[];
}

const PlayLoteriaUIProvider: FC<Props> = ({
	children,
	allCards,
	initialCards,
	playersOnline,
}) => {
	const { stateGame, socket } = usePlayLoteria();
	const [playersList, setPlayersList] = useState<string[]>(playersOnline);
	const [idChangeCard, setIdChangeCard] = useState('');
	const [isOpenChangeCardDialog, setIsOpenChangeCardDialog] = useState(false);
	const playMode = useComputed(() => stateGame.get() === 'play');
	const currentCards$ = useObservable<LoteriaCardsDataType>([...initialCards]);
	const defaultRactives = useMemo(() => {
		const ractive: RactivesMarkedRecord = {};
		allCards.forEach((value) => {
			Object.assign(ractive, { [value.id]: false });
		});
		return ractive;
	}, [allCards]);

	const ractivesMarked = useObservable<RactivesMarkedRecord>(defaultRactives);

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

	useEffect(() => {
		socket?.on('players', (playersSo) => {
			console.log('socket.onPlayers', playersSo);
			setPlayersList(playersSo);
		});
	}, [socket]);

	const clearPlantilla = () => {
		ractivesMarked.set(defaultRactives);
	};

	const generateRandomCards = async () => {
		const e = props.get();
		await e.refetch();
	};

	const toggleActiveCard = (key: string) => {
		if (playMode.get()) {
			ractivesMarked[key].set(!ractivesMarked.get()[key]);
		}
	};

	const openChangeCardDialog = (id: string) => {
		setIdChangeCard(id);
		setIsOpenChangeCardDialog(true);
	};

	const closeChangeCardDialog = () => {
		setIsOpenChangeCardDialog(false);
	};

	const replaceCard = (to: string) => {
		const from = idChangeCard;
		const toCard = allCards.find((c) => c.id === to);
		const iFrom = currentCards$.get().findIndex((c) => c.id === from);
		const isToInCurrent = currentCards$.get().find((c) => c.id === to);
		if (!playMode.get() && iFrom !== -1 && !isToInCurrent) {
			currentCards$[iFrom].set(toCard);
		}
	};

	useObserve(currentCards$, () => {
		setSearchList(searchListProcess());
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
				playMode,
				isOpenChangeCardDialog,
				openChangeCardDialog,
				closeChangeCardDialog,
				playersList,
			}}
		>
			{children}
		</PlayLoteriaUIContext.Provider>
	);
};

export default PlayLoteriaUIProvider;
