'use client';

import PlayLoteriaProvider from '@/context/playLoteria/playLoteriaProvider';
import { Show } from '@legendapp/state/react';

import { type LoteriaCardsDataType } from '@/types/loteriaQuery';
import usePlayLoteria from '@/hooks/usePlayLoteria';
import { Button } from '@ui/Button';
import { ScrollArea } from '@ui/ScrollArea';

import LoteriaGrid from './LoteriaGrid';

interface Props {
	cards: LoteriaCardsDataType;
	allCards: LoteriaCardsDataType;
}

const LoteriaContainerPage = ({ cards, allCards }: Props) => {
	return (
		<PlayLoteriaProvider allCards={allCards} currentCa={cards}>
			<LoteriaPage />
		</PlayLoteriaProvider>
	);
};

const LoteriaPage = () => {
	const { playMode, generateRandomCards, clearPlantilla } = usePlayLoteria();

	return (
		<ScrollArea className='h-full' type='always'>
			<div className='container mt-2 max-w-[600px] p-1 xs:p-2'>
				<LoteriaGrid />
				<div className='mt-5 flex justify-between'>
					<Button
						variant='gradient'
						onClick={async () => {
							generateRandomCards();
						}}
					>
						Generar plantilla Aleatoria
					</Button>
					<Show if={playMode}>
						<Button variant='destructive' onClick={() => clearPlantilla()}>
							Limpiar plantilla
						</Button>
					</Show>

					<Button
						variant='secondary'
						onClick={() => {
							playMode.toggle();
						}}
					>
						<Show if={playMode} else={<> Guardar plantilla </>}>
							Crear plantilla
						</Show>
					</Button>
				</div>
			</div>
		</ScrollArea>
	);
};

export default LoteriaContainerPage;
