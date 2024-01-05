import React from 'react';
import { Memo, Show, useComputed } from '@legendapp/state/react';
import { Dices } from 'lucide-react';

import usePlayLoteria from '@/hooks/usePlayLoteria';
import usePlayLoteriaUI from '@/hooks/usePlayLoteriaUI';
import ButtonGradientLoading from '@/components/web/ButtonGradientLoading';

const LoteriaGridGererateButtons = () => {
	const { stateGame } = usePlayLoteria();
	const { generateRandomTable, isGenerationRandomTable } = usePlayLoteriaUI();
	const edit = useComputed(() => stateGame.get() === 'lobby');
	return (
		<Show if={edit}>
			<div className='flex justify-end'>
				<Memo>
					{() => (
						<ButtonGradientLoading
							variant='secondary'
							isLoading={isGenerationRandomTable}
							onClick={() => {
								generateRandomTable();
							}}
						>
							<Dices className='mr-2' />
							Plantilla Aleatoria
						</ButtonGradientLoading>
					)}
				</Memo>
			</div>
		</Show>
	);
};

export default LoteriaGridGererateButtons;
