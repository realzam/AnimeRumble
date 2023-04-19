import { useState } from 'react';
import { useRouter } from 'next/router';

import { Tabs, Tab, Stack, Button, Skeleton } from '@mui/material';
import useSWR, { Fetcher } from 'swr';

import QuizItemList from './QuizItemList';

import { IQuiz } from '@/interfaces';

const QuizDashboard = (): JSX.Element => {
	const router = useRouter();
	const [tabIndex, setTabIndex] = useState(0);
	const fetcher: Fetcher<IQuiz[]> = (apiURL: string) =>
		fetch(apiURL).then(res => res.json());

	const { data, error, isLoading } = useSWR('/api/quiz', fetcher);

	return (
		<>
			<Stack direction='row' justifyContent='space-between' alignItems='center'>
				<Tabs value={tabIndex} onChange={(e, index) => setTabIndex(index)}>
					<Tab disableRipple label={'Borradores'} />
					<Tab disableRipple label={'En progreso'} />
					<Tab disableRipple label={'Finalizados'} />
				</Tabs>
				<Button
					variant='contained'
					onClick={() => {
						router.push('/admin/quiz/create/');
					}}
				>
					Crear Encuesta
				</Button>
			</Stack>
			{isLoading ? (
				<Stack spacing={2}>
					<Skeleton variant='rounded' height={130} />
					<Skeleton variant='rounded' height={130} />
					<Skeleton variant='rounded' height={130} />
				</Stack>
			) : error ? (
				<div>failed to load</div>
			) : (
				data?.map(quiz => <QuizItemList key={quiz.id} quiz={quiz} />)
			)}
		</>
	);
};

export default QuizDashboard;
