import { Container } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import AnswerQuizTrueFalse from './AnswerQuizTrueFalse';

const QuestionTypeTrueFalse = (): JSX.Element => {
	return (
		<Container>
			<Grid container rowSpacing={3} columnSpacing={3}>
				<Grid xs={6}>
					<AnswerQuizTrueFalse variant='true' />
				</Grid>
				<Grid xs={6}>
					<AnswerQuizTrueFalse variant='false' />
				</Grid>
			</Grid>
		</Container>
	);
};

export default QuestionTypeTrueFalse;
