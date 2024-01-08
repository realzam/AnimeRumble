import { useContext } from 'react';
import { PlayQuizContext } from '@/context/playQuiz/PlayQuizContext';

const usePlayQuiz = () => {
	const state = useContext(PlayQuizContext);
	if (!state) throw new Error('Missing PlayQuizContext.Provider in the tree');
	return state;
};

export default usePlayQuiz;
