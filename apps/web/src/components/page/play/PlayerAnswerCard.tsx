'use client';

import { useMemo } from 'react';
import { reactive, Show, useSelector } from '@legendapp/state/react';
import { cva } from 'class-variance-authority';
import { Check, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import usePlayQuiz from '@/hooks/usePlayQuiz';
import { Card } from '@ui/Card';

const ReactiveCard = reactive(Card);
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
	question: string;
}

const PlayerAnswerCard = ({ index = 0, question }: Props) => {
	const { answer, showCorrectAnswer, question: qobj } = usePlayQuiz();
	const color = useMemo(() => {
		switch (index) {
			case 0:
				return colorsVariants({ color: 'red' });
			case 1:
				return colorsVariants({ color: 'blue' });
			case 2:
				return colorsVariants({ color: 'yellow' });
			case 3:
				return colorsVariants({ color: 'green' });
			default:
				return colorsVariants({ color: 'red' });
		}
	}, [index]);

	const chooseCorrect = useSelector(() => qobj.correctAnswers[index]);
	return (
		<ReactiveCard
			$className={() =>
				cn(
					'col-span-1 flex h-28 items-center overflow-hidden border-none p-2 shadow-lg transition-all duration-300 ease-in-out',
					!showCorrectAnswer.get() && 'cursor-pointer hover:scale-105 ' + color,
					showCorrectAnswer.get() &&
						(chooseCorrect ? 'bg-green-500' : 'bg-red-500'),
				)
			}
			onClick={() => {
				if (!showCorrectAnswer.get()) {
					answer(index);
				}
			}}
		>
			<div className='h-full w-12' />
			<div className='flex h-full w-full items-center justify-between'>
				<h3 className='text-xl font-semibold leading-none text-slate-100'>
					{question}
				</h3>
				<Show if={showCorrectAnswer}>
					<Show
						if={chooseCorrect}
						else={<X className='mr-2 h-9 w-9 text-slate-100' />}
					>
						<Check className='mr-2 h-9 w-9 text-slate-100' />
					</Show>
				</Show>
			</div>
		</ReactiveCard>
	);
};

const PlayerAnswerTFCard = ({
	variantTrue = true,
}: {
	variantTrue?: boolean;
}) => {
	const { answer } = usePlayQuiz();
	return (
		<Card
			className={cn(
				'flex h-24 cursor-pointer items-center overflow-hidden transition-all duration-300 ease-in-out hover:scale-105',
				variantTrue ? 'bg-blue-500' : 'bg-red-500',
			)}
			onClick={() => {
				answer(variantTrue ? 1 : 0);
			}}
		>
			<div className='h-full w-24' />
			<div className='flex h-full w-full items-center justify-between'>
				<h3 className='text-xl font-semibold leading-none text-slate-100'>
					{variantTrue ? 'Verdadero' : 'Falso'}
				</h3>
			</div>
		</Card>
	);
};
export { PlayerAnswerCard, PlayerAnswerTFCard };
