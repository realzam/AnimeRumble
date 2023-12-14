import { useContext } from 'react';
import { PlayLoteriaUIContext } from '@/context/playLoteriaUI/playLoteriaUIContext';

const usePlayLoteriaUI = () => {
	const state = useContext(PlayLoteriaUIContext);
	if (!state)
		throw new Error('Missing PlayLoteriaUIContext.Provider in the tree');
	return state;
};

export default usePlayLoteriaUI;
