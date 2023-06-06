import { Dispatch, SetStateAction, useState } from 'react';

import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	DialogActions,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useSWRConfig } from 'swr';

import { animeRumbleApi } from '@/api';
import UploadImage from '@/components/ui/UploadImage';
import { IQuiz } from '@/interfaces';

interface Props {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
	title: string;
	quizID: string;
	description?: string;
	image?: string;
}

interface QuizFormData {
	title: string;
	description?: string;
}
const QuizDialogUpdate = ({
	open,
	setOpen,
	title,
	description,
	image,
	quizID,
}: Props): JSX.Element => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		clearErrors,
	} = useForm<QuizFormData>({
		defaultValues: {
			title,
			description,
		},
	});

	const [file, setFile] = useState<File>();
	const { mutate } = useSWRConfig();

	const handleClose = () => {
		clearErrors();
		setOpen(false);
	};

	const handleCreate = async ({ description, title }: QuizFormData) => {
		const data = new FormData();
		data.set('title', title);
		data.set('quizID', quizID);

		if (description) {
			data.set('description', description);
		}
		if (file) {
			// return;
			data.set('img', file);
		}
		const res = await animeRumbleApi.put<IQuiz>('/quiz', data);
		if (res.status === 200) {
			console.log('update quiz', res.data);
			setOpen(false);
			mutate(`/api/quiz/${quizID}`, res.data);
		}
	};

	return (
		<Dialog open={open} onClose={handleClose}>
			<form noValidate autoComplete='off' onSubmit={handleSubmit(handleCreate)}>
				<DialogTitle>Crear encuesta</DialogTitle>
				<DialogContent>
					<UploadImage callback={setFile} initialImage={image} />
					<TextField
						autoFocus
						margin='dense'
						id='title'
						label='Título'
						fullWidth
						variant='standard'
						multiline={false}
						placeholder='Anime Quiz'
						{...register('title', {
							required: 'Este campo es requerido',
						})}
						error={!!errors.title}
						helperText={errors.title?.message}
					/>

					<TextField
						margin='dense'
						id='description'
						label='Descripción'
						fullWidth
						variant='standard'
						rows={4}
						multiline
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} variant='outlined' color='error'>
						Cancelar
					</Button>
					<Button type='submit'>Crear</Button>
				</DialogActions>
			</form>
		</Dialog>
	);
};
export default QuizDialogUpdate;
