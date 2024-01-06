import { useEffect, type FC } from 'react';
import { trpc } from '@/trpc/client/client';
import { useComputed, useMount, useObservable } from '@legendapp/state/react';
import { useAudioPlayer } from 'react-use-audio-player';

import {
	type LoteriaCardDataType,
	type LoteriaCardsDataType,
} from '@/types/loteriaQuery';
import { clearText } from '@/lib/utils';
import useConfetti from '@/hooks/useConfetti';
import usePlayLoteria from '@/hooks/usePlayLoteria';
import { useToast } from '@/hooks/useToast';

import { type RactivesMarkedRecord } from '../playLoteria/playLoteriaContext';
import { PlayLoteriaUIContext, type TypeWinners } from './playLoteriaUIContext';

interface Props {
	children: React.ReactNode;
}

const PlayLoteriaUIProvider: FC<Props> = ({ children }) => {
	const soundCounter = useAudioPlayer();
	const soundLeavePlayer = useAudioPlayer();
	const soundJoinPlayer = useAudioPlayer();
	const soundCheckCard = useAudioPlayer();
	const soundNextCard = useAudioPlayer();
	const soundWinGame = useAudioPlayer();
	const { toast } = useToast();

	const {
		socket,
		userInfo,
		cardsPlayer,
		initialReactives,
		initialGame,
		stateGame,
		allCards,
	} = usePlayLoteria();

	const generateRandomTableMutation =
		trpc.loteria.generateRandomTable.useMutation();
	const updatePlantillaCard = trpc.loteria.updatePlantillaCard.useMutation();
	const { startConfetti } = useConfetti();

	const showCountdownDialog = useObservable(false);
	const showEditPlantillaDialog = useObservable(false);
	const showLoteriaWinnerDialog = useObservable(false);
	const isGenerationRandomTable = useObservable(false);
	const placeWinning = useObservable(0);
	const passCards = useObservable(
		allCards.length - initialGame!.currentCard - 1,
	);
	const updateProgress = useObservable(100);
	const currentCard = useObservable<LoteriaCardDataType>(
		allCards[Math.max(0, initialGame!.currentCardPlayer - 1)],
	);
	const playersList = useObservable<string[]>([]);
	const winnersList = useObservable<TypeWinners>([]);
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
		soundCheckCard.load('/sounds/cardCheck.wav');
		soundNextCard.load('/sounds/nextCard.mp3');
		soundWinGame.load('/sounds/winGame.mp3');
	});

	useEffect(() => {
		socket?.removeListener('showCountdownDialog');
		socket?.on('showCountdownDialog', (show) => {
			showCountdownDialog.set(show);
		});
	}, [socket, showCountdownDialog]);

	useEffect(() => {
		socket?.removeListener('players');
		socket?.on('players', (players) => {
			playersList.set(players);
		});
	}, [socket, playersList]);

	useEffect(() => {
		socket?.removeListener('gameState');
		socket?.on('gameState', (state) => {
			stateGame.set(state);
		});
	}, [socket, stateGame]);

	useEffect(() => {
		socket?.removeListener('playerCurrentCard');
		socket?.on('playerCurrentCard', (index) => {
			const i = Math.max(0, index - 1);
			currentCard.set(allCards[i]);
			soundNextCard.play();
		});
	}, [socket, currentCard, allCards, soundNextCard]);

	useEffect(() => {
		socket?.removeListener('updateProgress');
		socket?.on('updateProgress', (value) => {
			updateProgress.set(value);
		});
	}, [socket, updateProgress]);

	useEffect(() => {
		socket?.removeListener('checkCardPlayer');
		socket?.on('checkCardPlayer', (id) => {
			plantillaChecks[id].set(true);
			soundCheckCard.play();
		});
	}, [socket, updateProgress, plantillaChecks, soundCheckCard]);

	useEffect(() => {
		socket?.removeListener('updateCurrentCard');
		socket?.on('updateCurrentCard', (i) => {
			passCards.set(allCards.length - i - 1);
		});
	}, [socket, passCards, allCards]);

	useEffect(() => {
		socket?.removeListener('winnersList');
		socket?.on('winnersList', (winners) => {
			winnersList.set(winners.slice(0, 3));
			const place = winners.length;
			if (place > 1) {
				const { player } = winners[place - 1];
				toast({
					title: `${player.nickName} logró el ${place}° lugar`,
					description: 'No te quedes atrás',
				});
			}
		});
	}, [socket, winnersList, toast]);

	useEffect(() => {
		socket?.removeListener('winner');
		socket?.on('winner', (place) => {
			soundWinGame.play();
			showLoteriaWinnerDialog.set(true);
			placeWinning.set(place);
			startConfetti();
			setTimeout(() => {
				showLoteriaWinnerDialog.set(false);
			}, 1000 * 10);
		});
	}, [
		socket,
		updateProgress,
		showLoteriaWinnerDialog,
		placeWinning,
		soundWinGame,
		startConfetti,
	]);

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

	const checkCard = (id: string) => {
		socket?.emit('checkCard', id);
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
				currentCard,
				updateProgress,
				checkCard,
				passCards,
				winnersList,
			}}
		>
			{children}
		</PlayLoteriaUIContext.Provider>
	);
};

export default PlayLoteriaUIProvider;
