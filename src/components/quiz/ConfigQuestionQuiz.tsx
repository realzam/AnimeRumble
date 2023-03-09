import { useContext } from 'react';

import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import {
	Stack,
	InputLabel,
	Typography,
	FormControl,
	Select,
	MenuItem,
} from '@mui/material';

import { animeRumbleApi } from '@/api';
import { QuizContext } from '@/context/quiz';
import {
	QuizQuestionPoints,
	QuizQuestionTimeLimit,
	QuizQuestionType,
} from '@/interfaces';

const ConfigQuestionQuiz = (): JSX.Element => {
	const { updateQuestion, question, quiz } = useContext(QuizContext);
	return (
		<Stack
			spacing={5}
			direction='row'
			justifyContent='space-around'
			alignItems='center'
		>
			<Stack alignItems='center'>
				<InputLabel variant='standard' id='time-limit-label'>
					<Stack
						direction='row'
						alignItems='center'
						spacing={1}
						sx={{
							p: 1,
						}}
					>
						<HelpOutlineIcon />
						<Typography variant='h6'>Tipo de pregunta</Typography>
					</Stack>
				</InputLabel>
				<FormControl fullWidth>
					<Select
						value={question.type}
						onChange={async event => {
							const type = event.target.value as QuizQuestionType;
							await animeRumbleApi.put(`/quiz/update-question/`, {
								quizID: quiz.id,
								questionID: question.id,
								type: event.target.value,
							});
							updateQuestion({ ...question, type });
						}}
					>
						<MenuItem value='Quiz'>Quiz</MenuItem>
						<MenuItem value='TrueFalse'>Verdadero o False</MenuItem>
					</Select>
				</FormControl>
			</Stack>
			<Stack alignItems='center'>
				<InputLabel variant='standard' id='time-limit-label'>
					<Stack
						alignItems='center'
						direction='row'
						spacing={1}
						sx={{
							p: 1,
						}}
					>
						<AccessTimeOutlinedIcon />
						<Typography variant='h6'>Límite de tiempo</Typography>
					</Stack>
				</InputLabel>
				<FormControl fullWidth>
					<Select
						value={question.time}
						onChange={async event => {
							const time = event.target.value as QuizQuestionTimeLimit;
							updateQuestion({ ...question, time });
							await animeRumbleApi.put(`/quiz/update-question/`, {
								quizID: quiz.id,
								questionID: question.id,
								time: event.target.value,
							});
						}}
					>
						<MenuItem value='5'>5 segundos</MenuItem>
						<MenuItem value='10'>10 segundos</MenuItem>
						<MenuItem value='20'>20 segundos</MenuItem>
						<MenuItem value='30'>30 segundos</MenuItem>
						<MenuItem value='60'>1 minuto</MenuItem>
						<MenuItem value='90'>1 minuto y 30 segundos</MenuItem>
						<MenuItem value='120'>2 minuto</MenuItem>
					</Select>
				</FormControl>
			</Stack>
			<Stack alignItems='center'>
				<InputLabel variant='standard' id='time-limit-label'>
					<Stack
						direction='row'
						spacing={1}
						sx={{
							p: 1,
						}}
						alignItems='center'
					>
						<WorkspacePremiumIcon />
						<Typography variant='h6'>Puntos</Typography>
					</Stack>
				</InputLabel>
				<FormControl fullWidth>
					<Select
						value={question.points}
						onChange={async event => {
							const points = event.target.value as QuizQuestionPoints;
							updateQuestion({ ...question, points });
							await animeRumbleApi.put(`/quiz/update-question/`, {
								quizID: quiz.id,
								questionID: question.id,
								points: event.target.value,
							});
						}}
					>
						<MenuItem value='Standar'>Estandar</MenuItem>
						<MenuItem value='Double'>Puntos dobles</MenuItem>
						<MenuItem value='None'>Sin puntos</MenuItem>
					</Select>
				</FormControl>
			</Stack>
		</Stack>
	);
};

export default ConfigQuestionQuiz;
