import React from 'react';
import { Show, useComputed } from '@legendapp/state/react';
import { Check, X } from 'lucide-react';

import { cn } from '@/lib/utils';
import usePlayQuiz from '@/hooks/usePlayQuiz';
import { Card } from '@/components/ui/Card';

const PlayerAnswerTFCard = ({
	variantTrue = true,
}: {
	variantTrue?: boolean;
}) => {
	const { answer, correctAns, showCorrectAnswer, isLoadingAnswer } =
		usePlayQuiz();

	const chooseCorrect = useComputed(
		() =>
			(correctAns[0].get() === 1 && variantTrue) ||
			(correctAns[0].get() === 0 && !variantTrue),
	);
	const disable = useComputed(
		() => showCorrectAnswer.get() || isLoadingAnswer.get(),
	);
	return (
		<Card
			className={cn(
				'flex h-24 cursor-pointer items-center overflow-hidden transition-all duration-300 ease-in-out hover:scale-105',
				variantTrue ? 'bg-blue-500' : 'bg-red-500',
				showCorrectAnswer.get() &&
					(chooseCorrect.get() ? 'bg-green-500' : 'bg-red-500'),
			)}
			onClick={() => {
				if (!disable.get()) {
					answer(variantTrue ? 1 : 0);
				}
			}}
		>
			<div className='h-full w-24' />
			<div className='flex h-full w-full items-center justify-between'>
				<h3 className='text-xl font-semibold leading-none text-slate-100'>
					{variantTrue ? 'Verdadero' : 'Falso'}
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
		</Card>
	);
};

export default PlayerAnswerTFCard;
