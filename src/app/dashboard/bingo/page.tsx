import Navbar from '@/components/ui-web/Navbar';

import Sidebar from '../Sidebar';
import DashboardBingoContainer from './DashboardBingoContainer';

const DashboardPage = () => {
	return (
		<>
			<Navbar />
			<div className='grid grid-cols-5'>
				<div className='h-[calc(100vh-3.5rem-1px)] '>
					<Sidebar active='bingo' />
				</div>
				<div className='col-span-3 border-l'>
					<DashboardBingoContainer />
				</div>
			</div>
		</>
	);
};

export default DashboardPage;
