// import { serverClient } from '@/trpc/client/serverClient';

import DashboardConfigContainer from '@/components/page/dashboard/configuraciones/DashboardConfigContainer';
import Sidebar from '@/components/page/dashboard/Sidebar';

const DashboardPage = async () => {
	// const quizzes = await serverClient.quizz.getListQuizzes();
	return (
		<>
			<div className='grid lg:grid-cols-5'>
				<div className='h-[calc(100vh-3.5rem-1px)]'>
					<Sidebar active='users' />
				</div>
				<div className='container col-span-3 lg:col-span-4 lg:border-l'>
					<DashboardConfigContainer />
				</div>
			</div>
		</>
	);
};

export default DashboardPage;
