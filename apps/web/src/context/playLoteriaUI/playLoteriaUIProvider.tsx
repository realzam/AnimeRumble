import { useEffect, type FC } from 'react';
import { trpc } from '@/trpc/client/client';
import { useComputed, useMount, useObservable } from '@legendapp/state/react';
import { useAudioPlayer } from 'react-use-audio-player';

import { type LoteriaCardsDataType } from '@/types/loteriaQuery';
import { clearText } from '@/lib/utils';
import usePlayLoteria from '@/hooks/usePlayLoteria';

import { type RactivesMarkedRecord } from '../playLoteria/playLoteriaContext';
import { PlayLoteriaUIContext } from './playLoteriaUIContext';

interface Props {
	children: React.ReactNode;
}

const PlayLoteriaUIProvider: FC<Props> = ({ children }) => {
	const soundCounter = useAudioPlayer();
	const soundLeavePlayer = useAudioPlayer();
	const soundJoinPlayer = useAudioPlayer();
	const {
		socket,
		userInfo,
		cardsPlayer,
		initialReactives,
		stateGame,
		allCards,
	} = usePlayLoteria();

	const generateRandomTableMutation =
		trpc.loteria.generateRandomTable.useMutation();
	const updatePlantillaCard = trpc.loteria.updatePlantillaCard.useMutation();

	const showCountdownDialog = useObservable(false);
	const showEditPlantillaDialog = useObservable(false);
	const showLoteriaWinnerDialog = useObservable(false);
	const isGenerationRandomTable = useObservable(false);
	const placeWinning = useObservable(0);

	const playersList = useObservable<string[]>([]);
	const editCard = useObservable({ id: '', index: 0 });
	const plantilla = useObservable<LoteriaCardsDataType>([...cardsPlayer]);
	const plantillaChecks = useObservable<RactivesMarkedRecord>(initialReactives);
	const allowEditPlantilla = useComputed(
		() => stateGame.get() === 'lobby' && !isGenerationRandomTable.get(),
	);
	const isPlaying = useComputed(() => stateGame.get() === 'play');
	const allCardsSearch = useObservable(() =>
		allCards.map((c) => ({
			...c,
			titleSearch: clearText(c.title),
			disable: Object.hasOwn(plantillaChecks.get(), c.id),
		})),
	);

	const setAllCardsSearch = () => {
		console.log('setAllCardsSearch', plantillaChecks.get());

		const list = allCards.map((c) => ({
			...c,
			titleSearch: clearText(c.title),
			disable: Object.hasOwn(plantillaChecks.get(), c.id),
		}));
		console.log('setAllCardsSearch list', list);
		allCardsSearch.set(list);
	};
	useMount(() => {
		soundCounter.load('/sounds/countdown.mp3');
		soundLeavePlayer.load('/sounds/leavePlayer.mp3');
		soundJoinPlayer.load('/sounds/joinPlayer.mp3');
	});

	/*Dialogs events */
	useEffect(() => {
		socket?.removeListener('showCountdownDialog');
		socket?.on('showCountdownDialog', (show) => {
			showCountdownDialog.set(show);
		});
	}, [socket, showCountdownDialog]);

	useEffect(() => {
		socket?.on('players', (players) => {
			playersList.set(players);
		});
	}, [socket, playersList]);

	const generateRandomTable = () => {
		console.log('generateRandomTable');

		isGenerationRandomTable.set(true);
		generateRandomTableMutation.mutate(
			{ jwt: userInfo.get()!.jwt },
			{
				onSuccess: ({ reactive, playerCards }) => {
					console.log('generateRandomTable onSucces');

					plantilla.set(playerCards);
					plantillaChecks.set(reactive);
					setAllCardsSearch();
				},
				onSettled: () => {
					isGenerationRandomTable.set(false);
				},
			},
		);
	};
	const openEditPlantillaDialog = (id: string) => {
		const index = cardsPlayer.findIndex((c) => c.id === id);
		if (index !== -1) {
			editCard.set({
				id,
				index,
			});
			showEditPlantillaDialog.set(true);
			console.log('openEditPlantillaDialog', showEditPlantillaDialog.get());
		}
	};
	const closeEditPlantillaDialog = () => {
		showEditPlantillaDialog.set(false);
		editCard.set({
			id: '',
			index: 0,
		});
	};
	const editCardPlantilla = (id: string) => {
		const card = allCards.find((c) => c.id === id);
		if (card) {
			const checks = plantillaChecks.get();
			const edit = editCard.get();
			delete checks[edit.id];
			Object.assign(checks, { [id]: false });
			const newCards = plantilla.get();
			newCards[edit.index] = card;
			plantillaChecks.set(checks);
			plantilla.set([]);
			plantilla.set([...newCards]);
			closeEditPlantillaDialog();
			setAllCardsSearch();
			updatePlantillaCard.mutate({
				jwt: userInfo.get()!.jwt,
				from: edit.id,
				to: id,
			});
		}
	};

	return (
		<PlayLoteriaUIContext.Provider
			value={{
				soundCounter,
				placeWinning,
				showCountdownDialog,
				showLoteriaWinnerDialog,
				playersList,
				generateRandomTable,
				isGenerationRandomTable,
				plantilla,
				plantillaChecks,
				allowEditPlantilla,
				isPlaying,
				showEditPlantillaDialog,
				openEditPlantillaDialog,
				closeEditPlantillaDialog,
				editCardPlantilla,
				allCardsSearch,
			}}
		>
			{children}
		</PlayLoteriaUIContext.Provider>
	);
};

export default PlayLoteriaUIProvider;
