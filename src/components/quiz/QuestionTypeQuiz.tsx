import { Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import AnswerQuizNormal from './AnswerQuizNormal';

const QuestionTypeQuiz = (): JSX.Element => {
	return (
		<Container>
			<Grid container rowSpacing={3} columnSpacing={3}>
				<Grid xs={6}>
					<AnswerQuizNormal placeholder='Agregar Respuesta 1' index={0} />
				</Grid>
				<Grid xs={6}>
					<AnswerQuizNormal
						placeholder='Agregar Respuesta 2'
						variant='blue'
						index={1}
					/>
				</Grid>
				<Grid xs={6}>
					<AnswerQuizNormal
						placeholder='Agregar Respuesta 3 (Opcional)'
						variant='yellow'
						index={2}
					/>
				</Grid>
				<Grid xs={6}>
					<AnswerQuizNormal
						placeholder='Agregar Respuesta 4 (Opcional)'
						variant='green'
						index={3}
					/>
				</Grid>
			</Grid>
		</Container>
	);
};

export default QuestionTypeQuiz;
