import { serverClient } from '@/trpc/client/serverClient';

import DashboardQuizzesContainer from '@/components/page/dashboard/quizzes/DashboardQuizzesContainer';
import Sidebar from '@/components/page/dashboard/Sidebar';

const DashboardPage = async () => {
	const quizzes = await serverClient.quizz.getListQuizzes();
	return (
		<>
			<div className='grid lg:grid-cols-5'>
				<div className='h-[calc(100vh-3.5rem-1px)] '>
					<Sidebar active='quizz' />
				</div>
				<div className='col-span-3 lg:col-span-4 lg:border-l'>
					<DashboardQuizzesContainer initialQuizzes={quizzes} />
				</div>
			</div>
		</>
	);
};

export default DashboardPage;
