'use client';

import { trpc } from '@/trpc/client/client';
import {
	Computed,
	Switch,
	useObservable,
	useObserve,
} from '@legendapp/state/react';

import useQuiz from '@/hooks/useQuiz';
import { RadioGroup } from '@ui/RadioGroup';

import { AnswerCard, AnswerTFCard } from './AnswerCard';

const QuestionAnswersTypeContainer = () => {
	const updateQuestion = trpc.quizz.updateQuestion.useMutation();
	const { ui, quiz, props, validateVolatileQuestion } = useQuiz();
	const correctAnswerTF = useObservable(() => {
		if (ui.question.correctAnswerTF.get() !== null) {
			return ui.question.correctAnswerTF.get() ? 'True' : 'False';
		}
		return undefined;
	});
	useObserve(ui.question, () => {
		let checked = undefined;
		if (ui.question.correctAnswerTF.get() !== null) {
			checked = ui.question.correctAnswerTF.get() ? 'True' : 'False';
		}

		correctAnswerTF.set(checked);
	});

	const onChange = (v: string) => {
		correctAnswerTF.set(v);
		ui.questionVolatile.correctAnswerTF.set(v === 'True');
		validateVolatileQuestion();
		updateQuestion.mutate(
			{
				questionId: ui.question.id.get(),
				quizId: quiz.id.get(),
				correctAnswerTF: v === 'True',
			},
			{
				onSuccess: () => {
					props.refetch();
				},
			},
		);
	};

	return (
		<Switch value={ui.question.questionType}>
			{{
				Multiple: () => (
					<div className='my-4 grid w-full grid-cols-2 gap-4'>
						<AnswerCard index={0} />
						<AnswerCard color='blue' index={1} />
						<AnswerCard color='yellow' index={2} />
						<AnswerCard color='green' index={3} />
					</div>
				),

				TF: () => (
					<Computed>
						{() => (
							<RadioGroup
								value={correctAnswerTF.get()}
								className='my-4 grid w-full grid-cols-2 gap-4'
								onValueChange={onChange}
							>
								<AnswerTFCard />
								<AnswerTFCard variantTrue={false} />
							</RadioGroup>
						)}
					</Computed>
				),
			}}
		</Switch>
	);
};

export default QuestionAnswersTypeContainer;
