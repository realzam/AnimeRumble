'use client';

import { useContext } from 'react';
import { QuizContext } from '@/context/quiz';
import { trpc } from '@/trpc/client/client';
import { enableReactComponents } from '@legendapp/state/config/enableReactComponents';
import { Reactive } from '@legendapp/state/react';
import { useDebouncedCallback } from 'use-debounce';

import { AspectRatio } from '@ui/AspectRatio';
import { Card } from '@ui/Card';
import { ScrollArea } from '@ui/ScrollArea';

import AnswersTypeContainer from '../AnswersTypeContainer';
import { PointsSelect } from '../PointsSelect';
import TimeSelect from '../TimeSelect';

enableReactComponents();
const QuizzPageContainer = () => {
	const updateQuiz = trpc.quizz.updateQuestion.useMutation();
	const { questionUI, quiz, valueQuestion, refetch } = useContext(QuizContext);

	const debounced = useDebouncedCallback(async () => {
		await updateQuiz.mutate(
			{
				questionId: questionUI.id,
				quizId: quiz.id,
				question: valueQuestion.get(),
			},
			{
				onSettled: () => {
					refetch();
				},
			},
		);
	}, 500);

	return (
		<Card className='flex w-full flex-col py-8 pl-4 pr-2'>
			<ScrollArea type='always'>
				<div className='flex min-h-[calc(100vh-11rem-12px)] flex-col justify-between pr-4'>
					<div className='p-1'>
						<Reactive.input
							className='flex h-11 w-full rounded-md border border-input bg-transparent px-3 py-1 text-center text-2xl  shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
							name='question'
							id='question'
							placeholder='Escribe tu pregunta'
							$value={valueQuestion}
							onChange={debounced}
						/>
					</div>
					<div className='my-5 flex h-80 items-center justify-between'>
						<TimeSelect />
						<Card className='w-full bg-neutral-100 dark:bg-slate-900'>
							<AspectRatio ratio={16 / 9} />
						</Card>
						<PointsSelect />
					</div>
					<AnswersTypeContainer />
				</div>
			</ScrollArea>
		</Card>
	);
};

export default QuizzPageContainer;
