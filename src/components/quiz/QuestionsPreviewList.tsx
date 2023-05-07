import { Button, Card } from '@mui/material';
import { Stack } from '@mui/system';

import SortableQuizzesList from './SortableQuizzesList';

import { animeRumbleApi } from '@/api';
import useQuiz from '@/hooks/useQuiz';
import { IQuiz } from '@/interfaces';

const QuestionsPreviewList = (): JSX.Element => {
	const { quiz, mutate } = useQuiz();

	return (
		<Card>
			<Stack>
				<SortableQuizzesList />
				<Button
					onClick={async () => {
						const { data } = await animeRumbleApi.post<IQuiz>(
							'/quiz/add-question',
							{
								quizID: quiz.id,
							},
						);
						mutate({ ...data });
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
