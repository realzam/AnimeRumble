import React from 'react';
import { Switch } from '@legendapp/state/react';

import usePlayLoteria from '@/hooks/usePlayLoteria';
import { Spinner } from '@/components/web/Spinner';

import LoteriaNicknameForm from './LoteriaNicknameForm';
import LoteriaPlayUi from './LoteriaPlayUi';

/* 
'initializing'
'waitSocketStartup'
'waitToRoom'
'nickNameForm'
'lobby'
'finish'
'play';
*/
const LoadingInfo = ({ message }: { message: string }) => {
	return (
		<div className='flex h-[calc(100vh-3.5rem-1px)] flex-col items-center justify-center space-y-3'>
			<div className='h-24 w-24'>
				<Spinner />
			</div>
			<div>{message}</div>
		</div>
	);
};

const LoteriaSwitcherScreen = () => {
	const { stateGame } = usePlayLoteria();
	return (
		<Switch value={stateGame}>
			{{
				initializing: () => <LoadingInfo message='Cargando...' />,
				waitSocketStartup: () => <LoadingInfo message='Conectando...' />,
				waitToRoom: () => (
					<LoadingInfo message='Esperando que el administrador cree el juego' />
				),
				nickNameForm: () => <LoteriaNicknameForm />,
				default: () => <LoteriaPlayUi />,
			}}
		</Switch>
	);
};

export default LoteriaSwitcherScreen;
