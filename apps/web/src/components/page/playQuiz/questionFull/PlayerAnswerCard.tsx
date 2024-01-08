'use client';

import { useMemo } from 'react';
import { reactive, Show, useComputed } from '@legendapp/state/react';
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
	const { answer, showCorrectAnswer, correctAns, isLoadingAnswer } =
		usePlayQuiz();
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

	const chooseCorrect = useComputed(() => correctAns.get().includes(index));
	const disable = useComputed(
		() => showCorrectAnswer.get() || isLoadingAnswer.get(),
	);
	return (
		<ReactiveCard
			$className={() =>
				cn(
					'col-span-1 flex h-20 items-center overflow-hidden border-none p-2 shadow-lg transition-all duration-300 ease-in-out md:h-28',
					!disable.get() && 'cursor-pointer hover:scale-105 ',
					color,
					showCorrectAnswer.get() &&
						(chooseCorrect.get() ? 'bg-green-500' : 'bg-red-500'),
				)
			}
			onClick={() => {
				if (!disable.get()) {
					answer(index);
				}
			}}
		>
			<div className='hidden h-full w-12 sm:block' />
			<div className='flex h-full w-full items-center justify-between'>
				<h3 className='text-sm font-semibold leading-none text-slate-100 md:text-xl'>
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

export default PlayerAnswerCard;
