import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { Show, useComputed } from '@legendapp/state/react';
import { GripVertical, Trash2 } from 'lucide-react';

import useQuiz from '@/hooks/useQuiz';
import { Button } from '@/components/ui/Button';

interface Props {
	id: string;
}

const QuestionItemActionsList = ({ id }: Props) => {
	const { listeners } = useSortable({ id });
	const { quiz, ui, openDeleteQuestion } = useQuiz();
	const showAllActions = useComputed(() => quiz.questions.get().length > 1);
	const showDelete = useComputed(
		() => !ui.isDragging.get() && quiz.questions.get().length > 1,
	);

	return (
		<Show if={showAllActions}>
			<div className='flex h-full flex-col justify-between p-2'>
				<div className='h-9 w-9' />

				<Button
					variant='ghost'
					size='icon'
					className='cursor-grab p-0'
					{...listeners}
				>
					<GripVertical />
				</Button>
				<Show if={showDelete} else={<div className='h-9 w-9' />}>
					<Button
						onClick={() => openDeleteQuestion(id)}
						variant='ghost'
						size='icon'
						className='p-0 text-destructive/50 hover:bg-transparent hover:text-destructive'
					>
						<Trash2 />
					</Button>
				</Show>
			</div>
		</Show>
	);
};

export default QuestionItemActionsList;
