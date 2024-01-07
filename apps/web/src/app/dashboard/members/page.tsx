import { serverClientSession } from '@/trpc/client/serverClient';
import { type Session } from 'next-auth';

import { getAuthSession } from '@/lib/nextauth';
import DashBoardAdmin from '@/components/page/dashboard/DashBoardAdmin';
import DashboardMembersContainer from '@/components/page/dashboard/members/DashboardMembersContainer';

const getData = async (session: Session) => {
	const members = await serverClientSession(session).user.getMemembers();
	return members;
};
const DashboardPage = async () => {
	const session = (await getAuthSession())!;
	const members = await getData(session);
	return (
		<DashBoardAdmin active='members'>
			<DashboardMembersContainer members={members} />
		</DashBoardAdmin>
	);
};

export default DashboardPage;
