import { useContext, useEffect, useMemo, useState } from 'react';

import {
	Card,
	CardContent,
	Stack,
	Divider,
	Paper,
	InputBase,
	Tooltip,
	TooltipProps,
	styled,
	tooltipClasses,
} from '@mui/material';
import { Box } from '@mui/system';
import { useDebouncedCallback } from 'use-debounce';

import UploadImage from '../ui/UploadImage';

import ConfigQuestionQuiz from './ConfigQuestionQuiz';
import QuestionTypeQuiz from './QuestionTypeQuiz';
import QuestionTypeTrueFalse from './QuestionTypeTrueFalse';

import { animeRumbleApi } from '@/api';
import { QuizContext } from '@/context';
import { useValidQuestion } from '@/hooks';
import useQuiz from '@/hooks/useQuiz';

const WarningTooltip = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip
		{...props}
		classes={{ popper: className }}
		disableFocusListener
		disableHoverListener
		disableTouchListener
		arrow
	/>
))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: theme.palette.warning.main,
		color: theme.palette.warning.contrastText,
		fontSize: 14,
		'& .MuiTooltip-arrow': {
			color: theme.palette.warning.main,
		},
	},
}));

const QuizQuestionContainer = (): JSX.Element => {
	const [touched, setTouched] = useState(false);
	const { quiz, mutate } = useQuiz();
	const { index } = useContext(QuizContext);
	const question = useMemo(() => quiz.questions[index], [index, quiz]);
	const {
		isValidQuestion,
		isValidCorrectAnswersQuiz,
		isValidAnswers,
		isValidCorrectAnswersTrueFalse,
	} = useValidQuestion(question.id);
	const debounced = useDebouncedCallback(async (value: string) => {
		console.log('/quiz/update-question/', value.trim());
		const { data } = await animeRumbleApi.put(`/quiz/update-question/`, {
			quizID: quiz.id,
			questionID: question.id,
			question: value.trim(),
		});
		mutate(data);
	}, 1000);
	const setFile = useDebouncedCallback(async (file?: File) => {
		console.log('save imagequestion', question.id);
		const dataForm = new FormData();
		dataForm.set('quizID', quiz.id);
		dataForm.set('questionID', question.id);
		dataForm.set('img', file || '');
		// console.log('/quiz/update-question/', value.trim());
		const { data } = await animeRumbleApi.put(
			`/quiz/update-question/`,
			dataForm,
		);
		mutate(data);
	}, 1000);
	useEffect(() => {
		return () => {
			debounced.flush();
			setFile.flush();
		};
	}, [index, debounced, setFile]);

	return (
		<Card
			sx={{
				// minWidth: '750px',
				maxWidth: '1000px',
				margin: '0 auto',
			}}
		>
			<CardContent>
				<Stack spacing={5}>
					<ConfigQuestionQuiz />
					<Divider />
					<WarningTooltip
						title='Es necesaria una pregunta'
						open={touched && !isValidQuestion}
						placement='bottom'
						sx={{
							zIndex: 100,
						}}
					>
						<Paper variant='darken'>
							<InputBase
								autoFocus
								fullWidth
								multiline
								placeholder='Escribe tu pregunta'
								onChange={e => {
									const newQuestionValue = e.target.value;
									const newQuestionsArray = [...quiz.questions];
									newQuestionsArray[index] = {
										...question,
										question: newQuestionValue,
									};
									mutate({ ...quiz, questions: [...newQuestionsArray] });
									debounced(newQuestionValue);
								}}
								onBlur={() => setTouched(true)}
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
					</WarningTooltip>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Paper
							variant='darken'
							sx={{
								height: '300px',
								width: '533px',
							}}
						>
							<UploadImage
								callback={setFile}
								initialImage={question.img}
								confirmDelete
							/>
						</Paper>
					</Box>
					{question.type === 'Quiz' ? (
						<WarningTooltip
							title='Selecciona al menos una respuesta correcta'
							open={isValidAnswers && !isValidCorrectAnswersQuiz}
							placement='top'
							sx={{
								zIndex: 100,
							}}
						>
							<Box>
								<QuestionTypeQuiz />
							</Box>
						</WarningTooltip>
					) : (
						<WarningTooltip
							title='Selecciona una respuesta correcta'
							open={!isValidCorrectAnswersTrueFalse}
							placement='top'
							sx={{
								zIndex: 100,
							}}
						>
							<Box>
								<QuestionTypeTrueFalse />
							</Box>
						</WarningTooltip>
					)}
				</Stack>
			</CardContent>
		</Card>
	);
};

export default QuizQuestionContainer;
