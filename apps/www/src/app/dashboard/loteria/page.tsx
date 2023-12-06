import { serverClient } from '@/trpc/client/serverClient';

import DashboardLoteriaContainer from '@/components/page/dashboard/loteria/DashboardLoteriaContainer';
import Sidebar from '@/components/page/dashboard/Sidebar';

const DashboardPage = async () => {
	const cards = await serverClient.loteria.getCards();
	return (
		<>
			<div className='grid lg:grid-cols-5'>
				<div className='col-span-1 h-[calc(100vh-3.5rem-1px)]'>
					<Sidebar active='loteria' />
				</div>
				<div className='col-span-3 lg:col-span-4 lg:border-l'>
					<DashboardLoteriaContainer cards={cards} />
				</div>
			</div>
		</>
	);
};

export default DashboardPage;
