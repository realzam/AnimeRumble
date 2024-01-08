'use client';

import { trpc } from '@/trpc/client/client';
import {
	closestCenter,
	DndContext,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	type DragEndEvent,
} from '@dnd-kit/core';
import {
	restrictToFirstScrollableAncestor,
	restrictToVerticalAxis,
} from '@dnd-kit/modifiers';
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Computed, For, useSelector } from '@legendapp/state/react';

import useQuiz from '@/hooks/useQuiz';
import { ScrollArea } from '@ui/ScrollArea';

import QuestionItemList from './QuestionItemList';

const QuestionsList = () => {
	const { quiz, ui, props, id } = useQuiz();
	const shortQuestions = trpc.quizz.shortQuestions.useMutation();
	const questions = useSelector(() => quiz.questions.get());
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);
	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;

		if (over && active.id !== over.id) {
			const current = questions.slice();
			const oldIndex = questions.findIndex((q) => q.id === active.id);
			const newIndex = questions.findIndex((q) => q.id === over.id);
			const res = arrayMove(current, oldIndex, newIndex);

			quiz.questions.set(res);

			shortQuestions.mutate(
				{
					quizId: id,
					questionId: active.id as string,
					newPosition: newIndex,
				},
				{
					onSettled: () => {
						props.refetch();
					},
				},
			);
		}
		ui.isDragging.set(false);
	}

	return (
		<ScrollArea type='always' className='ml-3 h-full pr-1'>
			<div className='mb-3 h-full w-[calc((100vw-16px)*0.286-38px)] max-w-[360px] p-1'>
				<Computed>
					{() => (
						<DndContext
							sensors={sensors}
							collisionDetection={closestCenter}
							onDragEnd={handleDragEnd}
							modifiers={[
								restrictToVerticalAxis,
								restrictToFirstScrollableAncestor,
							]}
							onDragStart={() => {
								ui.isDragging.set(true);
							}}
						>
							<SortableContext
								items={questions}
								strategy={verticalListSortingStrategy}
							>
								<For each={quiz.questions} item={QuestionItemList} />
							</SortableContext>
						</DndContext>
					)}
				</Computed>
			</div>
		</ScrollArea>
	);
};

export default QuestionsList;
