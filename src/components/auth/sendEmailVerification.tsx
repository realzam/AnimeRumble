import { useMemo } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

import { Box, Divider, Link, Paper, Typography } from '@mui/material';
import { Stack } from '@mui/system';

import { Image } from '../ui';

const SendEmailVerification = () => {
	const router = useRouter();
	const destination = useMemo(
		() => router.query.p?.toString() || '/',
		[router.query.p],
	);

	return (
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
					// width: '400px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					flexDirection: 'column',
				}}
			>
				<Typography variant='h4'>Verifica tu correo electrónico</Typography>
				<Typography>
					Revisa tu correo y sigue las instrucciones para activar tu cuenta
				</Typography>
				<Box
					sx={{
						position: 'relative',
						width: '80%',
						paddingBottom: '80%',
					}}
				>
					<Image alt='mail' src='/public/mail2.webp' fill objectFit='contain' />
				</Box>
				<Stack
					spacing={3}
					sx={{
						marginTop: 2,
						width: '100%',
						p: 2,
					}}
				>
					<Divider
						sx={{
							p: 1,
						}}
					/>
					<Typography textAlign='end' color='white'>
						<Link href={`/auth/login?p=${destination}`} component={NextLink}>
							¿Ya tienes una cuenta?
						</Link>
					</Typography>
				</Stack>
			</Paper>
		</Box>
	);
};

export default SendEmailVerification;
