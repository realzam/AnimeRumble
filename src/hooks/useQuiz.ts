import { useContext } from 'react';

import useSWR, { Fetcher } from 'swr';

import { QuizContext } from '@/context';
import { IQuiz } from '@/interfaces';

const useQuiz = () => {
	const { quizID } = useContext(QuizContext);
	const fetcher: Fetcher<IQuiz> = (apiURL: string) =>
		fetch(apiURL).then(res => res.json());
	// `data` will always be available as it's in `fallback`.
	const {
		data: quiz,
		isLoading,
		mutate,
	} = useSWR(`/api/quiz/${quizID}`, fetcher);

	return { quiz: quiz as IQuiz, isLoading, mutate };
};

export default useQuiz;
