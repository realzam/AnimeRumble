import { Dispatch, SetStateAction } from 'react';

import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	DialogContentText,
} from '@mui/material';
import { useSWRConfig } from 'swr';

import { animeRumbleApi } from '@/api';

interface Props {
	quizID: string;
	title: string;
	show: boolean;
	setShowDialog: Dispatch<SetStateAction<boolean>>;
}

const DeleteDialog = ({
	title,
	show,
	quizID,
	setShowDialog,
}: Props): JSX.Element => {
	const { mutate } = useSWRConfig();
	const handleClose = () => {
		setShowDialog(false);
	};

	const handleAccept = async () => {
		await animeRumbleApi.put('/quiz/delete-quiz', { quizID });
		setShowDialog(false);
		mutate('/api/quiz');
	};
	return (
		<Dialog
			open={show}
			onClose={handleClose}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
			<DialogTitle>Eliminar Encuesta</DialogTitle>
			<DialogContent>
				<DialogContentText id='alert-dialog-description'>
					{`¿Quieres Eliminar la encuesta ${title}?`}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} variant='outlined'>
					Cancelar
				</Button>
				<Button onClick={handleAccept} color='error'>
					Aceptar
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DeleteDialog;
