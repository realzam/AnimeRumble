'use client';

import {
	Computed,
	Memo,
	Show,
	useComputed,
	useObservable,
	useObserve,
	useSelector,
} from '@legendapp/state/react';

import { type QuestionType } from '@/types/quizQuery';
import useQuiz from '@/hooks/useQuiz';
import { RadioGroup } from '@ui/RadioGroup';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@ui/Select';
import {
	Tooltip,
	TooltipArrow,
	TooltipContent,
	TooltipTrigger,
} from '@ui/Tooltip';

import { AnswerCard, AnswerTFCard } from './AnswerCard';

type QuestionTypeEnum = QuestionType['questionType'];
const QuestionAnswersTypeContainer = () => {
	const { id, ui, trpcUtils, props$ } = useQuiz();
	const multiple = useComputed(
		() => ui.question.questionType.get() === 'Multiple',
	);
	const tf = useComputed(() => !multiple.get());
	const correctAnswerTF = useObservable(() => {
		if (ui.question.correctAnswerTF.get() !== null) {
			return ui.question.correctAnswerTF.get() ? 'True' : 'False';
		}
		return undefined;
	});

	const error = useSelector(() =>
		ui.question.errors.get().find((e) => e !== ''),
	);
	const showError = useSelector(
		() =>
			ui.question.errors[0].get() === '' &&
			!ui.question.errors.get().every((e) => e === ''),
	);

	useObserve(ui.question, () => {
		let v = undefined;
		if (ui.question.correctAnswerTF.get() !== null) {
			v = ui.question.correctAnswerTF.get() ? 'True' : 'False';
		}
		correctAnswerTF.set(v);
	});
	const onChange = (v: 'True' | 'False') => {
		correctAnswerTF.set(v);
		trpcUtils.client.quizz.updateQuestion
			.mutate({
				questionId: ui.question.id.get(),
				quizId: id,
				correctAnswerTF: v === 'True',
			})
			.then(() => {
				props$.refetch();
			});
	};
	return (
		<div className='flex flex-col p-1'>
			<div className='mb-2'>
				<Memo>
					{() => (
						<Select
							value={ui.question.questionType.get()}
							onValueChange={(value: QuestionTypeEnum) => {
								ui.question.questionType.set(value);
								trpcUtils.client.quizz.updateQuestion
									.mutate({
										questionId: ui.question.id.get(),
										quizId: id,
										questionType: value,
									})
									.then(() => {
										props$.refetch();
									});
							}}
						>
							<SelectTrigger className='w-[180px]'>
								<SelectValue />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Tipo de respuesta</SelectLabel>
									<SelectItem value='Multiple'>Multiple</SelectItem>
									<SelectItem value='TF'>Verdadero o Falso</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
					)}
				</Memo>
			</div>
			<Tooltip open={showError}>
				<TooltipTrigger className='flex cursor-auto' asChild>
					<div className='flex w-full'>
						<Show if={multiple}>
							<div className='mt-2 grid w-full grid-cols-2 gap-4'>
								<AnswerCard index={0} />
								<AnswerCard color='blue' index={1} />
								<AnswerCard color='yellow' index={2} />
								<AnswerCard color='green' index={3} />
							</div>
						</Show>
						<Show if={tf}>
							<Computed>
								{() => (
									<RadioGroup
										value={correctAnswerTF.get()}
										className='mt-2 grid w-full grid-cols-2 gap-4'
										onValueChange={onChange}
									>
										<AnswerTFCard />
										<AnswerTFCard variantTrue={false} />
									</RadioGroup>
								)}
							</Computed>
						</Show>
					</div>
				</TooltipTrigger>
				<TooltipContent>
					<p>{error}</p>
					<TooltipArrow />
				</TooltipContent>
			</Tooltip>
		</div>
	);
};

export default QuestionAnswersTypeContainer;
