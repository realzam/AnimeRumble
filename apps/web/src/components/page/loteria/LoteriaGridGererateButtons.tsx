import React from 'react';
import { Memo, Show, useComputed } from '@legendapp/state/react';
import { Dices } from 'lucide-react';

import usePlayLoteria from '@/hooks/usePlayLoteria';
import usePlayLoteriaUI from '@/hooks/usePlayLoteriaUI';
import { Button } from '@ui/Button';

const LoteriaGridGererateButtons = () => {
	const { stateGame } = usePlayLoteria();
	const { generateRandomCards, props } = usePlayLoteriaUI();
	const edit = useComputed(() => stateGame.get() === 'lobby');
	return (
		<Show if={edit}>
			<div className='flex justify-end'>
				<Memo>
					{() => (
						<Button
							variant='secondary'
							disabled={props.isFetching.get()}
							onClick={() => {
								generateRandomCards();
							}}
						>
							<Dices className='mr-2' />
							Plantilla Aleatoria
						</Button>
					)}
				</Memo>
			</div>
		</Show>
	);
};

export default LoteriaGridGererateButtons;
