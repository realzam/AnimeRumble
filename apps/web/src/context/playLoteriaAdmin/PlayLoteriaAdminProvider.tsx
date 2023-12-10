'use client';

import React from 'react';
import { useObservable } from '@legendapp/state/react';

import {
	PlayLoteriaAdminContext,
	type StatesPlayLoteria,
} from './PlayLoteriaAdminContex';

interface Props {
	children: React.ReactNode;
}
const PlayLoteriaAdminProvider = ({ children }: Props) => {
	const stateLoteria = useObservable<StatesPlayLoteria>('showLobby');
	return (
		<PlayLoteriaAdminContext.Provider value={{ stateLoteria }}>
			{children}
		</PlayLoteriaAdminContext.Provider>
	);
};

export default PlayLoteriaAdminProvider;
