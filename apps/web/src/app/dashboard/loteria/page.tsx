import { serverClient } from '@/trpc/client/serverClient';

import DashBoardAdmin from '@/components/page/dashboard/DashBoardAdmin';
import DashboardLoteriaContainer from '@/components/page/dashboard/loteria/DashboardLoteriaContainer';

const DashboardPage = async () => {
	const cards = await serverClient.loteria.getCards();
	return (
		<DashBoardAdmin active='loteria'>
			<DashboardLoteriaContainer cards={cards} />
		</DashBoardAdmin>
	);
};

export default DashboardPage;
