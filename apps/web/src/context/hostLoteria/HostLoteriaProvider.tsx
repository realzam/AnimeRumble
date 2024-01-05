import React, { useEffect, useState } from 'react';
import { useMount, useObservable } from '@legendapp/state/react';
import {
	type LoteriaClientSocket,
	type WaitRoomClientSocket,
} from 'anime-sockets-types';
import { useAudioPlayer } from 'react-use-audio-player';

import { type LoteriaStartLoteriaHostDataType } from '@/types/loteriaQuery';
import { sleep } from '@/lib/utils';
import useSocket from '@/hooks/useSocket';

import { type TypeStateGame } from '../playLoteria/playLoteriaContext';
import { HostLoteriaIContext } from './HostLoteriaContex';

type Props = LoteriaStartLoteriaHostDataType & {
	playersOnline: string[];
	children: React.ReactNode;
};

const HostLoteriaProvider = ({
	token,
	children,
	game,
	cards,
	playersOnline,
	created,
}: Props) => {
	const soundCounter = useAudioPlayer();
	const soundLeavePlayer = useAudioPlayer();
	const soundJoinPlayer = useAudioPlayer();

	const stateGame = useObservable<TypeStateGame>('initializing');
	const [currentCard, setCurrenCard] = useState(game.currentCard);
	const [playersList, setPlayersList] = useState(playersOnline);
	const [cardsPassed, setCardsPassed] = useState(
		cards.slice(0, game.currentCard),
	);
	const [cardsMissed, setCardsMissed] = useState(
		cards.slice(game.currentCard + 1),
	);
	const [isPaused, setIsPaused] = useState(game.isPaused);
	// const [updateProgress, setUpdateProgress] = useState(100);
	const updateProgress = useObservable(100);

	const { conectarSocket, socket } = useSocket<LoteriaClientSocket>({
		room: 'loteria',
		onConnect: () => {
			console.log('onConnect ready', 'created', created);
			stateGame.set(game.state);
			if (created) {
				socket?.emit('gameCreated');
			}
		},
	});

	const {
		conectarSocket: conectarSocketWaitRoom,
		desconectarSocket,
		socket: waitRoomSocket,
	} = useSocket<WaitRoomClientSocket>({
		room: 'waitRoom',
		onConnect: async () => {
			waitRoomSocket?.emit('createLoteria');
			await sleep(500);
			desconectarSocket();
		},
	});

	useMount(() => {
		soundCounter.load('/sounds/countdown.mp3');
		soundLeavePlayer.load('/sounds/leavePlayer.mp3');
		soundJoinPlayer.load('/sounds/joinPlayer.mp3');
		conectarSocketWaitRoom();
	});

	useEffect(() => {
		socket?.removeListener('joinPlayer');
		socket?.on('joinPlayer', () => {
			soundJoinPlayer.play();
		});
	}, [socket, soundJoinPlayer]);

	useEffect(() => {
		socket?.removeListener('leavePlayer');
		socket?.on('leavePlayer', () => {
			soundLeavePlayer.play();
		});
	}, [socket, soundLeavePlayer]);

	useEffect(() => {
		socket?.on('players', (players) => {
			setPlayersList(players);
		});
	}, [socket]);

	useEffect(() => {
		socket?.removeListener('updateProgress');
		socket?.on('updateProgress', (value) => {
			updateProgress.set(value);
		});
	}, [socket, updateProgress]);

	useEffect(() => {
		socket?.on('isPausedGame', (isPaused) => {
			setIsPaused(isPaused);
		});
	}, [socket]);

	useEffect(() => {
		socket?.removeListener('gameState');
		socket?.on('gameState', (state) => {
			stateGame.set(state);
		});
	}, [socket, stateGame]);

	useEffect(() => {
		socket?.removeListener('updateCurrentCard');
		socket?.on('updateCurrentCard', (i) => {
			setCurrenCard(i);
			setCardsPassed(cards.slice(0, i));
			setCardsMissed(cards.slice(i + 1));
		});
	}, [socket, cards]);

	useEffect(() => {
		window.localStorage.setItem('anime.player', token);
		conectarSocket();
	}, [token, conectarSocket]);

	const startGame = () => {
		if (stateGame.get() === 'lobby') {
			socket?.emit('startGame');
		}
	};

	const goToLobbyGame = () => {
		if (stateGame.get() === 'play') {
			socket?.emit('goToLobbyGame');
		}
	};

	const nextCard = () => {
		socket?.emit('nextCard');
	};

	const togglePauseLoteria = () => {
		socket?.emit('togglePause');
	};

	return (
		<HostLoteriaIContext.Provider
			value={{
				cardsPassed,
				cardsMissed,
				currentCard,
				stateGame,
				playersList,
				startGame,
				goToLobbyGame,
				game,
				nextCard,
				togglePauseLoteria,
				isPaused,
				updateProgress,
				cards,
			}}
		>
			{children}
		</HostLoteriaIContext.Provider>
	);
};

export default HostLoteriaProvider;
