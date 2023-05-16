import Image from 'next/image';
import { useRouter } from 'next/router';

import ReplayIcon from '@mui/icons-material/Replay';
import { Stack, Typography, Button } from '@mui/material';

const ErrorYamcha = (): JSX.Element => {
	const router = useRouter();

	return (
		<Stack
			spacing={2}
			direction='column'
			justifyContent='center'
			alignItems='center'
		>
			<Image
				src='/yamcha.svg'
				alt='yamcha'
				width={100}
				height={200}
				style={{
					width: '50%',
					height: 'auto',
				}}
			/>
			<Typography variant='h1'>Oops Error ...</Typography>
			<Typography variant='h2'>Algo salio mal</Typography>
			<Button
				variant='outlined'
				startIcon={<ReplayIcon />}
				size='large'
				onClick={() => router.reload()}
			>
				Recargar Página
			</Button>
		</Stack>
	);
};

export default ErrorYamcha;
