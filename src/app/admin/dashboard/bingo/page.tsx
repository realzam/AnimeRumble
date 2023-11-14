import DashboardBingoContainer from '@/components/page/dashboard/bingo/DashboardBingoContainer';
import Sidebar from '@/components/page/dashboard/Sidebar';

const DashboardPage = () => {
	return (
		<>
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
