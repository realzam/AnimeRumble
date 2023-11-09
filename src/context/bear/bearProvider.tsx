'use client';

import { trpc } from '@/trpc/client/client';
import { type serverClient } from '@/trpc/client/serverClient';
import { Memo } from '@legendapp/state/react';

import { BearContext } from './bearContext';

interface State {
	children: React.ReactNode;
	initialQuiz: Awaited<ReturnType<typeof serverClient.quizz.getQuizz>>;
}

function BearProvider({ children, initialQuiz }: State) {
	// const quiz = useObservable(initialQuiz);

	const quizQuery = trpc.quizz.getQuizz.useQuery(
		{ id: initialQuiz.id },
		{
			initialData: initialQuiz,
		},
	);
	// const isSelectedX = useObservable(0);
	// const reSet = async (n: number) => {
	// 	await sleep(5);
	// 	console.log('resSet', n);
	// 	isSelectedX.set(n);
	// };

	// const isSelected = useSelector(() => {
	// 	console.log('useSelector', quizQuery.data.questions.length);
	// 	// quiz.set(quizQuery.data);
	// 	reSet(quizQuery.data.questions.length);
	// 	return quizQuery.data.questions.length;
	// });

	// const isSelected2 = useComputed(() => {
	// 	console.log('useComputed', quizQuery.data);

	// 	return quizQuery.data;
	// });

	// const isSelected3 = useObservable(() => {
	// 	console.log('useObservable', quizQuery.data);

	// 	return quizQuery.data;
	// });

	// const isSelected4 = useObservable(() => {
	// 	console.log('useObservabl2', quizQuery.data);

	// 	return isSelected2;
	// });

	// const state = useObservable(quizQuery.data);
	// useObserve(() => {
	// 	console.log('useObserve', isSelected);
	// 	console.log('useObserve2', isSelected2.get());
	// 	console.log('useObserve3', isSelected3.get());
	// 	console.log('useObserve4', isSelected4.get());
	// 	console.log('useObserve5', isSelectedX.get());
	// 	// quiz.set(state.get());
	// });
	// useEffect(() => {
	// 	console.log('useEffect', state.title.get(), state.questions.get().length);
	// }, [quizQuery.data]);

	return (
		<BearContext.Provider
			value={{
				initialQuiz,
				// quiz:initialQuiz,
				// isSelectedX:0,
				refetch: quizQuery.refetch,
			}}
		>
			<Memo>{() => children}</Memo>
		</BearContext.Provider>
	);
}

export default BearProvider;
