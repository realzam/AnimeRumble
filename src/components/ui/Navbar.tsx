import { useContext } from 'react';
import NextLink from 'next/link';

import { MenuOutlined } from '@mui/icons-material';
import { AppBar, IconButton, Link, Toolbar, Typography } from '@mui/material';

import ThemeSwitcher from './ThemeSwitcher';

import { AuthContext } from '@/context';

const Navbar = (): JSX.Element => {
	const { isLoggedIn, user } = useContext(AuthContext);
	return (
		<AppBar>
			<Toolbar>
				<IconButton size='large' edge='start'>
					<MenuOutlined />
				</IconButton>

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
				<ThemeSwitcher />
				{!isLoggedIn && (
					<Link
						href='/auth/login'
						component={NextLink}
						display='flex'
						alignItems='end'
						justifyContent='center'
					>
						<Typography variant='h6'>Login</Typography>
					</Link>
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
