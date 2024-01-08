'use client';

import { Memo } from '@legendapp/state/react';

import useDashboardQuizzes from '@/hooks/useDashboardQuizzes';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/Tabs';

import CreateQuizButton from './CreateQuizButton';
import ExperimentalContainer from './ExperimentalContainer';
import QuizzesListView from './QuizzesListView';

const DashbordContentWraped = () => {
	const { tabsValue } = useDashboardQuizzes();
	return (
		<Memo>
			{() => (
				<Tabs
					className='flex h-full flex-col space-y-6 pr-5'
					onValueChange={(v) => {
						console.log('tab', v);
						tabsValue.set(v);
					}}
					value={tabsValue.get()}
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
						<QuizzesListView initialQuizzes={[]} type='draft' />
					</TabsContent>
					<TabsContent value='active' className='h-full overflow-hidden'>
						<QuizzesListView initialQuizzes={[]} type='active' />
					</TabsContent>
					<TabsContent value='finished' className='h-full overflow-hidden'>
						<QuizzesListView initialQuizzes={[]} type='finished' />
					</TabsContent>
					<TabsContent value='experimental' className='h-full overflow-hidden'>
						<ExperimentalContainer />
					</TabsContent>
				</Tabs>
			)}
		</Memo>
	);
};

export default DashbordContentWraped;
