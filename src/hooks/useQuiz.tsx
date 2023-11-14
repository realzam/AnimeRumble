import { useContext } from 'react';
import { QuizContex } from '@/context/quiz/QuizContex';
import { trpc } from '@/trpc/client/client';

const useQuiz = () => {
	const trpcUtils = trpc.useUtils();
	const state = useContext(QuizContex);
	if (!state) throw new Error('Missing QuizContex.Provider in the tree');
	return { ...state, trpcUtils };
};

export default useQuiz;
