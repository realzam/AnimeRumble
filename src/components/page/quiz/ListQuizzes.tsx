'use client';

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
import { ScrollArea } from '@/components/ui/ScrollArea';

import QuestionItemList from './QuestionItemList';

const ListQuizzes = () => {
	const { quiz, trpcUtils, props$, id, ui } = useQuiz();
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

			trpcUtils.client.quizz.shortQuestions
				.mutate({
					quizId: id,
					questionId: active.id as string,
					newPosition: newIndex,
				})
				.then(() => props$.refetch());
		}
		ui.isDragging.set(false);
	}

	return (
		<ScrollArea type='always' className='ml-3 h-full pr-1'>
			<div className='h-full w-72 p-1'>
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

export default ListQuizzes;
