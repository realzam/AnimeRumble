import { useContext, useEffect } from 'react';

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

import ConfigQuestionQuiz from './ConfigQuestionQuiz';
import QuestionTypeQuiz from './QuestionTypeQuiz';
import QuestionTypeTrueFalse from './QuestionTypeTrueFalse';

import { animeRumbleApi } from '@/api';
import { QuizContext } from '@/context';
import { useValidQuestion } from '@/hooks';

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
	const { quiz, question, updateQuestion, index } = useContext(QuizContext);
	const {
		isValidQuestion,
		isValidCorrectAnswersQuiz,
		isValidAnswers,
		isValidCorrectAnswersTrueFalse,
	} = useValidQuestion(question.id);
	const debounced = useDebouncedCallback(async (value: string) => {
		console.log('/quiz/update-question/', value.trim());
		await animeRumbleApi.put(`/quiz/update-question/`, {
			quizID: quiz.id,
			questionID: question.id,
			question: value.trim(),
		});
	}, 1000);

	useEffect(() => {
		return () => {
			debounced.flush();
		};
	}, [debounced, index]);

	return (
		<Card>
			<CardContent>
				<Stack spacing={5}>
					<ConfigQuestionQuiz />
					<Divider />
					<WarningTooltip
						title='Es necesaria un pregunta'
						open={!isValidQuestion}
						placement='bottom'
					>
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
					</WarningTooltip>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Paper
							sx={{
								background: '#111111',
								height: '300px',
								width: '400px',
							}}
						></Paper>
					</Box>
					{question.type === 'Quiz' ? (
						<WarningTooltip
							title='Selecciona al menos una respuesta correcta'
							open={isValidAnswers && !isValidCorrectAnswersQuiz}
							placement='top'
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
