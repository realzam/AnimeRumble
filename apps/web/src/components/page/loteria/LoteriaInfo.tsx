'use client';

import { Show } from '@legendapp/state/react';

import usePlayLoteriaUI from '@/hooks/usePlayLoteriaUI';

import LoteriaGameInfo from './LoteriaGameInfo';
import LotericaPlayersCard from './LotericaPlayersCard';

const LoteriaInfo = () => {
	const { isPlaying } = usePlayLoteriaUI();
	return (
		<Show if={isPlaying} else={<LotericaPlayersCard />}>
			<LoteriaGameInfo />
		</Show>
	);
};

export default LoteriaInfo;
