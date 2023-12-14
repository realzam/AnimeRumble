import { useEffect, type FC } from 'react';
import { trpc } from '@/trpc/client/client';
import { useMount, useObservable } from '@legendapp/state/react';
import { type LoteriaClientSocket } from 'anime-sockets-types';
import { type Session } from 'next-auth';

import {
	type LoteriaCardsDataType,
	type LoteriaCurrentGameDataType,
} from '@/types/loteriaQuery';
import useSocket from '@/hooks/useSocket';

import PlayLoteriaUIProvider from '../playLoteriaUI/playLoteriaUIProvider';
import {
	PlayLoteriaContext,
	type TypeStateGame,
	type TypeUserInfo,
} from './playLoteriaContext';

interface Props {
	initialCurrentGame: LoteriaCurrentGameDataType;
	initalSession: Session | null;
	children: React.ReactNode;
	cards: LoteriaCardsDataType;
	allCards: LoteriaCardsDataType;
}

const PlayLoteriaProvider: FC<Props> = ({
	children,
	initialCurrentGame,
	initalSession,
	cards,
	allCards,
}) => {
	const stateGame = useObservable<TypeStateGame>('initializing');
	const joinToLoteria = trpc.loteria.joinToLoteria.useMutation();

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

	const login = (jwt: string) => {
		localStorage.setItem('anime.player', jwt);
		console.log('login', jwt);
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
						onSuccess: (jwt) => {
							login(jwt);
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
			login(jwt);
			stateGame.set('waitSocketStartup');
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
			}}
		>
			<PlayLoteriaUIProvider allCards={allCards} initialCards={cards}>
				{children}
			</PlayLoteriaUIProvider>
		</PlayLoteriaContext.Provider>
	);
};

export default PlayLoteriaProvider;
