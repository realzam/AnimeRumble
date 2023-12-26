import { useContext } from 'react';
import { HostLoteriaIContext } from '@/context/hostLoteria/HostLoteriaContex';

const useHostLoteria = () => {
	const state = useContext(HostLoteriaIContext);
	if (!state)
		throw new Error('Missing HostLoteriaIContext.Provider in the tree');
	return state;
};

export default useHostLoteria;
