'use client';

import { useSortable } from '@dnd-kit/sortable';
import { Show, useComputed } from '@legendapp/state/react';
import { GripVertical } from 'lucide-react';

import useQuiz from '@/hooks/useQuiz';
import { Button } from '@ui/Button';

import QuestionItemListActionDelete from './QuestionItemListActionDelete';

interface Props {
	questionId: string;
}

const QuestionItemListActions = ({ questionId }: Props) => {
	const { quiz, ui } = useQuiz();
	const { listeners } = useSortable({ id: questionId });
	const showAllActions = useComputed(() => quiz.questions.get().length > 1);
	const show = useComputed(
		() => !ui.isDragging.get() && quiz.questions.get().length > 1,
	);

	return (
		<Show if={showAllActions}>
			<div className='flex w-9 shrink flex-col items-center justify-around p-1'>
				<Show if={show}>
					{/* <Button
						variant='ghost'
						size='icon'
						className='p-0 text-destructive/10 hover:bg-transparent hover:text-destructive'
					>
						<Trash2 />
					</Button> */}
					<div className='h-9 w-9' />
				</Show>

				<Button
					variant='ghost'
					size='icon'
					className='cursor-grab p-0'
					{...listeners}
				>
					<GripVertical />
				</Button>

				<Show if={show}>
					<QuestionItemListActionDelete questionId={questionId} />
				</Show>
			</div>
		</Show>
	);
};

export default QuestionItemListActions;
