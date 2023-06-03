import { useMemo, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { ErrorOutline } from '@mui/icons-material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {
	Box,
	Button,
	Chip,
	Divider,
	InputAdornment,
	Link,
	Paper,
	TextField,
	Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import { useForm } from 'react-hook-form';
import validator from 'validator';

import { animeRumbleApi } from '@/api';
import { MainLayout } from '@/layouts';

interface FormData {
	email: string;
}

const ForgotPasswordPage = () => {
	const router = useRouter();
	const destination = useMemo(() => {
		if (router.query.p === undefined) {
			return '/';
		}
		return router.query.p.toString();
	}, [router.query.p]);

	const [showError, setShowError] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const isEmail = (email: string): string | undefined => {
		return validator.isEmail(email) ? undefined : 'El correo no es válido';
	};
	const onLoginUser = async ({ email }: FormData) => {
		setShowError(false);
		try {
			await animeRumbleApi.post('/user/forgot-password', {
				email,
				destination,
			});
		} catch (error) {
			setShowError(true);
			setTimeout(() => {
				setShowError(false);
			}, 3000);
		}
	};

	return (
		<MainLayout title='Anime Rumble|Login'>
			<form onSubmit={handleSubmit(onLoginUser)} noValidate>
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
						<Chip
							label='Correo o contraseña no valido(s)'
							color='error'
							className='fadeIn'
							icon={<ErrorOutline />}
							sx={{
								width: '100%',
								m: 2,
								display: showError ? 'flex' : 'none',
							}}
						/>
						<Typography variant='h4'>Recuperar contraseña</Typography>
						<Typography>
							Ingresa el correo asociado a tu cuenta y te eviaremos un correo
							con un enlace pra recuperar tu contraseña
						</Typography>
						<Stack
							spacing={2}
							sx={{
								marginTop: 3,
							}}
						>
							<TextField
								label='Correo electrónico'
								variant='outlined'
								required
								placeholder='kirito@gmail.com'
								type='email'
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<MailOutlineIcon />
										</InputAdornment>
									),
								}}
								{...register('email', {
									required: 'Este campo es requerido',
									validate: isEmail,
								})}
								error={!!errors.email}
								helperText={errors.email?.message}
							/>

							<Button fullWidth type='submit'>
								Recuperar contraseña
							</Button>
							<Divider
								sx={{
									p: 1,
								}}
							/>
							<Stack>
								<Typography textAlign='end'>
									¿No tienes una cuenta?
									<Link
										href={`/auth/register?p=${destination}`}
										component={NextLink}
										m={1}
									>
										Crear cuenta
									</Link>
								</Typography>
							</Stack>
						</Stack>
					</Paper>
				</Box>
			</form>
		</MainLayout>
	);
};

export default ForgotPasswordPage;
