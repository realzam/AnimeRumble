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
	currentGame: LoteriaCurrentGameDataType;
	session: Session | null;
}
const LoteriaContainerPage = ({ currentGame, session, allCards }: Props) => {
	return (
		<PlayLoteriaProvider
			initialCurrentGame={currentGame}
			initalSession={session}
			allCards={allCards}
		>
			<LoteriaSwitcherScreen />
		</PlayLoteriaProvider>
	);
};

export default LoteriaContainerPage;
