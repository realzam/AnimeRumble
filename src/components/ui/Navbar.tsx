import NextLink from 'next/link';

import { MenuOutlined } from '@mui/icons-material';
import { AppBar, IconButton, Link, Toolbar, Typography } from '@mui/material';

const Navbar = (): JSX.Element => {
	return (
		<AppBar position='sticky' elevation={0}>
			<Toolbar>
				<IconButton size='large' edge='start'>
					<MenuOutlined />
				</IconButton>

				<Link href='/' component={NextLink}>
					<Typography variant='h6' color='white'>
						CookieMaster
					</Typography>
				</Link>
				<div style={{ flex: 1 }} />
				<Link href='/quiz/create' underline='none' component={NextLink}>
					<Typography variant='h6' color='white'>
						Quiz
					</Typography>
				</Link>
			</Toolbar>
		</AppBar>
	);
};

export default Navbar;
