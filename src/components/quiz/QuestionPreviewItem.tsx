import { useContext, useMemo } from 'react';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import CircleIcon from '@mui/icons-material/Circle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { Button, Card, CardActionArea, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Stack } from '@mui/system';

import { animeRumbleApi } from '@/api';
import { QuizContext } from '@/context/quiz';
import { IQuizQuestion } from '@/interfaces';

interface Props {
	index: number;
}
const QuestionPreviewItem = ({ index }: Props): JSX.Element => {
	const {
		setIndex,
		quiz,
		index: currentQuestion,
		updateQuestions,
	} = useContext(QuizContext);
	const question = quiz.questions[index];

	const isSelected = useMemo(
		() => currentQuestion === index,
		[index, currentQuestion],
	);

	const isUndefinedCorrectAnswerTrueFalse =
		question.correctAnswerTrueFalse === undefined;

	const sxBox = {
		borderColor: 'white',
		border: 1,
		height: 18,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'end',
		paddingRight: '5px',
	};

	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id: question.id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<>
			<Card
				ref={setNodeRef}
				style={style}
				{...attributes}
				sx={{
					boxSizing: 'border-box',
					background: '#111111',
					marginY: 2,
					display: 'flex',
					direction: 'row',
					alignItems: 'center',
					border: isSelected ? '1px solid #AAA' : '1px solid transparent',
				}}
			>
				<CardActionArea
					sx={{ p: 2 }}
					onClick={() => {
						setIndex(index);
					}}
				>
					<Stack direction='column' spacing={1}>
						<Typography textAlign='center' noWrap>
							{question.question.length > 0 ? question.question : 'Pregunta'}
						</Typography>
						<Grid container rowSpacing={1} columnSpacing={1}>
							{question.type === 'Quiz' ? (
								<>
									<Grid xs={6}>
										<Box sx={sxBox} color='#d01937'>
											{question.correctAnswersQuiz[0] && (
												<CircleIcon sx={{ fontSize: '14px', color: 'green' }} />
											)}
										</Box>
									</Grid>
									<Grid xs={6}>
										<Box sx={sxBox} color='#1368ce'>
											{question.correctAnswersQuiz[1] && (
												<CircleIcon sx={{ fontSize: '14px', color: 'green' }} />
											)}
										</Box>
									</Grid>
									<Grid xs={6}>
										<Box sx={sxBox} color='#c79200'>
											{question.correctAnswersQuiz[2] && (
												<CircleIcon sx={{ fontSize: '14px', color: 'green' }} />
											)}
										</Box>
									</Grid>
									<Grid xs={6}>
										<Box sx={sxBox} color='#237e0b'>
											{question.correctAnswersQuiz[3] && (
												<CircleIcon sx={{ fontSize: '14px', color: 'green' }} />
											)}
										</Box>
									</Grid>
								</>
							) : (
								<>
									<Grid xs={6}>
										<Box sx={sxBox} color='#1368ce'>
											{!isUndefinedCorrectAnswerTrueFalse &&
												question.correctAnswerTrueFalse && (
													<CircleIcon
														sx={{ fontSize: '14px', color: 'green' }}
													/>
												)}
										</Box>
									</Grid>

									<Grid xs={6}>
										<Box sx={sxBox} color='#d01937'>
											{!isUndefinedCorrectAnswerTrueFalse &&
												!question.correctAnswerTrueFalse && (
													<CircleIcon
														sx={{ fontSize: '14px', color: 'green' }}
													/>
												)}
										</Box>
									</Grid>
								</>
							)}
						</Grid>
					</Stack>
				</CardActionArea>
				<Stack direction='column'>
					{isSelected && (
						<Button
							aria-label='copy'
							color='warning'
							sx={{
								p: 0,
								m: 1,
								minWidth: 0,
							}}
							onClick={async () => {
								const { data } = await animeRumbleApi.put<IQuizQuestion[]>(
									`/quiz/copy-question`,
									{
										quizID: quiz.id,
										questionID: question.id,
									},
								);
								updateQuestions(data);
								setIndex(index + 1);
							}}
						>
							<ContentCopyIcon />
						</Button>
					)}
					<Button
						{...listeners}
						disableRipple={true}
						sx={{
							p: 0,
							m: 1,
							minWidth: 0,
							height: '100%',
							cursor: 'grab',
						}}
					>
						<DragIndicatorIcon />
					</Button>
					{isSelected && (
						<Button
							aria-label='delete'
							color='error'
							sx={{
								p: 0,
								m: 1,
								minWidth: 0,
							}}
							onClick={async () => {
								const { data } = await animeRumbleApi.put<IQuizQuestion[]>(
									`/quiz/delete-question`,
									{
										quizID: quiz.id,
										questionID: question.id,
									},
								);
								updateQuestions(data);
							}}
						>
							<DeleteOutlineIcon />
						</Button>
					)}
				</Stack>
			</Card>
		</>
	);
};

export default QuestionPreviewItem;
