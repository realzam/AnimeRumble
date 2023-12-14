import { useContext } from 'react';
import { LoteriaInfoAdminContex } from '@/context/loteriaInfoAdmin/LoteriaInfoAdminContex';
import { trpc } from '@/trpc/client/client';

const useLoteria = () => {
	const trpcUtils = trpc.useUtils();
	const state = useContext(LoteriaInfoAdminContex);
	if (!state)
		throw new Error('Missing LoteriaInfoAdminContex.Provider in the tree');
	return { ...state, trpcUtils };
};

export default useLoteria;
