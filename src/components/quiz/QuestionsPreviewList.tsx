import { useContext } from 'react';

import { Button, Card } from '@mui/material';
import { Stack } from '@mui/system';

import SortableQuizzesList from './SortableQuizzesList';

import { animeRumbleApi } from '@/api';
import { QuizContext } from '@/context';
import { IQuizQuestion } from '@/interfaces';

const QuestionsPreviewList = (): JSX.Element => {
	const { quiz, addQuestion } = useContext(QuizContext);

	return (
		<Card>
			<Stack>
				<SortableQuizzesList />
				<Button
					onClick={async () => {
						const { data } = await animeRumbleApi.post<IQuizQuestion>(
							'/quiz/add-question',
							{ quizID: quiz.id },
						);
						addQuestion(data);
					}}
					sx={{
						m: 2,
					}}
				>
					Añadir Pregunta
				</Button>
			</Stack>
		</Card>
	);
};

export default QuestionsPreviewList;
