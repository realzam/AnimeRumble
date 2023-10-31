'use client';

import { useContext } from 'react';
import { QuizContext } from '@/context/quiz';
import { trpc } from '@/trpc/client/client';
import { enableReactComponents } from '@legendapp/state/config/enableReactComponents';
import {
	Reactive,
	Show,
	useObservable,
	useSelector,
} from '@legendapp/state/react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Card } from '@ui/Card';
import { Checkbox } from '@ui/Checkbox';
import { textareaVariants } from '@ui/Textarea';

enableReactComponents();

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
interface Props {
	index?: number;
}
type ActivityCardProps = VariantProps<typeof colorsVariants> & Props;
const AnswerCard = ({ color, index = 0 }: ActivityCardProps) => {
	const { questionUI, quiz, refetch } = useContext(QuizContext);
	const asnwer = useObservable(questionUI.answers[index]);
	const colored = useSelector(() => asnwer.get().length > 0);
	const updateQuestion = trpc.quizz.updateQuestion.useMutation();

	return (
		<Card
			className={cn(
				'flex h-28 items-center overflow-hidden  p-2 transition-colors duration-500',
				colored && colorsVariants({ color }),
			)}
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
							colored && 'text-slate-100',
						)
					}
					onChange={() => {
						updateQuestion.mutate(
							{
								questionId: questionUI.id,
								quizId: quiz.id,
								answerUpdate: {
									index,
									value: 'hhhola',
								},
							},
							{
								onSettled: () => {
									refetch();
								},
							},
						);
					}}
				/>
				<Show if={colored}>
					<Checkbox className='m-2 h-8 w-8 shrink-0 rounded-full border-4 transition-colors duration-300 focus-visible:ring-8' />
				</Show>
			</div>
		</Card>
	);
};

const AnswerTFCard = ({ variantTrue = true }: { variantTrue?: boolean }) => {
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
				<Checkbox className='m-2 h-8 w-8 shrink-0 rounded-full border-4 transition-colors duration-300 focus-visible:ring-8' />
			</div>
		</Card>
	);
};
export { AnswerCard, AnswerTFCard };
