'use client';

import { Show, useObservable, useObserve } from '@legendapp/state/react';
import { IconMenuOrder } from '@tabler/icons-react';
import { Trash2 } from 'lucide-react';

import useQuiz from '@/hooks/useQuiz';
import { Button } from '@ui/Button';

import QuestionItemListActionDelete from './QuestionItemListActionDelete';

interface Props {
	questionId: string;
}

const QuestionItemListActions = ({ questionId }: Props) => {
	const { quiz } = useQuiz();
	const hidde = useObservable(() => quiz.questions.get().length > 1);

	useObserve(quiz.questions, () => {
		hidde.set(quiz.questions.get().length > 1);
	});

	return (
		<Show if={hidde}>
			<div className='mr-2 flex h-full shrink-0 flex-col justify-around'>
				<Button
					variant='ghost'
					className='p-1 text-destructive/10 hover:text-destructive'
				>
					<Trash2 />
				</Button>
				<div className='p-1'>
					<IconMenuOrder className='cursor-grab' />
				</div>
				<QuestionItemListActionDelete questionId={questionId} />
			</div>
		</Show>
	);
};

export default QuestionItemListActions;
