import Navbar from '@/components/ui-web/Navbar';

import Sidebar from '../Sidebar';
import DashboardQuizzesContainer from './DashboardQuizzesContainer';

const DashboardPage = () => {
	return (
		<>
			<Navbar />
			<div className='grid lg:grid-cols-5'>
				<div className='h-[calc(100vh-3.5rem-1px)] '>
					<Sidebar active='quizz' />
				</div>
				<div className='col-span-3 lg:col-span-4 lg:border-l'>
					<DashboardQuizzesContainer />
				</div>
			</div>
		</>
	);
};

export default DashboardPage;
