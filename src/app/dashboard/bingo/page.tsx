import { serverClient } from '@/trpc/client/serverClient';

import DashboardBingoContainer from '@/components/page/dashboard/bingo/DashboardBingoContainer';
import Sidebar from '@/components/page/dashboard/Sidebar';

const DashboardPage = async () => {
	const reactives = await serverClient.bingo.getReactives();
	return (
		<>
			<div className='grid lg:grid-cols-5'>
				<div className='col-span-1 h-[calc(100vh-3.5rem-1px)] '>
					<Sidebar active='bingo' />
				</div>
				<div className='col-span-3 lg:col-span-4 lg:border-l'>
					<DashboardBingoContainer reactives={reactives} />
				</div>
			</div>
		</>
	);
};

export default DashboardPage;
