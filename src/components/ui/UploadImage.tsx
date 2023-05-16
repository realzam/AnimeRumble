import { useRef, Dispatch, SetStateAction, useState } from 'react';
import Image from 'next/image';

import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';
import { Box, Button, Typography } from '@mui/material';

interface Props {
	setFile: Dispatch<SetStateAction<File | undefined>>;
}
const UploadImage = ({ setFile }: Props): JSX.Element => {
	const [image, setImage] = useState<string>('');
	const inputRef = useRef<HTMLInputElement>(null);

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
		setFile(file);
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = async () => {
			setImage(reader.result as string);
		};
	}

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];
			handleImageUpload(file);
		}
	}

	return (
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
				height: 223,
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
							setFile(undefined), setImage('');
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
	);
};

export default UploadImage;
