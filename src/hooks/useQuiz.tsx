import { useContext } from 'react';
import { QuizContex } from '@/context/quiz/QuizContex';

const useQuiz = () => {
	const state = useContext(QuizContex);
	if (!state) throw new Error('Missing QuizContex.Provider in the tree');
	return state;
};

export default useQuiz;
