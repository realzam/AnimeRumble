import { trpc } from '@/trpc/client/client';
import { enableReactComponents } from '@legendapp/state/config/enableReactComponents';
import { Reactive, useObservable, useObserve } from '@legendapp/state/react';
import { useDebouncedCallback } from 'use-debounce';

import useQuiz from '@/hooks/useQuiz';

enableReactComponents();
const QuizQuestionInput = () => {
	const { id, props$, ui } = useQuiz();
	const utils = trpc.useUtils();
	const value = useObservable(() => ui.question.question.get());
	useObserve(ui.question, () => {
		value.set(ui.question.question.get());
	});

	const debounced = useDebouncedCallback(async () => {
		utils.client.quizz.updateQuestion
			.mutate({
				quizId: id,
				questionId: ui.question.id.get(),
				question: value.get(),
			})
			.then(() => props$.get().refetch());
	}, 500);

	return (
		<Reactive.input
			className='flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-1 text-center text-2xl  shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
			name='question'
			id='question'
			placeholder='Escribe tu pregunta'
			$value={value}
			onChange={(e) => {
				const v = e.target.value;
				value.set(v);
				debounced();
			}}
		/>
	);
};

export default QuizQuestionInput;
