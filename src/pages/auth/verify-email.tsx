import { useRouter } from 'next/router';

import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, Button, Paper, Typography } from '@mui/material';
import { GetServerSideProps } from 'next';

import { db } from '@/db';
import { UserModel } from '@/db/models';
import { IJWTUserID } from '@/interfaces';
import { MainLayout } from '@/layouts';
import { isValidTokenJose } from '@/utils/edge';

interface Props {
	message: string;
	ok: boolean;
}
const VerifyEmailPage = ({ message, ok }: Props) => {
	const router = useRouter();

	return (
		<MainLayout title='Anime Rumble|Login'>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<Paper
					sx={{
						p: 3,
						width: '400px',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
					}}
				>
					{ok ? (
						<>
							<CheckCircleIcon
								color='primary'
								sx={{
									fontSize: '100px',
								}}
							/>
							<Typography variant='h4'>Verificado</Typography>
							<Typography>
								Tu cuenta ha sido verificada correctamente
							</Typography>
							<Button
								fullWidth
								onClick={() => {
									router.replace('/auth/login');
								}}
								sx={{
									marginY: 3,
								}}
							>
								Iniciar sesión
							</Button>
						</>
					) : (
						<>
							<CancelIcon
								color='error'
								sx={{
									fontSize: '100px',
								}}
							/>
							<Typography variant='h4'>No verificado</Typography>
							<Typography>{message}</Typography>
							<Button
								fullWidth
								onClick={() => {
									router.replace('/');
								}}
							>
								Ir al inicio
							</Button>
						</>
					)}
				</Paper>
			</Box>
		</MainLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const { token } = query as { token?: string };
	const { valid, token: obje } = await isValidTokenJose<IJWTUserID>(token);
	console.log('getServerSideProps usu', token, valid);

	if (!valid) {
		return {
			props: {
				message: 'El token no es valido',
				ok: false,
			},
		};
	}

	await db.connect();
	const user = await UserModel.findByIdAndUpdate(
		obje.userId,
		{ $set: { state: 'verified' } },
		{ new: true },
	);
	await db.disconnect();
	if (!user) {
		return {
			props: {
				message: 'El token no es valido',
				ok: false,
			},
		};
	}
	return {
		props: {
			message: 'Tu cuenta ha sido verificada correctamente',
			ok: true,
		},
	};
};

export default VerifyEmailPage;
