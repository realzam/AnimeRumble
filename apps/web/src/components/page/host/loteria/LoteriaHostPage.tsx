'use client';

import { type LoteriaGameDataType } from '@/types/loteriaQuery';

import LoteriaHostContainer from './LoteriaHostContainer';

interface Props {
	game: LoteriaGameDataType;
}
const LoteriaHostPage = ({}: Props) => {
	return <LoteriaHostContainer />;
};

export default LoteriaHostPage;
