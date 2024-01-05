import { trpc } from '@/trpc/client/client';
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
const QuestionInput = () => {
	const { id, ui, props } = useQuiz();
	const updateQuestion = trpc.quizz.updateQuestion.useMutation();

	const debounced = useDebouncedCallback(async () => {
		updateQuestion.mutate(
			{
				quizId: id,
				questionId: ui.question.id.get(),
				question: value.get(),
			},
			{
				onSettled: () => {
					props.refetch();
				},
			},
		);
	}, 500);

	const value = useObservable(() => ui.question.question.get());
	const showError = useSelector(() => ui.question.errors[0].get() !== '');

	useObserve(ui.questionId, () => {
		value.set(ui.question.question.get());
	});

	useObserve(value, () => {
		if (value.get().length === 0) {
			ui.question.errors[0].set('Es necesaria una pregunta');
		} else {
			ui.question.errors[0].set('');
		}
	});

	return (
		<Tooltip open={showError}>
			<TooltipTrigger className='w-full'>
				<Reactive.input
					className='flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-1 text-center shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-lg lg:text-2xl'
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

export default QuestionInput;

/**
 
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
        
 */
