'use client';

import { Computed, Switch, useObservable } from '@legendapp/state/react';

import useQuiz from '@/hooks/useQuiz';
import { RadioGroup } from '@ui/RadioGroup';

import { AnswerCard, AnswerTFCard } from './AnswerCard';

const QuestionAnswersTypeContainer = () => {
	const { ui } = useQuiz();
	const correctAnswerTF = useObservable(() => {
		if (ui.question.correctAnswerTF.get() !== null) {
			return ui.question.correctAnswerTF.get() ? 'True' : 'False';
		}
		return undefined;
	});

	const onChange = (v: string) => {
		correctAnswerTF.set(v);
		// trpcUtils.client.quizz.updateQuestion
		// 	.mutate({
		// 		questionId: ui.question.id.get(),
		// 		quizId: id,
		// 		correctAnswerTF: v === 'True',
		// 	})
		// 	.then(() => {
		// 		props$.refetch();
		// 	});
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
/*
<div className='mt-2 grid w-full grid-cols-2 gap-4'>
								<AnswerCard index={0} />
								<AnswerCard color='blue' index={1} />
								<AnswerCard color='yellow' index={2} />
								<AnswerCard color='green' index={3} />
							</div>
							
*/
