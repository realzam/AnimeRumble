import {
	useCallback,
	useEffect,
	useState,
	type FC,
	type ReactNode,
} from 'react';
import { trpc } from '@/trpc/client/client';
import { useMount, useObservable } from '@legendapp/state/react';
import {
	type LoteriaClientSocket,
	type WaitRoomClientSocket,
} from 'anime-sockets-types';
import { decodeJwt } from 'jose';
import { type Session } from 'next-auth';

import { type JwtAnimePlayer } from '@/types/jwt.types';
import {
	type LoteriaCardsDataType,
	type LoteriaCurrentGameDataType,
} from '@/types/loteriaQuery';
import { sleep } from '@/lib/utils';
import useSocket from '@/hooks/useSocket';

import {
	PlayLoteriaContext,
	type RactivesMarkedRecord,
	type TypeStateGame,
	type TypeUserInfo,
} from './playLoteriaContext';

interface Props {
	initialCurrentGame: LoteriaCurrentGameDataType;
	initalSession: Session | null;
	children: ReactNode;
	allCards: LoteriaCardsDataType;
}

const PlayLoteriaProvider: FC<Props> = ({
	children,
	initialCurrentGame,
	initalSession,
	allCards,
}) => {
	const loginLoteria = trpc.loteria.loginLoteria.useMutation();
	const joinUserLoteria = trpc.loteria.joinUserLoteria.useMutation();

	const {
		conectarSocket: conectarSocketWaitRoom,
		desconectarSocket,
		socket: waitRoomSocket,
	} = useSocket<WaitRoomClientSocket>({
		room: 'waitRoom',
		onConnect: () => {
			stateGame.set('waitToRoom');
		},
	});

	const { conectarSocket, socket } = useSocket<LoteriaClientSocket>({
		room: 'loteria',
		onConnect: () => {
			console.log('onConnect ready');
			stateGame.set(initialCurrentGame?.state);
		},
	});

	const stateGame = useObservable<TypeStateGame>('initializing');
	const [cardsPlayer, setCardsPlayer] = useState<LoteriaCardsDataType>([]);
	const [initialReactives, setInitialReactives] =
		useState<RactivesMarkedRecord>({});
	const userInfo = useObservable<TypeUserInfo | undefined>(() => {
		if (initalSession && initalSession.user) {
			return { userId: initalSession.user.id, jwt: '' };
		}
	});

	const login = useCallback(
		async (
			jwt: string,
			playerCards: LoteriaCardsDataType,
			reactive: RactivesMarkedRecord,
		) => {
			localStorage.setItem('anime.player', jwt);
			setCardsPlayer(playerCards);
			setInitialReactives(reactive);
			const { id, nick } = decodeJwt<JwtAnimePlayer>(jwt);
			userInfo.set({
				userId: id,
				nickname: nick,
				jwt,
			});
			await sleep(100);
			desconectarSocket();
			conectarSocket();
		},
		[conectarSocket, desconectarSocket, userInfo],
	);

	const setStartupPage = () => {
		if (initalSession && initalSession.user && initalSession.user.nickName) {
			console.log('setStartupPage register user');

			joinUserLoteria.mutate(undefined, {
				onSuccess: ({ jwt, playerCards, reactive }) => {
					login(jwt, playerCards, reactive);
				},
			});
		} else {
			console.log('setStartupPage guest user');
			stateGame.set('nickNameForm');
		}
	};

	useMount(() => {
		if (!initialCurrentGame) {
			window.localStorage.removeItem('anime.player');
			conectarSocketWaitRoom();
		} else {
			const jwt = window.localStorage.getItem('anime.player');
			if (jwt) {
				stateGame.set('waitSocketStartup');
				loginLoteria.mutate(
					{ jwt },
					{
						onSuccess: ({ playerCards, reactive }) => {
							login(jwt, playerCards, reactive);
						},
						onError: () => {
							window.localStorage.removeItem('anime.player');
							setStartupPage();
						},
					},
				);
			} else {
				setStartupPage();
			}
		}
	});

	useEffect(() => {
		waitRoomSocket?.on('loteriaRoomCreated', () => {
			console.log('waitRoomSocket.on loteriaRoomCreated');
			setStartupPage();
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [waitRoomSocket]);

	return (
		<PlayLoteriaContext.Provider
			value={{
				stateGame,
				socket,
				cardsPlayer,
				initialReactives,
				userInfo,
				login,
				allCards,
			}}
		>
			{children}
		</PlayLoteriaContext.Provider>
	);
};

export default PlayLoteriaProvider;
