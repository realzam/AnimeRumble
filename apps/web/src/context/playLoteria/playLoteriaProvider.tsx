import { useEffect, useState, type FC } from 'react';
import { trpc } from '@/trpc/client/client';
import { useMount, useObservable } from '@legendapp/state/react';
import { type LoteriaClientSocket } from 'anime-sockets-types';
import { decodeJwt } from 'jose';
import { type Session } from 'next-auth';

import { type JwtAnimePlayer } from '@/types/jwt.types';
import {
	type LoteriaCardsDataType,
	type LoteriaCurrentGameDataType,
} from '@/types/loteriaQuery';
import useSocket from '@/hooks/useSocket';

import {
	PlayLoteriaContext,
	type TypeStateGame,
	type TypeUserInfo,
} from './playLoteriaContext';

interface Props {
	initialCurrentGame: LoteriaCurrentGameDataType;
	initalSession: Session | null;
	children: React.ReactNode;
	allCards: LoteriaCardsDataType;
	playersOnline: string[];
}

const PlayLoteriaProvider: FC<Props> = ({
	children,
	initialCurrentGame,
	initalSession,
	allCards,
	playersOnline,
}) => {
	const [cardsPlayer, setCardsPlayer] = useState<LoteriaCardsDataType>([]);
	const stateGame = useObservable<TypeStateGame>('initializing');
	const joinToLoteria = trpc.loteria.joinToLoteria.useMutation();
	const loginLoteria = trpc.loteria.loginLoteria.useMutation();
	const userInfo = useObservable<TypeUserInfo | undefined>(() => {
		if (initalSession && initalSession.user) {
			return { userId: initalSession.user.id };
		}
	});

	const { conectarSocket, socket } = useSocket<LoteriaClientSocket>({
		room: 'loteria',
		onConnect: () => {
			console.log('onConnect ready');
			stateGame.set(initialCurrentGame?.state);
		},
	});

	const login = (jwt: string, playerCards: LoteriaCardsDataType) => {
		localStorage.setItem('anime.player', jwt);
		setCardsPlayer(playerCards);
		const { id, nick } = decodeJwt<JwtAnimePlayer>(jwt);
		userInfo.set({
			userId: id,
			nickname: nick,
		});
		conectarSocket();
	};

	const setStartupPage = () => {
		if (initialCurrentGame) {
			if (initalSession && initalSession.user && initalSession.user.nickName) {
				joinToLoteria.mutate(
					{
						nickName: initalSession.user.nickName,
					},
					{
						onSuccess: ({ jwt, playerCards }) => {
							setCardsPlayer(playerCards);
							login(jwt, playerCards);
						},
					},
				);
				return;
			}
			stateGame.set('nickNameForm');
			return;
		} else {
			stateGame.set('waitToRoom');
			return;
		}
	};

	useEffect(() => {
		socket?.on('connect_error', (error) => {
			console.log('connect_error', error);

			if (error.message === 'not authorized') {
				console.log('invalid token');
				window.localStorage.removeItem('anime.player');
				setStartupPage();
			}
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [socket]);
	useMount(() => {
		console.log('getting nextComponent');
		const jwt = window.localStorage.getItem('anime.player');
		console.log(jwt);
		if (jwt) {
			stateGame.set('waitSocketStartup');
			loginLoteria.mutate(
				{ jwt },
				{
					onSuccess: (playerCards) => {
						setCardsPlayer(playerCards);
						login(jwt, playerCards);
					},
				},
			);
			return;
		}
		setStartupPage();
	});

	return (
		<PlayLoteriaContext.Provider
			value={{
				stateGame,
				userInfo,
				login,
				socket,
				cardsPlayer,
				allCards,
				playersOnline,
			}}
		>
			{/* <PlayLoteriaUIProvider
				allCards={allCards}
				initialCards={cardsPlayer}
				playersOnline={playersOnline}
			>
				{children}
			</PlayLoteriaUIProvider> */}
			{children}
		</PlayLoteriaContext.Provider>
	);
};

export default PlayLoteriaProvider;
