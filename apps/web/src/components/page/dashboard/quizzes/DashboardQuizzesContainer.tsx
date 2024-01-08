'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import DashboardQuizzesProvider from '@/context/dashboardQuizzes/DashboardQuizzesProvider';
import { type serverClient } from '@/trpc/client/serverClient';

import { clearText } from '@/lib/utils';

import DashbordContentWraped from './DashbordContentWraped';

interface Props {
	initialQuizzes: Awaited<
		ReturnType<(typeof serverClient)['quizz']['getListQuizzes']>
	>;
}

const DashboardQuizzesContainer = ({ initialQuizzes }: Props) => {
	const params = useSearchParams();
	const initTabQuery = useMemo(() => params.get('tabs'), [params]);
	const initTab = useMemo(() => {
		if (!initTabQuery) {
			return 'draft';
		}
		const tab = clearText(initTabQuery);
		if (['draft', 'active', 'finished', 'experimental'].includes(tab)) {
			return tab;
		}
		return 'draft';
	}, [initTabQuery]);
	return (
		<DashboardQuizzesProvider initialQuizzes={initialQuizzes} initTab={initTab}>
			<div className='flex h-[calc(100vh-3.5rem-1px)] flex-col p-8 pt-6'>
				<DashbordContentWraped />
			</div>
		</DashboardQuizzesProvider>
	);
};

export default DashboardQuizzesContainer;
