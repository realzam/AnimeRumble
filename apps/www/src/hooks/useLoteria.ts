import { useContext } from 'react';
import { LoteriaContex } from '@/context/loteria/LoteriaContex';
import { trpc } from '@/trpc/client/client';

const useLoteria = () => {
	const trpcUtils = trpc.useUtils();
	const state = useContext(LoteriaContex);
	if (!state) throw new Error('Missing LoteriaContex.Provider in the tree');
	return { ...state, trpcUtils };
};

export default useLoteria;
