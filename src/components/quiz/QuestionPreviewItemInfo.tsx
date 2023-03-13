import { useContext } from 'react';

import CircleIcon from '@mui/icons-material/Circle';
import { CardActionArea, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Stack } from '@mui/system';

import { QuizContext } from '@/context';

interface Props {
	index: number;
}
const QuestionPreviewItemInfo = ({ index }: Props): JSX.Element => {
	const { setIndex, quiz } = useContext(QuizContext);
	const question = quiz.questions[index];

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

	return (
		<CardActionArea
			sx={{
				flex: '1',
				minWidth: 0,
				p: 2,
			}}
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
											<CircleIcon sx={{ fontSize: '14px', color: 'green' }} />
										)}
								</Box>
							</Grid>

							<Grid xs={6}>
								<Box sx={sxBox} color='#d01937'>
									{!isUndefinedCorrectAnswerTrueFalse &&
										!question.correctAnswerTrueFalse && (
											<CircleIcon sx={{ fontSize: '14px', color: 'green' }} />
										)}
								</Box>
							</Grid>
						</>
					)}
				</Grid>
			</Stack>
		</CardActionArea>
	);
};

export default QuestionPreviewItemInfo;
