import { useContext } from 'react';

import SettingsIcon from '@mui/icons-material/Settings';
import { Button, Divider, IconButton, Paper, Typography } from '@mui/material';
import { Stack } from '@mui/system';

import SortableQuizzesList from './SortableQuizzesList';

import { animeRumbleApi } from '@/api';
import { QuizContext } from '@/context';
import useQuiz from '@/hooks/useQuiz';
import { IQuiz } from '@/interfaces';

const QuestionsPreviewList = (): JSX.Element => {
	const { setIndex } = useContext(QuizContext);
	const { quiz, mutate } = useQuiz();

	return (
		<Paper
			sx={{
				width: '330px',
				flexShrink: 0,
				boxShadow: '0px 2px 10px 0px rgba(0,0,0,0.15)',
				overflowY: 'auto',
				display: 'flex',
				flexDirection: 'column',
			}}
		>
			<Stack
				direction='row'
				justifyContent='space-between'
				alignItems='center'
				sx={{
					m: 2,
				}}
			>
				<Typography variant='h6'>{quiz.title}</Typography>
				<IconButton color='primary'>
					<SettingsIcon />
				</IconButton>
			</Stack>
			<Button
				onClick={async () => {
					const { data } = await animeRumbleApi.post<IQuiz>(
						'/quiz/add-question',
						{
							quizID: quiz.id,
						},
					);
					mutate({ ...data });
					setIndex(data.questions.length - 1);
				}}
				sx={{
					m: 2,
				}}
			>
				Añadir Pregunta
			</Button>
			<Divider>
				{quiz.questions.length} Pregunta{quiz.questions.length > 1 && 's'}
			</Divider>

			<SortableQuizzesList />
		</Paper>
	);
};

export default QuestionsPreviewList;
