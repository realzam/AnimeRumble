'use client';

import DashboardQuizzesProvider from '@/context/dashboardQuizzes/DashboardQuizzesProvider';
import { type serverClient } from '@/trpc/client/serverClient';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/Tabs';

import CreateQuizButton from './CreateQuizButton';
import ExperimentalContainer from './ExperimentalContainer';
import QuizzesListView from './QuizzesListView';

interface Props {
	initialQuizzes: Awaited<
		ReturnType<(typeof serverClient)['quizz']['getListQuizzes']>
	>;
}

const DashboardQuizzesContainer = ({ initialQuizzes }: Props) => {
	return (
		<DashboardQuizzesProvider initialQuizzes={initialQuizzes}>
			<div className='flex h-[calc(100vh-3.5rem-1px)] flex-col p-8 pt-6'>
				<Tabs
					defaultValue='draft'
					className='flex h-full flex-col space-y-6 pr-5'
				>
					<div className='flex justify-between'>
						<TabsList className='grid w-[500px] grid-cols-4 bg-card dark:bg-muted'>
							<TabsTrigger
								className='transition-colors duration-300 data-[state=active]:bg-primary data-[state=active]:text-white'
								value='draft'
							>
								Guardados
							</TabsTrigger>
							<TabsTrigger
								className='transition-colors duration-300 data-[state=active]:bg-primary data-[state=active]:text-white'
								value='active'
							>
								Activos
							</TabsTrigger>
							<TabsTrigger
								className='transition-colors duration-300 data-[state=active]:bg-primary data-[state=active]:text-white'
								value='finished'
							>
								Finalizados
							</TabsTrigger>
							<TabsTrigger
								className='transition-colors duration-300 data-[state=active]:bg-primary data-[state=active]:text-white'
								value='experimental'
							>
								Experimental
							</TabsTrigger>
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
					<TabsContent value='experimental' className='h-full overflow-hidden'>
						<ExperimentalContainer />
					</TabsContent>
				</Tabs>
			</div>
		</DashboardQuizzesProvider>
	);
};

export default DashboardQuizzesContainer;
