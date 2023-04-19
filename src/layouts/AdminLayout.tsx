import NextLink from 'next/link';

import { InboxOutlined, MailOutline } from '@mui/icons-material';
import {
	Box,
	Card,
	Divider,
	Link,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	Stack,
	Typography,
} from '@mui/material';

import ThemeSwitcher from '@/components/ui/ThemeSwitcher';

interface Props {
	children: JSX.Element | JSX.Element[];
	selected?: number;
}

export const AdminLayout = ({ children, selected = 0 }: Props) => {
	return (
		<Stack direction='row'>
			<Card
				sx={{
					// position: 'fixed',
					height: '100vh',
					display: 'flex',
					flexDirection: 'column',
					overflowY: 'auto',
					padding: 1,
					backgroundColor: 'background.appBar',
					// background: '#FFF',
					boxShadow: '0px 2px 10px 0px rgba(0,0,0,0.15)',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						padding: 1,
						justifyContent: 'space-between',
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
				</Box>
				<Divider />
				<List>
					{['Encuestas', 'Loteria', 'Bingo', 'Anime Rumble'].map(
						(text, index) => (
							<ListItem key={text} disablePadding>
								<ListItemButton selected={index === selected}>
									<ListItemIcon>
										{index % 2 === 0 ? <InboxOutlined /> : <MailOutline />}
									</ListItemIcon>
									<ListItemText primary={text} disableTypography />
								</ListItemButton>
							</ListItem>
						),
					)}
				</List>
				<Divider />
				<List>
					{['All mail', 'Trash', 'Spam'].map((text, index) => (
						<ListItem key={text} disablePadding>
							<ListItemButton>
								<ListItemIcon>
									{index % 2 === 0 ? <InboxOutlined /> : <MailOutline />}
								</ListItemIcon>
								<ListItemText primary={text} />
							</ListItemButton>
						</ListItem>
					))}
				</List>
				<Box
					sx={{
						flexGrow: 1,
					}}
				/>
				<Box
					sx={{
						backgroundColor: 'primary.main',
						height: '30px',
					}}
				/>
			</Card>
			<main
				style={{
					flexGrow: '1',
					padding: '10px 30px',
				}}
			>
				{children}
			</main>
		</Stack>
	);
};