import { useContext, useEffect } from 'react';

import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import {
	Card,
	CardMedia,
	InputBase,
	Radio,
	styled,
	Tooltip,
	tooltipClasses,
	TooltipProps,
} from '@mui/material';
import Fade from '@mui/material/Fade';
import { useDebouncedCallback } from 'use-debounce';

import { animeRumbleApi } from '@/api';
import { QuizContext } from '@/context';

interface Props {
	placeholder?: string;
	index: 0 | 1 | 2 | 3;
	variant?: 'red' | 'blue' | 'green' | 'yellow';
}

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

const AnswerQuizNormal = ({
	variant = 'red',
	placeholder = 'Agregar Respuesta',
	index,
}: Props): JSX.Element => {
	const { question, quiz, updateQuestion } = useContext(QuizContext);

	const answerValue = question.answers[index];
	const correctAnswerQuizValue = question.correctAnswersQuiz[index];

	const debounced = useDebouncedCallback(async (value: string) => {
		await animeRumbleApi.put(`/quiz/update-question`, {
			quizID: quiz.id,
			questionID: question.id,
			answer: [index, value.trim()],
		});
	}, 1000);

	const debouncedCorrect = useDebouncedCallback(async (value: boolean) => {
		await animeRumbleApi.put(`/quiz/update-question`, {
			quizID: quiz.id,
			questionID: question.id,
			correctAnswerQuiz: [index, value],
		});
	}, 1000);

	useEffect(
		() => () => {
			debounced.flush();
			debouncedCorrect.flush();
		},
		[debounced, debouncedCorrect],
	);

	let color = '#d01937';
	let figure = <circle cx='20' cy='50' r='15' fill='white' />;
	switch (variant) {
		case 'red':
			color = '#d01937';
			figure = <polygon points='5,63 20,37 35,63' fill='white' />;
			break;
		case 'blue':
			color = '#1368ce';
			figure = (
				<rect
					x='10'
					y='40'
					width='21'
					height='21'
					fill='white'
					transform='rotate(45,20,50)'
				/>
			);
			break;
		case 'green':
			color = '#237e0b';
			figure = <rect x='5' y='35' width='30' height='30' fill='white' />;
			break;
		case 'yellow':
			color = '#c79200';
			figure = <circle cx='20' cy='50' r='15' fill='white' />;
			break;
		default:
			break;
	}
	return (
		<WarningTooltip
			open={
				(variant == 'red' || variant == 'blue') &&
				answerValue.trim().length == 0
			}
			title='Es necesario agregar una respuesta'
		>
			<Card
				sx={{
					display: 'flex',
					padding: '5px',
					background: answerValue.length > 0 ? color : '#111111',
					flexDirection: 'row',
					alignItems: 'center',
					transition: 'all 0.25s ease',
				}}
			>
				<Card
					elevation={0}
					sx={{
						width: 40,
						height: 100,
						borderRight: `${color} 3px solid`,
						backgroundColor: color,
					}}
				>
					<CardMedia component='svg'>{figure}</CardMedia>
				</Card>

				<InputBase
					// autoFocus
					fullWidth
					multiline
					maxRows={4}
					placeholder={placeholder}
					sx={{ ml: 1, flex: 1, fontSize: 20 }}
					value={answerValue}
					onChange={e => {
						const newAnswer = e.target.value.trimStart();
						const answers = question.answers;
						const correctAnswersQuiz = question.correctAnswersQuiz;
						answers[index] = newAnswer;
						if (newAnswer.length === 0) {
							correctAnswersQuiz[index] = false;
							debouncedCorrect(false);
							debouncedCorrect.flush();
						}
						updateQuestion({
							...question,
							answers: [...answers],
							correctAnswersQuiz: [...correctAnswersQuiz],
						});
						debounced(newAnswer);
					}}
				/>

				{answerValue.length > 0 && (
					<Tooltip
						title='Respuesta Correcta'
						arrow
						TransitionComponent={Fade}
						TransitionProps={{ timeout: 600 }}
					>
						<Radio
							checkedIcon={<CheckCircleOutlineOutlinedIcon />}
							name='radio-buttons'
							checked={correctAnswerQuizValue}
							onClick={async () => {
								const newCorrectAnswerQuiz = !correctAnswerQuizValue;
								const correctAnswersQuiz = question.correctAnswersQuiz;
								correctAnswersQuiz[index] = newCorrectAnswerQuiz;
								updateQuestion({
									...question,
									correctAnswersQuiz: [...correctAnswersQuiz],
								});

								debouncedCorrect(newCorrectAnswerQuiz);
							}}
							sx={{
								color: '#E1E1E1E1',
								'& .MuiSvgIcon-root': {
									fontSize: 45,
								},
								'&.Mui-checked': {
									color: '#E1E1E1E1',
								},
							}}
						/>
					</Tooltip>
				)}
			</Card>
		</WarningTooltip>
	);
};

export default AnswerQuizNormal;
