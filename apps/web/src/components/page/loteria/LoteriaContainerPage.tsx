'use client';

import PlayLoteriaProvider from '@/context/playLoteria/playLoteriaProvider';
import { type Session } from 'next-auth';

import {
	type LoteriaCardsDataType,
	type LoteriaCurrentGameDataType,
} from '@/types/loteriaQuery';

import LoteriaSwitcherScreen from './LoteriaSwitcherScreen';

interface Props {
	cards: LoteriaCardsDataType;
	allCards: LoteriaCardsDataType;
	session: Session | null;
	currentGame: LoteriaCurrentGameDataType;
}
const LoteriaContainerPage = ({
	currentGame,
	session,
	allCards,
	cards,
}: Props) => {
	return (
		<PlayLoteriaProvider
			initialCurrentGame={currentGame}
			initalSession={session}
			cards={cards}
			allCards={allCards}
		>
			<LoteriaSwitcherScreen />
		</PlayLoteriaProvider>
	);
};

export default LoteriaContainerPage;
