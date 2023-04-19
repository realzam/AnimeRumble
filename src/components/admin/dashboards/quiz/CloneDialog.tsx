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

const CloneDialog = ({
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
		await animeRumbleApi.put('/quiz/copy-quiz', { quizID });
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
			<DialogTitle>Duplicar Encuesta</DialogTitle>
			<DialogContent>
				<DialogContentText id='alert-dialog-description'>
					{`¿Quieres duplicar la encuesta ${title}?`}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} variant='outlined'>
					Cancelar
				</Button>
				<Button onClick={handleAccept}>Aceptar</Button>
			</DialogActions>
		</Dialog>
	);
};

export default CloneDialog;
