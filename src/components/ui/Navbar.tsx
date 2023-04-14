import NextLink from 'next/link';

import { MenuOutlined } from '@mui/icons-material';
import { AppBar, IconButton, Link, Toolbar, Typography } from '@mui/material';

import ThemeSwitcher from './ThemeSwitcher';

const Navbar = (): JSX.Element => {
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
					<Typography variant='h6'>A |</Typography>
					<Typography sx={{ ml: 0.5 }}>Rumble</Typography>
				</Link>
				<div style={{ flex: 1 }} />
				<ThemeSwitcher />

				<Link
					href='/auth/login'
					component={NextLink}
					display='flex'
					alignItems='end'
					justifyContent='center'
				>
					<Typography variant='h6'>Login</Typography>
				</Link>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
