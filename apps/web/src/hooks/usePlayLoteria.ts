import { useContext } from 'react';
import { PlayLoteriaContext } from '@/context/playLoteria/playLoteriaContext';

const usePlayLoteria = () => {
	const state = useContext(PlayLoteriaContext);
	if (!state)
		throw new Error('Missing PlayLoteriaContext.Provider in the tree');
	return state;
};

export default usePlayLoteria;
