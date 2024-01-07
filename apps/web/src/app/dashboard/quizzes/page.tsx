import { redirect } from 'next/navigation';
import { serverClientSession } from '@/trpc/client/serverClient';
import { TRPCError } from '@trpc/server';
import { type Session } from 'next-auth';

import { type ListQuizzesDataType } from '@/types/quizQuery';
import { getAuthSession } from '@/lib/nextauth';
import animeRumbleRoutes from '@/lib/routes';
import DashBoardAdmin from '@/components/page/dashboard/DashBoardAdmin';
import DashboardQuizzesContainer from '@/components/page/dashboard/quizzes/DashboardQuizzesContainer';

type TypeGetData =
	| [undefined, ListQuizzesDataType]
	| [TRPCError['code'], undefined]
	| ['UNKNOWN', undefined];
async function getData(session: Session): Promise<TypeGetData> {
	try {
		const res = await serverClientSession(session).quizz.getListQuizzes();
		return [undefined, res];
	} catch (error) {
		if (error instanceof TRPCError) {
			return [error.code, undefined];
		}
		return ['UNKNOWN', undefined];
	}
}

const DashboardPage = async () => {
	const session = (await getAuthSession())!;
	const res = await getData(session);
	const [code, data] = res;
	if (!code) {
		return (
			<DashBoardAdmin active='quizzes'>
				<DashboardQuizzesContainer initialQuizzes={data} />
			</DashBoardAdmin>
		);
	}
	redirect(animeRumbleRoutes.home);
};

export default DashboardPage;
