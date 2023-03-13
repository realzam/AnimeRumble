import { useContext } from 'react';

import {
	DndContext,
	closestCenter,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent,
} from '@dnd-kit/core';
import {
	restrictToVerticalAxis,
	restrictToWindowEdges,
} from '@dnd-kit/modifiers';
import {
	arrayMove,
	SortableContext,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Container } from '@mui/system';

import QuestionPreviewItem from './QuestionPreviewItem';

import { animeRumbleApi } from '@/api';
import { QuizContext } from '@/context';

const SortableQuizzesList = (): JSX.Element => {
	const { quiz, updateQuestions, setIsDragging } = useContext(QuizContext);
	const { questions } = quiz;

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (over) {
			if (active.id !== over.id) {
				const oldIndex = questions.findIndex(q => q.id === active.id);
				const newIndex = questions.findIndex(q => q.id === over.id);
				const newOrderquestions = arrayMove(questions, oldIndex, newIndex);
				updateQuestions(newOrderquestions);
				setTimeout(() => {
					setIsDragging(false);
				}, 100);
				animeRumbleApi.put(`/quiz/sort-questions`, {
					quizID: quiz.id,
					from: oldIndex,
					to: newIndex,
				});
			}
		}
	};
	return (
		<Container>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
				onDragStart={() => {
					setIsDragging(true);
				}}
				modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
			>
				<SortableContext
					items={questions.map(q => q.id)}
					strategy={verticalListSortingStrategy}
				>
					{questions.map((question, index) => (
						<QuestionPreviewItem key={question.id} index={index} />
					))}
				</SortableContext>
			</DndContext>
		</Container>
	);
};

export default SortableQuizzesList;
