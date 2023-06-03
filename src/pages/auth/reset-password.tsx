import { useState } from 'react';
import { useRouter } from 'next/router';

import { ErrorOutline, Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import {
	Box,
	Button,
	Chip,
	IconButton,
	InputAdornment,
	Paper,
	TextField,
	Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import { GetServerSideProps } from 'next';
import { useForm } from 'react-hook-form';

import { animeRumbleApi } from '@/api';
import { MainLayout } from '@/layouts';
import { isValidTokenJose } from '@/utils/edge';

interface FormData {
	password: string;
	cpassword: string;
}
interface Props {
	token: string;
}
const RecoveryPasswordPage = ({ token }: Props) => {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const [showCPassword, setShowCPassword] = useState(false);
	const [showError, setShowError] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<FormData>();

	const onResetPassword = async ({ password, cpassword }: FormData) => {
		setShowError(false);
		try {
			await animeRumbleApi.post('/user/reset-password', {
				password,
				cpassword,
				token,
			});
			router.replace('/auth/login');
		} catch (error) {
			setShowError(true);
			setTimeout(() => {
				setShowError(false);
			}, 3000);
		}
	};

	const handleClickShowPassword = () => setShowPassword(show => !show);

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		event.preventDefault();
	};

	return (
		<MainLayout title='Anime Rumble|Login'>
			<form onSubmit={handleSubmit(onResetPassword)} noValidate>
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
						<Typography variant='h4'>Cambiar contraseña</Typography>
						<Typography>Ingresa una nueva contraseña y repitela</Typography>
						<Stack
							spacing={2}
							sx={{
								marginTop: 3,
							}}
						>
							<TextField
								label='Contraseña'
								variant='outlined'
								required
								placeholder='Al menos 6 caracteres'
								type={showPassword ? 'text' : 'password'}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<LockOutlinedIcon />
										</InputAdornment>
									),
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton
												aria-label='toggle password visibility'
												onClick={handleClickShowPassword}
												onMouseDown={handleMouseDownPassword}
											>
												{showPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									),
								}}
								{...register('password', {
									required: 'Este campo es requerido',
									minLength: { value: 6, message: 'Al menos 6 caracteres' },
								})}
								error={!!errors.password}
								helperText={errors.password?.message}
							/>

							<TextField
								required
								autoComplete='off'
								label='Confirmar contraseña'
								placeholder='Confirmar contraseña'
								variant='outlined'
								type={showCPassword ? 'text' : 'password'}
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<LockOutlinedIcon />
										</InputAdornment>
									),
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton
												aria-label='toggle password visibility'
												onClick={() => {
													setShowCPassword(show => !show);
												}}
												onMouseDown={handleMouseDownPassword}
											>
												{showCPassword ? <VisibilityOff /> : <Visibility />}
											</IconButton>
										</InputAdornment>
									),
								}}
								{...register('cpassword', {
									required: 'Este campo es requerido',
									minLength: { value: 6, message: 'Al menos 6 caracteres' },
									validate: (val: string) => {
										if (watch('password') != val) {
											return 'Las contraseñas no son iguales';
										}
									},
								})}
								error={!!errors.cpassword}
								helperText={errors.cpassword?.message}
							/>

							<Button fullWidth type='submit'>
								Cambiar contraseña
							</Button>
						</Stack>
					</Paper>
				</Box>
			</form>
		</MainLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const { token } = query as { token?: string };
	const { valid } = await isValidTokenJose(token);
	if (!valid) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}

	return { props: { token } };
};

export default RecoveryPasswordPage;
