import React, { useEffect, useState } from 'react';
import { useMount, useObservable } from '@legendapp/state/react';
import { type LoteriaClientSocket } from 'anime-sockets-types';
import { useAudioPlayer } from 'react-use-audio-player';

import { type LoteriaStartLoteriaHostDataType } from '@/types/loteriaQuery';
import useSocket from '@/hooks/useSocket';

import { type TypeStateGame } from '../playLoteria/playLoteriaContext';
import { HostLoteriaIContext } from './HostLoteriaContex';

interface Props {
	token: string;
	children: React.ReactNode;
	game: LoteriaStartLoteriaHostDataType['game'];
	playersOnline: string[];
}
const HostLoteriaProvider = ({
	token,
	children,
	game,
	playersOnline,
}: Props) => {
	const soundCounter = useAudioPlayer();
	const soundLeavePlayer = useAudioPlayer();
	const soundJoinPlayer = useAudioPlayer();

	const stateGame = useObservable<TypeStateGame>('initializing');
	const [currentCard, setCurrenCard] = useState(game.currentCard);
	const [playersList, setPlayersList] = useState(playersOnline);
	const [cardsPassed, setCardsPassed] = useState(
		game.cards.slice(0, game.currentCard),
	);
	const [cardsMissed, setCardsMissed] = useState(
		game.cards.slice(game.currentCard + 1),
	);
	// cardsPassed: LoteriaCardsDataType;
	// cardsMissed: LoteriaCardsDataType;

	const { conectarSocket, socket } = useSocket<LoteriaClientSocket>({
		room: 'loteria',
		onConnect: () => {
			console.log('onConnect ready');
			stateGame.set(game.state);
		},
	});

	useMount(() => {
		soundCounter.load('/sounds/countdown.mp3');
		soundLeavePlayer.load('/sounds/leavePlayer.mp3');
		soundJoinPlayer.load('/sounds/joinPlayer.mp3');
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
		socket?.removeListener('gameState');
		socket?.on('gameState', (state) => {
			stateGame.set(state);
		});
	}, [socket, stateGame]);

	useEffect(() => {
		socket?.removeListener('updateCurrentCard');
		socket?.on('updateCurrentCard', (i) => {
			setCurrenCard(i);
			setCardsPassed(game.cards.slice(0, i));
			setCardsMissed(game.cards.slice(i + 1));
		});
	}, [socket, game.cards]);

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
			}}
		>
			{children}
		</HostLoteriaIContext.Provider>
	);
};

export default HostLoteriaProvider;
