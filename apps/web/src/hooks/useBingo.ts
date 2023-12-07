import { useContext } from 'react';
import { BingoContex } from '@/context/bingo/BingoContex';
import { trpc } from '@/trpc/client/client';

const useBingo = () => {
	const trpcUtils = trpc.useUtils();
	const state = useContext(BingoContex);
	if (!state) throw new Error('Missing BingoContex.Provider in the tree');
	return { ...state, trpcUtils };
};

export default useBingo;
