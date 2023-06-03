import { useContext } from 'react';
import NextLink from 'next/link';

import { MenuOutlined } from '@mui/icons-material';
import {
	AppBar,
	Button,
	IconButton,
	Link,
	Stack,
	Typography,
	useMediaQuery,
	useTheme,
} from '@mui/material';

import ThemeSwitcher from './ThemeSwitcher';

import { AuthContext } from '@/context';

const Navbar = (): JSX.Element => {
	const { isLoggedIn, user, logout } = useContext(AuthContext);
	const theme = useTheme();
	const isMatch = useMediaQuery(theme.breakpoints.down('sm'));
	let e = (
		<>
			<Button
				variant='outlined'
				sx={{
					fontSize: '16px',
				}}
				onClick={logout}
			>
				Cerrar sesion
			</Button>
		</>
	);
	if (!isLoggedIn) {
		e = (
			<>
				<Stack
					direction='row'
					alignItems='center'
					// justifyContent='center'
					spacing={1}
				>
					<Link href='/auth/register' component={NextLink}>
						<Button
							variant='outlined'
							sx={{
								fontSize: '16px',
							}}
						>
							Registarse
						</Button>
					</Link>

					<Link href='/auth/login' component={NextLink}>
						<Typography variant='h6'>Ingresar</Typography>
					</Link>
				</Stack>
			</>
		);
	}
	return (
		<AppBar>
			<Stack
				direction='row'
				alignItems='center'
				sx={{
					height: '100%',
					paddingX: '15px',
				}}
			>
				<Link
					href='/'
					component={NextLink}
					display='flex'
					alignItems='end'
					justifyContent='center'
				>
					<Typography variant='h6'>Anime |</Typography>
					<Typography sx={{ ml: 0.5 }}>Rumble</Typography>
				</Link>
				<ThemeSwitcher />
				<div style={{ flex: 1 }} />
				{isMatch ? (
					<IconButton size='large' edge='start'>
						<MenuOutlined />
					</IconButton>
				) : (
					<>
						{e}
						{isLoggedIn && user?.role == 'admin' && (
							<Link
								href='/admin'
								component={NextLink}
								display='flex'
								alignItems='end'
								justifyContent='center'
							>
								<Typography variant='h6'>Admin Panel</Typography>
							</Link>
						)}
					</>
				)}
			</Stack>
		</AppBar>
	);
};

export default Navbar;
