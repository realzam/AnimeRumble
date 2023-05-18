import { useContext } from 'react';
import NextLink from 'next/link';

import {
	AppBar,
	Button,
	Link,
	Stack,
	Toolbar,
	Typography,
} from '@mui/material';

import ThemeSwitcher from './ThemeSwitcher';

import { AuthContext } from '@/context';

const Navbar = (): JSX.Element => {
	const { isLoggedIn, user } = useContext(AuthContext);
	return (
		<AppBar>
			<Toolbar>
				{/* <IconButton size='large' edge='start'>
					<MenuOutlined />
				</IconButton> */}
				<ThemeSwitcher />
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
				<div style={{ flex: 1 }} />

				{!isLoggedIn && (
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
				)}
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
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
