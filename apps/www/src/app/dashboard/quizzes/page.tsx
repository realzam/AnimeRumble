import { redirect } from 'next/navigation';
import { serverClientSession } from '@/trpc/client/serverClient';
import { TRPCError } from '@trpc/server';
import { type Session } from 'next-auth';

import { type ListQuizzesDataType } from '@/types/quizQuery';
import { getAuthSession } from '@/lib/nextauth';
import animeRumbleRoutes from '@/lib/routes';
import DashboardQuizzesContainer from '@/components/page/dashboard/quizzes/DashboardQuizzesContainer';
import Sidebar from '@/components/page/dashboard/Sidebar';

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
			<>
				<div className='grid lg:grid-cols-5'>
					<div className='col-span-1 h-[calc(100vh-3.5rem-1px)]'>
						<Sidebar active='quizz' />
					</div>
					<div className='col-span-3 lg:col-span-4 lg:border-l'>
						<DashboardQuizzesContainer initialQuizzes={data} />
					</div>
				</div>
			</>
		);
	}
	redirect(animeRumbleRoutes.home);
};

export default DashboardPage;
