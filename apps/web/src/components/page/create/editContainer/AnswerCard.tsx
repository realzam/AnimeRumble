import { trpc } from '@/trpc/client/client';
import {
	Reactive,
	reactive,
	Show,
	useComputed,
	useObservable,
	useObserve,
	useSelector,
} from '@legendapp/state/react';
import { cva, type VariantProps } from 'class-variance-authority';
import { useDebouncedCallback } from 'use-debounce';

import { cn } from '@/lib/utils';
import useQuiz from '@/hooks/useQuiz';
import { Card } from '@ui/Card';
import { Checkbox } from '@ui/Checkbox';
import { RadioGroupItem } from '@ui/RadioGroup';
import { textareaVariants } from '@ui/Textarea';

interface Props {
	index?: number;
}
type ActivityCardProps = VariantProps<typeof colorsVariants> & Props;

const colorsVariants = cva('', {
	variants: {
		color: {
			red: 'bg-red-500',
			blue: 'bg-blue-500',
			green: 'bg-green-500',
			yellow: 'bg-yellow-500',
		},
	},
	defaultVariants: {
		color: 'red',
	},
});

const ReactiveCard = reactive(Card);
const ReactiveCheckbox = reactive(Checkbox);

const AnswerCard = ({ color, index = 0 }: ActivityCardProps) => {
	const { ui, id, validateVolatileQuestion } = useQuiz();
	const updateQuestion = trpc.quizz.updateQuestion.useMutation();
	const asnwer = useObservable(() => ui.question.get().answers[index]);
	const checked = useObservable(() => ui.question.get().correctAnswers[index]);
	const colored = useComputed(() => asnwer.get().length > 0);
	useObserve(ui.question.answers, () => {
		asnwer.set(ui.question.answers.get()[index]);
		checked.set(ui.question.correctAnswers.get()[index]);
	});

	const animateCheck = useSelector(
		() => ui.question.errors.get().findIndex((e) => e !== '') === 3,
	);

	const debounced = useDebouncedCallback(async () => {
		updateQuestion.mutate({
			questionId: ui.question.id.get(),
			quizId: id,
			answerUpdate: {
				index,
				value: asnwer.get(),
			},
		});
	}, 500);

	return (
		<ReactiveCard
			$className={() =>
				cn(
					'flex h-28 items-center overflow-hidden  p-2 transition-colors duration-500',
					colored.get() && colorsVariants({ color }),
				)
			}
		>
			<div
				className={cn(
					colorsVariants({
						color,
						className: 'h-full w-12 rounded-sm border-none',
					}),
				)}
			/>
			<div className='flex h-full w-full items-center'>
				<Reactive.textarea
					placeholder='Escribe una respuesta'
					$value={asnwer}
					$className={() =>
						cn(
							textareaVariants({
								variant: 'invisible',
								className: 'flex h-full rounded-none  align-middle text-lg',
							}),
							colored.get() ? 'text-slate-100' : 'caret-primary',
						)
					}
					onChange={(e) => {
						const value = e.target.value;
						asnwer.set(value);
						ui.questionVolatile.answers[index].set(value);
						validateVolatileQuestion();
						debounced();
					}}
				/>
				<Show if={colored}>
					<ReactiveCheckbox
						className='z-10 m-2 h-8 w-8 shrink-0 rounded-full border-4 transition-colors duration-300 focus-visible:ring-8'
						$checked={checked}
						showRippleAwait={animateCheck}
						onCheckedChange={(v) => {
							checked.set(v as boolean);
							ui.questionVolatile.correctAnswers[index].set(v as boolean);
							validateVolatileQuestion();
							updateQuestion.mutate({
								questionId: ui.question.id.get(),
								quizId: id,
								correctAnswerUpdate: {
									index,
									value: v as boolean,
								},
							});
						}}
					/>
				</Show>
			</div>
		</ReactiveCard>
	);
};

const AnswerTFCard = ({ variantTrue = true }: { variantTrue?: boolean }) => {
	const { ui } = useQuiz();
	const animateCheck = useSelector(
		() => ui.question.errors.get().findIndex((e) => e !== '') === 3,
	);
	return (
		<Card className='flex h-24 items-center overflow-hidden'>
			<div
				className={cn(
					'h-full w-24 border-none',
					variantTrue ? 'bg-blue-500' : 'bg-red-500',
				)}
			></div>
			<div
				className={cn(
					'flex h-full w-full items-center justify-between transition-colors duration-500',
					variantTrue ? 'bg-blue-500' : 'bg-red-500',
				)}
			>
				<h3 className='text-xl font-semibold leading-none text-slate-100'>
					{variantTrue ? 'Verdadero' : 'Falso'}
				</h3>
				<RadioGroupItem
					value={variantTrue ? 'True' : 'False'}
					showRippleAwait={animateCheck}
					className='m-2 h-8 w-8 shrink-0 rounded-full border-4 transition-colors duration-300 focus-visible:ring-8'
				/>
			</div>
		</Card>
	);
};
export { AnswerCard, AnswerTFCard };
