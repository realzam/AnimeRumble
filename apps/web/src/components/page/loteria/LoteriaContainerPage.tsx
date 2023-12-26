'use client';

import PlayLoteriaProvider from '@/context/playLoteria/playLoteriaProvider';
import { type Session } from 'next-auth';

import {
	type LoteriaCardsDataType,
	type LoteriaCurrentGameDataType,
} from '@/types/loteriaQuery';

import LoteriaSwitcherScreen from './LoteriaSwitcherScreen';

interface Props {
	allCards: LoteriaCardsDataType;
	session: Session | null;
	currentGame: LoteriaCurrentGameDataType;
	playersOnline: string[];
}
const LoteriaContainerPage = ({
	currentGame,
	session,
	allCards,
	playersOnline,
}: Props) => {
	return (
		<PlayLoteriaProvider
			initialCurrentGame={currentGame}
			initalSession={session}
			allCards={allCards}
			playersOnline={playersOnline}
		>
			<LoteriaSwitcherScreen />
		</PlayLoteriaProvider>
	);
};

export default LoteriaContainerPage;
