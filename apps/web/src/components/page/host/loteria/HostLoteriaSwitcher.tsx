'use client';

import { Switch } from '@legendapp/state/react';

import useHostLoteria from '@/hooks/useHostLoteria';
import { Spinner } from '@/components/web/Spinner';

import HostLoteriaContainer from './HostLoteriaContainer';

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

const HostLoteriaSwitcher = () => {
	const { stateGame } = useHostLoteria();
	return (
		<Switch value={stateGame}>
			{{
				initializing: () => <LoadingInfo message='Cargando...' />,
				default: () => <HostLoteriaContainer />,
			}}
		</Switch>
	);
};

export default HostLoteriaSwitcher;
