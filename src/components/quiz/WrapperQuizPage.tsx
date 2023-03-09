import Grid from '@mui/material/Unstable_Grid2';

import QuestionsPreviewList from './QuestionsPreviewList';
import QuizQuestionContainer from './QuizQuestionContainer';

import { MainLayout } from '@/layouts';

const WrapperQuizPage = (): JSX.Element => {
	return (
		<MainLayout>
			<Grid container columnSpacing={3}>
				<Grid xs={3}>
					<QuestionsPreviewList />
				</Grid>
				<Grid xs={9}>
					<QuizQuestionContainer />
				</Grid>
			</Grid>
		</MainLayout>
	);
};

export default WrapperQuizPage;
