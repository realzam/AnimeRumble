import { enableReactComponents } from '@legendapp/state/config/enableReactComponents';
import {
	Memo,
	Reactive,
	useObservable,
	useObserve,
	useSelector,
} from '@legendapp/state/react';
import { useDebouncedCallback } from 'use-debounce';

import useQuiz from '@/hooks/useQuiz';
import {
	Tooltip,
	TooltipArrow,
	TooltipContent,
	TooltipTrigger,
} from '@ui/Tooltip';

enableReactComponents();
const QuizQuestionInput = () => {
	const { id, props$, ui, trpcUtils } = useQuiz();
	const showError = useSelector(() => ui.question.errors[0].get() !== '');

	const value = useObservable(() => ui.question.question.get());
	useObserve(ui.question, () => {
		value.set(ui.question.question.get());
	});

	const debounced = useDebouncedCallback(async () => {
		trpcUtils.client.quizz.updateQuestion
			.mutate({
				quizId: id,
				questionId: ui.question.id.get(),
				question: value.get(),
			})
			.then(() => props$.get().refetch());
	}, 500);

	return (
		<Tooltip open={showError}>
			<TooltipTrigger className='w-full'>
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
			</TooltipTrigger>
			<TooltipContent side='bottom'>
				<TooltipArrow />
				<Memo>{ui.question.errors[0]}</Memo>
			</TooltipContent>
		</Tooltip>
	);
};

export default QuizQuestionInput;
