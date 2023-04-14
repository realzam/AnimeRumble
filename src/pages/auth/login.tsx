import { useContext, useMemo, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { ErrorOutline, Visibility, VisibilityOff } from '@mui/icons-material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import {
	Box,
	Button,
	Chip,
	Divider,
	IconButton,
	InputAdornment,
	Link,
	Paper,
	TextField,
	Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import { useForm } from 'react-hook-form';
import validator from 'validator';

import { AuthContext } from '@/context';
import { MainLayout } from '@/layouts';

interface FormData {
	email: string;
	password: string;
}

const LoginPage = () => {
	const router = useRouter();
	const destination = useMemo(() => {
		if (router.query.p === undefined) {
			return '/';
		}
		return router.query.p.toString();
	}, [router.query.p]);

	const { loginUser } = useContext(AuthContext);
	const [showPassword, setShowPassword] = useState(false);
	const [showError, setShowError] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const isEmail = (email: string): string | undefined => {
		return validator.isEmail(email) ? undefined : 'El correo no es válido';
	};
	const onLoginUser = async ({ email, password }: FormData) => {
		setShowError(false);
		const isValidLogin = await loginUser(email, password);
		if (!isValidLogin) {
			setShowError(true);
			setTimeout(() => {
				setShowError(false);
			}, 3000);
			return;
		}
		router.replace(destination);
	};

	const handleClickShowPassword = () => setShowPassword(show => !show);

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		event.preventDefault();
	};

	return (
		<MainLayout>
			<form onSubmit={handleSubmit(onLoginUser)} noValidate>
				<Box
					sx={{
						// height: '100%',
						// width: '100%',
						// backgroundColor: 'red',
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
						<Typography variant='h4'>Bienvenido</Typography>
						<Typography>Inicia sesión</Typography>
						<Stack
							spacing={2}
							sx={{
								marginTop: 2,
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
							<Typography textAlign='end'>
								<Link href='/' component={NextLink}>
									Olvidaste tu contraseña?
								</Link>
							</Typography>
							<Button fullWidth type='submit'>
								Iniciar sesión
							</Button>
							<Divider
								sx={{
									p: 1,
								}}
							/>
							<Stack>
								{/* <Typography>¿No tienes una cuenta?</Typography> */}

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

export default LoginPage;
