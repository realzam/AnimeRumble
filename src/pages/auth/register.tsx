import { useContext, useMemo, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import {
	ErrorOutline,
	Visibility,
	VisibilityOff,
	AccountCircleOutlined,
} from '@mui/icons-material';
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
	name: string;
	email: string;
	password: string;
	cpassword: string;
}

const RegisterPage = () => {
	const router = useRouter();
	const destination = useMemo(
		() => router.query.p?.toString() || '/',
		[router.query.p],
	);
	const { registerUser } = useContext(AuthContext);

	const [showPassword, setShowPassword] = useState(false);
	const [showCPassword, setShowCPassword] = useState(false);
	const [showError, setShowError] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
	} = useForm<FormData>();

	const isEmail = (email: string): string | undefined => {
		return validator.isEmail(email)
			? undefined
			: 'El correo no es está disponible';
	};
	const onRegisterUser = async ({ name, email, password }: FormData) => {
		setShowError(false);
		const { hasError, message } = await registerUser(name, email, password);
		if (hasError) {
			setShowError(true);
			setErrorMessage(message || 'No se puede crear usuario');
			setTimeout(() => {
				setShowError(false);
			}, 3000);
			return;
		}
		router.replace('/');
	};

	const handleClickShowPassword = () => setShowPassword(show => !show);

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>,
	) => {
		event.preventDefault();
	};

	return (
		<MainLayout>
			<form
				onSubmit={handleSubmit(onRegisterUser)}
				noValidate
				autoComplete='off'
			>
				<Box
					sx={{
						// height: '100vh',
						// width: '100vw',
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
							label={errorMessage}
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
						<Typography>Crear cuenta</Typography>
						<Stack
							spacing={3}
							sx={{
								marginTop: 2,
							}}
						>
							<TextField
								label='Nombre'
								variant='outlined'
								required
								placeholder='kirito'
								type='text'
								InputProps={{
									startAdornment: (
										<InputAdornment position='start'>
											<AccountCircleOutlined />
										</InputAdornment>
									),
								}}
								{...register('name', {
									required: 'Este campo es requerido',
								})}
								error={!!errors.name}
								helperText={errors.name?.message}
							/>
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
											return 'Las contrasañas no son iguales';
										}
									},
								})}
								error={!!errors.cpassword}
								helperText={errors.cpassword?.message}
							/>

							<Button fullWidth variant='contained' type='submit'>
								Crear usuario
							</Button>
							<Divider
								sx={{
									p: 1,
								}}
							/>
							<Typography textAlign='end' color='white'>
								<Link
									href={`/auth/login?p=${destination}`}
									component={NextLink}
								>
									¿Ya tienes una cuenta?
								</Link>
							</Typography>
						</Stack>
					</Paper>
				</Box>
			</form>
		</MainLayout>
	);
};

export default RegisterPage;
