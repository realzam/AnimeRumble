import { Dispatch, SetStateAction, useState } from 'react';

import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	Button,
	TextField,
} from '@mui/material';
import { useSWRConfig } from 'swr';

import { animeRumbleApi } from '@/api';

interface Props {
	quizID: string;
	title: string;
	show: boolean;
	setShowDialog: Dispatch<SetStateAction<boolean>>;
}

const RenameDialog = ({
	title,
	show,
	quizID,
	setShowDialog,
}: Props): JSX.Element => {
	const { mutate } = useSWRConfig();
	const [value, setValue] = useState(title);
	const handleClose = () => {
		setShowDialog(false);
	};

	const handleAccept = async () => {
		await animeRumbleApi.put('/quiz/rename-quiz', { quizID, title: value });
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
			<DialogTitle>Renombrar Encuesta</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					fullWidth
					placeholder='Quiz anime'
					onChange={e => {
						setValue(e.target.value);
					}}
					value={value}
					onKeyPress={e => {
						if (e.key === 'Enter') {
							handleAccept();
						}
					}}
				/>
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

export default RenameDialog;
