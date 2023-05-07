import { useContext } from 'react';

import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import QuestionsPreviewList from './QuestionsPreviewList';
import QuizQuestionContainer from './QuizQuestionContainer';

import { QuizContext } from '@/context';
import { MainLayout } from '@/layouts';

const WrapperQuizPage = (): JSX.Element => {
	const { showDialogDelete, setShowDialogDelete } = useContext(QuizContext);

	const handleClose = () => {
		setShowDialogDelete(false);
	};

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

			<Dialog
				open={showDialogDelete}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle>No es posible eliminar la unica pregunta</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						El quiz debe tener al menos una pregunta
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} autoFocus>
						Aceptar
					</Button>
				</DialogActions>
			</Dialog>
		</MainLayout>
	);
};

export default WrapperQuizPage;
