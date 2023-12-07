import { useContext } from 'react';
import { PlayQuizContext } from '@/context/playQuiz/PlayQuizContext';
import { trpc } from '@/trpc/client/client';

const usePlayQuiz = () => {
	const trpcUtils = trpc.useUtils();
	const state = useContext(PlayQuizContext);
	if (!state) throw new Error('Missing PlayQuizContext.Provider in the tree');
	return { ...state, trpcUtils };
};

export default usePlayQuiz;
