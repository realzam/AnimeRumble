'use client';

import { type serverClient } from '@/trpc/client/serverClient';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/Tabs';

import CreateQuizButton from './CreateQuizButton';
import QuizzesListView from './QuizzesListView';

interface Props {
	initialQuizzes: Awaited<
		ReturnType<(typeof serverClient)['quizz']['getListQuizzes']>
	>;
}

const DashboardQuizzesContainer = ({ initialQuizzes }: Props) => {
	return (
		<div className='flex h-[calc(100vh-3.5rem-1px)] flex-col p-8 pt-6'>
			<Tabs
				defaultValue='draft'
				className='flex h-full flex-col space-y-6 pr-5'
			>
				<div className='flex justify-between'>
					<TabsList className='grid w-[400px] grid-cols-3'>
						<TabsTrigger value='draft'>Guardados</TabsTrigger>
						<TabsTrigger value='active'>Activos</TabsTrigger>
						<TabsTrigger value='finished'>Finalizados</TabsTrigger>
					</TabsList>
					<CreateQuizButton />
				</div>
				<TabsContent value='draft' className='h-full overflow-hidden'>
					<QuizzesListView initialQuizzes={initialQuizzes} type='draft' />
				</TabsContent>
				<TabsContent value='active' className='h-full overflow-hidden'>
					<QuizzesListView initialQuizzes={initialQuizzes} type='active' />
				</TabsContent>
				<TabsContent value='finished' className='h-full overflow-hidden'>
					<QuizzesListView initialQuizzes={initialQuizzes} type='finished' />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default DashboardQuizzesContainer;
