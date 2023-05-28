import { useEffect, useState } from 'react';
import Image from 'next/image';

import {
	Stack,
	Skeleton,
	Tab,
	Tabs,
	Box,
	Typography,
	Card,
} from '@mui/material';
import { AxiosError } from 'axios';
import useSWR from 'swr';

import { animeRumbleApi } from '@/api';
import QuizItemList from '@/components/admin/dashboards/quiz/QuizItemList';
import ErrorYamcha from '@/components/ui/ErrorYamcha';
import { IQuizBasic } from '@/interfaces';
import { MainLayout } from '@/layouts';

export default function EncuestasPage() {
	const [tabIndex, setTabIndex] = useState(0);
	const fetcher = async () => {
		let query = '?state=';
		switch (tabIndex) {
			case 0:
				query += 'in-progress';
				break;
			case 1:
				query += 'finished';
				break;
			default:
				query += 'in-progress';
				break;
		}
		return await animeRumbleApi
			.get<IQuizBasic[]>('/quiz' + query)
			.then(res => res.data);
	};

	const { data, error, isLoading, mutate } = useSWR<IQuizBasic[], AxiosError>(
		'/api/quiz/user',
		fetcher,
	);
	useEffect(() => {
		mutate();
	}, [tabIndex, mutate]);

	if (isLoading) {
		return (
			<MainLayout title='Encuestas'>
				<>
					<Tabs value={tabIndex} onChange={(e, index) => setTabIndex(index)}>
						<Tab disableRipple label={'En progreso'} />
						<Tab disableRipple label={'Finalizados'} />
					</Tabs>
					<Stack spacing={2}>
						<Skeleton variant='rounded' height={140} />
						<Skeleton variant='rounded' height={140} />
						<Skeleton variant='rounded' height={140} />
					</Stack>
				</>
			</MainLayout>
		);
	}
	if (error || data === undefined) {
		return (
			<Box>
				<ErrorYamcha />
			</Box>
		);
	}

	return (
		<MainLayout title='Encuestas'>
			<>
				<Tabs value={tabIndex} onChange={(e, index) => setTabIndex(index)}>
					<Tab disableRipple label={'En progreso'} />
					<Tab disableRipple label={'Finalizados'} />
				</Tabs>
				{data.length == 0 ? (
					<Card
						sx={{
							p: 2,
							maxWidth: '500px',
							margin: '0 auto',
						}}
					>
						<Stack
							spacing={2}
							direction='column'
							justifyContent='center'
							alignItems='center'
						>
							<Image
								src='/goku.webp'
								alt='yamcha'
								width={400}
								height={452}
								style={{
									width: '50%',
									height: 'auto',
								}}
							/>
							<Typography variant='h1'>Aquí no hay nada</Typography>
							<Typography variant='body1'>No hay Quiz a contestar</Typography>
						</Stack>
					</Card>
				) : (
					data.map(quiz => <QuizItemList key={quiz.id} quiz={quiz} />)
				)}
			</>
		</MainLayout>
	);
}
