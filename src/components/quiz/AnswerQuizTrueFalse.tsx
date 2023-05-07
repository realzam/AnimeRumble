import { useContext } from 'react';

import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import { Card, CardMedia, Radio, Tooltip, Typography } from '@mui/material';
import Fade from '@mui/material/Fade';
import { useDebouncedCallback } from 'use-debounce';

import { animeRumbleApi } from '@/api';
import { QuizContext } from '@/context';
import useQuiz from '@/hooks/useQuiz';
import { IQuizQuestion } from '@/interfaces';

interface Props {
	variant: 'true' | 'false';
}

const AnswerQuizTrueFalse = ({ variant }: Props): JSX.Element => {
	const { quiz, mutate } = useQuiz();
	const { index } = useContext(QuizContext);
	const question = quiz.questions[index];

	const updateQuestion = (payload: IQuizQuestion) => {
		const newQuestionsArray = [...quiz.questions];
		newQuestionsArray[index] = {
			...payload,
		};
		mutate({ ...quiz, questions: [...newQuestionsArray] });
	};

	const correctAnswerTrueFalseValue = question.correctAnswerTrueFalse;

	const debouncedCorrect = useDebouncedCallback(async (value: boolean) => {
		await animeRumbleApi.put(`/quiz/update-question/`, {
			quizID: quiz.id,
			questionID: question.id,
			correctAnswerTrueFalse: value,
		});
	}, 1000);

	let color = '#d01937';
	let figure = <circle cx='20' cy='50' r='15' fill='white' />;
	switch (variant) {
		case 'false':
			color = '#d01937';
			figure = <polygon points='5,63 20,37 35,63' fill='white' />;
			break;

		case 'true':
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

		default:
			break;
	}
	return (
		<Card
			sx={{
				display: 'flex',
				padding: '5px',
				background: color,
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
					boxShadow: 'none',
				}}
			>
				<CardMedia component='svg'>{figure}</CardMedia>
			</Card>

			<Typography variant='h6' sx={{ ml: 1, flex: 1, color: 'white' }}>
				{variant == 'true' ? 'Verdadero' : 'Falso'}
			</Typography>

			<Tooltip
				title='Respuesta Correcta'
				arrow
				TransitionComponent={Fade}
				TransitionProps={{ timeout: 600 }}
			>
				<Radio
					checkedIcon={<CheckCircleOutlineOutlinedIcon />}
					name='radio-buttons'
					checked={
						correctAnswerTrueFalseValue === undefined
							? false
							: variant === 'true'
							? correctAnswerTrueFalseValue
							: !correctAnswerTrueFalseValue
					}
					onClick={() => {
						let newCorrectAnswerTrueFalseValue = correctAnswerTrueFalseValue;
						if (correctAnswerTrueFalseValue === undefined) {
							newCorrectAnswerTrueFalseValue =
								variant === 'true' ? true : false;
						} else {
							newCorrectAnswerTrueFalseValue = !correctAnswerTrueFalseValue;
						}

						updateQuestion({
							...question,
							correctAnswerTrueFalse: newCorrectAnswerTrueFalseValue,
						});
						debouncedCorrect(newCorrectAnswerTrueFalseValue);
					}}
					inputProps={{
						'aria-label': variant == 'true' ? 'Verdadero' : 'Falso',
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
		</Card>
	);
};

export default AnswerQuizTrueFalse;
