import { useContext } from 'react';

import {
	Card,
	CardContent,
	Stack,
	Divider,
	Paper,
	InputBase,
} from '@mui/material';
import { useDebouncedCallback } from 'use-debounce';

import ConfigQuestionQuiz from './ConfigQuestionQuiz';
import QuestionTypeQuiz from './QuestionTypeQuiz';
import QuestionTypeTrueFalse from './QuestionTypeTrueFalse';

import { animeRumbleApi } from '@/api';
import { QuizContext } from '@/context/quiz';

const QuizQuestionContainer = (): JSX.Element => {
	const { quiz, question, updateQuestion } = useContext(QuizContext);
	const debounced = useDebouncedCallback(async (value: string) => {
		await animeRumbleApi.put(`/quiz/update-question/`, {
			quizID: quiz.id,
			questionID: question.id,
			question: value.trim(),
		});
	}, 1000);

	return (
		<Card>
			<CardContent>
				<Stack spacing={5}>
					<ConfigQuestionQuiz />
					<Divider />
					<Paper sx={{ background: '#111111' }}>
						<InputBase
							autoFocus
							fullWidth
							multiline
							placeholder='Escribe tu pregunta'
							onChange={e => {
								const newQuestionValue = e.target.value;
								updateQuestion({ ...question, question: newQuestionValue });
								debounced(newQuestionValue);
							}}
							value={question.question}
							sx={{
								'.MuiInputBase-input ': {
									textAlign: 'center',
									fontSize: 30,
									lineHeight: 1,
								},
								ml: 1,
								flex: 1,
								p: 1,
							}}
						/>
					</Paper>

					{question.type === 'Quiz' ? (
						<QuestionTypeQuiz />
					) : (
						<QuestionTypeTrueFalse />
					)}
				</Stack>
			</CardContent>
		</Card>
	);
};

export default QuizQuestionContainer;
