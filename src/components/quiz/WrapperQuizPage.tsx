import { useContext, useEffect } from 'react';

import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import useSWR, { Fetcher } from 'swr';

import QuestionsPreviewList from './QuestionsPreviewList';
import QuizQuestionContainer from './QuizQuestionContainer';

import { QuizContext } from '@/context';
import { IQuiz } from '@/interfaces';
import { MainLayout } from '@/layouts';

const WrapperQuizPage = (): JSX.Element => {
	const { showDialogDelete, setShowDialogDelete, updateQuiz, quiz } =
		useContext(QuizContext);

	const handleClose = () => {
		setShowDialogDelete(false);
	};

	const fetcher: Fetcher<IQuiz> = (apiURL: string) =>
		fetch(apiURL).then(res => res.json());

	const { data, isLoading } = useSWR('/api/quiz/' + quiz.id, fetcher, {
		refreshInterval: 5000,
	});
	// useEffect(() => {
	// 	if (data) {
	// 		console.log('data cambio');
	// 		console.log(data);

	// 		if (JSON.stringify(data) !== JSON.stringify(quiz)) {
	// 			console.log('Actuializando Quiz info');
	// 			updateQuiz(data);
	// 		}
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [data]);
	if (isLoading) {
		return <div>Loading</div>;
	}
	return <div>hola</div>;
	// 	return (
	// 		<MainLayout>
	// 			<Grid container columnSpacing={3}>
	// 				<Grid xs={3}>
	// 					<QuestionsPreviewList />
	// 				</Grid>
	// 				<Grid xs={9}>
	// 					<QuizQuestionContainer />
	// 				</Grid>
	// 			</Grid>

	// 			<Dialog
	// 				open={showDialogDelete}
	// 				onClose={handleClose}
	// 				aria-labelledby='alert-dialog-title'
	// 				aria-describedby='alert-dialog-description'
	// 			>
	// 				<DialogTitle>No es posible eliminar la unica pregunta</DialogTitle>
	// 				<DialogContent>
	// 					<DialogContentText id='alert-dialog-description'>
	// 						El quiz debe tener al menos una pregunta
	// 					</DialogContentText>
	// 				</DialogContent>
	// 				<DialogActions>
	// 					<Button onClick={handleClose} autoFocus>
	// 						Aceptar
	// 					</Button>
	// 				</DialogActions>
	// 			</Dialog>
	// 		</MainLayout>
	// 	);
};

export default WrapperQuizPage;
