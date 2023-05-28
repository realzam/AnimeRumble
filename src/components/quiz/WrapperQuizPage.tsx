import { useContext } from 'react';

import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
	Box,
} from '@mui/material';

import QuestionsPreviewList from './QuestionsPreviewList';
import QuizQuestionContainer from './QuizQuestionContainer';

import { QuizContext } from '@/context';
import useQuiz from '@/hooks/useQuiz';
import { MainLayout } from '@/layouts';

const WrapperQuizPage = (): JSX.Element => {
	const { quiz } = useQuiz();
	const { showDialogDelete, setShowDialogDelete } = useContext(QuizContext);

	const handleClose = () => {
		setShowDialogDelete(false);
	};

	return (
		<MainLayout title={quiz.title} useMain={false}>
			<Box
				sx={{
					flexGrow: 1,
					maxHeight: 'calc(100% - 60px)',
					display: 'flex',
					flexDrection: 'row',
				}}
			>
				<QuestionsPreviewList />
				<Box
					sx={{
						flexGrow: 1,
						p: 3,
						overflowY: 'auto',
					}}
				>
					<QuizQuestionContainer />
				</Box>
			</Box>
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
