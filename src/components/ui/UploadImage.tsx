import { useEffect, useRef, useState } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Typography,
} from '@mui/material';

import Image from '@/components/ui/Image';

interface Props {
	// setFile: Dispatch<SetStateAction<File | undefined>>;
	initialImage?: string;
	confirmDelete?: boolean;
	callback: (file?: File) => void;
}
const UploadImage = ({
	callback,
	initialImage,
	confirmDelete = false,
}: Props): JSX.Element => {
	const [open, setOpen] = useState(false);
	const [image, setImage] = useState<string | undefined>(undefined);
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		setImage(undefined);
		setTimeout(() => {
			setImage(initialImage);
		}, 15);
	}, [initialImage]);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const clearImage = () => {
		callback(undefined);
		setImage('');
		if (inputRef.current) {
			inputRef.current.value = '';
		}
	};
	function handleDrop(e: React.DragEvent<HTMLDivElement>) {
		e.preventDefault();
		const file = e.dataTransfer.files[0];
		handleImageUpload(file);
	}

	function handleImageUpload(file: File) {
		const pattern = /image-*/;
		if (!file.type.match(pattern)) {
			return;
		}
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => {
			setImage(reader.result as string);
			callback(file);
		};
	}

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];
			handleImageUpload(file);
		}
	}
	return (
		<>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby='alert-dialog-title'
				aria-describedby='alert-dialog-description'
			>
				<DialogTitle id='alert-dialog-title'>Eliminar Imagen</DialogTitle>
				<DialogContent>
					<DialogContentText id='alert-dialog-description'>
						¿Quieres eliminar la imagen?
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} autoFocus variant='outlined'>
						Cancelar
					</Button>
					<Button
						onClick={() => {
							clearImage();
							handleClose();
						}}
						color='error'
					>
						Eliminar imagen
					</Button>
				</DialogActions>
			</Dialog>

			<Box
				onDragOver={e => {
					console.log('onDragOver');

					e.preventDefault();
				}}
				onDrop={handleDrop}
				onClick={() => !image && inputRef.current?.click()}
				sx={{
					position: 'relative',
					width: '100%',
					height: '100%',
					border: !image ? 2 : 0,
					borderColor: !image ? 'primary.main' : '',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					cursor: !image ? 'pointer' : '',
					borderRadius: '8px',
					overflow: 'hidden',
				}}
			>
				{image ? (
					<>
						<Image src={image} alt='Uploaded Image' fill />

						<Button
							variant='contained'
							size='small'
							sx={{
								position: 'absolute',
								top: 5,
								right: 5,
								borderRadius: 28,
								p: '1px',
								minWidth: 0,
							}}
							onClick={() => {
								confirmDelete ? handleClickOpen() : clearImage();
							}}
						>
							<CloseIcon />
						</Button>
					</>
				) : (
					<Box style={{ textAlign: 'center' }}>
						<ImageIcon sx={{ fontSize: 30 }} color='primary' />
						<Typography color='primary'>
							Arrastra y suelta una imagen aquí
						</Typography>
						<Typography color='primary'>
							o haz clic para seleccionar una imagen
						</Typography>
					</Box>
				)}
				<input
					type='file'
					accept='image/*'
					style={{ display: 'none' }}
					ref={inputRef}
					onChange={handleInputChange}
				/>
			</Box>
		</>
	);
};

export default UploadImage;
