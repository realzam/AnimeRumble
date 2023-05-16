import { useEffect, useState } from 'react';
import Image from 'next/image';

import {
	Stack,
	Button,
	Skeleton,
	Box,
	Typography,
	Tabs,
	Tab,
	Card,
} from '@mui/material';
import axios, { AxiosError } from 'axios';
import useSWR from 'swr';

import QuizDialog from './QuizDialog';
import QuizItemList from './QuizItemList';

import ErrorYamcha from '@/components/ui/ErrorYamcha';
import { IQuizBasic } from '@/interfaces';

const QuizDashboard = (): JSX.Element => {
	const [openQuizDialog, setOpenQuizDialog] = useState(false);
	const [tabIndex, setTabIndex] = useState(0);
	const fetcher = async (url: string) => {
		let query = '?state=';
		switch (tabIndex) {
			case 0:
				query += 'draf';
				break;
			case 1:
				query += 'in-progress';
				break;
			case 2:
				query += 'finished';
				break;
			default:
				query += 'draf';
				break;
		}
		return await axios.get<IQuizBasic[]>(url + query).then(res => res.data);
	};
	const { data, error, isLoading, mutate } = useSWR<IQuizBasic[], AxiosError>(
		'/api/quiz',
		fetcher,
	);
	useEffect(() => {
		mutate();
	}, [tabIndex, mutate]);

	if (isLoading) {
		return (
			<Stack spacing={2}>
				<Stack
					direction='row'
					justifyContent='space-between'
					alignItems='center'
				>
					<Tabs value={tabIndex} onChange={(e, index) => setTabIndex(index)}>
						<Tab disableRipple label={'Borradores'} />
						<Tab disableRipple label={'En progreso'} />
						<Tab disableRipple label={'Finalizados'} />
					</Tabs>
					<Button
						variant='contained'
						onClick={async () => {
							setOpenQuizDialog(true);
						}}
					>
						Crear Encuesta
					</Button>
				</Stack>
				<Skeleton variant='rounded' height={140} />
				<Skeleton variant='rounded' height={140} />
				<Skeleton variant='rounded' height={140} />
			</Stack>
		);
	}
	if (error || data === undefined) {
		return (
			<Box>
				<ErrorYamcha />
			</Box>
		);
	}
	if (data.length === 0) {
		return (
			<Box>
				<QuizDialog open={openQuizDialog} setOpen={setOpenQuizDialog} />
				<Stack direction='row' justifyContent='start' alignItems='center'>
					<Tabs value={tabIndex} onChange={(e, index) => setTabIndex(index)}>
						<Tab disableRipple label={'Borradores'} />
						<Tab disableRipple label={'En progreso'} />
						<Tab disableRipple label={'Finalizados'} />
					</Tabs>
				</Stack>
				<Box
					width='50%'
					sx={{
						margin: '0 auto',
					}}
				>
					<Card
						sx={{
							p: 2,
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
							<Typography variant='body1'>
								Una vez que crees una encuesta prodras verlo aquí
							</Typography>
							<Button
								variant='outlined'
								onClick={async () => {
									setOpenQuizDialog(true);
								}}
							>
								Crear Encuesta
							</Button>
						</Stack>
					</Card>
				</Box>
			</Box>
		);
	}
	return (
		<>
			<QuizDialog open={openQuizDialog} setOpen={setOpenQuizDialog} />
			<Stack direction='row' justifyContent='space-between' alignItems='center'>
				<Tabs value={tabIndex} onChange={(e, index) => setTabIndex(index)}>
					<Tab disableRipple label={'Borradores'} />
					<Tab disableRipple label={'En progreso'} />
					<Tab disableRipple label={'Finalizados'} />
				</Tabs>

				<Button
					variant='contained'
					onClick={() => {
						setOpenQuizDialog(true);
					}}
					sx={{
						marginBottom: 3,
					}}
				>
					Crear Encuesta
				</Button>
			</Stack>
			{data.map(quiz => (
				<QuizItemList key={quiz.id} quiz={quiz} />
			))}
		</>
	);
};

export default QuizDashboard;
