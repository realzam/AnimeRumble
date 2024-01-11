import React from 'react';
import { Show, useComputed } from '@legendapp/state/react';

import useHostLoteria from '@/hooks/useHostLoteria';
import { Button } from '@ui/Button';

import HostLoteriaCardsCarousel from './HostLoteriaCardsCarousel';
import HostLoteriaPlayersCard from './HostLoteriaPlayersCard';

const HostLoteriaContainer = () => {
	const { stateGame, startGame, goToLobbyGame } = useHostLoteria();
	const playGame = useComputed(() => stateGame.get() !== 'lobby');
	return (
		<div className='container mt-5 space-y-3'>
			<HostLoteriaPlayersCard />
			<div className='mx-auto flex max-w-[80%] justify-between'>
				<Button
					variant='gradient'
					className={stateGame.get() === 'lobby' ? 'block' : 'hidden'}
					onClick={() => startGame()}
				>
					Iniciar partida
				</Button>
				<Button
					variant='destructive'
					className={stateGame.get() === 'play' ? 'block' : 'hidden'}
					onClick={() => goToLobbyGame()}
				>
					Detener actividad
				</Button>
			</div>
			<Show if={playGame}>
				<HostLoteriaCardsCarousel />
			</Show>
		</div>
	);
};

export default HostLoteriaContainer;
