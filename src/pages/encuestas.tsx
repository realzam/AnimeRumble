import { Stack, Skeleton } from '@mui/material';

import { MainLayout } from '@/layouts';

export default function EncuestasPage() {
	return (
		<MainLayout title='Encuestas'>
			<>
				<Stack spacing={2}>
					<Skeleton variant='rounded' height={140} />
					<Skeleton variant='rounded' height={140} />
					<Skeleton variant='rounded' height={140} />
				</Stack>
			</>
		</MainLayout>
	);
}
