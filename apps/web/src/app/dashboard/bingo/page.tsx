import { serverClient } from '@/trpc/client/serverClient';

import DashboardBingoContainer from '@/components/page/dashboard/bingo/DashboardBingoContainer';
import DashBoardAdmin from '@/components/page/dashboard/DashBoardAdmin';

const DashboardPage = async () => {
	const reactives = await serverClient.bingo.getReactives();
	return (
		<DashBoardAdmin active='bingo'>
			<DashboardBingoContainer reactives={reactives} />
		</DashBoardAdmin>
	);
};

export default DashboardPage;
