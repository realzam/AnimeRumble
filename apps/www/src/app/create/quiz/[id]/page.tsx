import { redirect } from 'next/navigation';
import { serverClientSession } from '@/trpc/client/serverClient';
import { TRPCError } from '@trpc/server';
import { type Session } from 'next-auth';

import { type QuizDataType } from '@/types/quizQuery';
import { getAuthSession } from '@/lib/nextauth';
import animeRumbleRoutes from '@/lib/routes';
import QuizPageContainer from '@/components/page/create/QuizPageContainer';

type TypeGetData =
	| [undefined, QuizDataType]
	| [TRPCError['code'], undefined]
	| ['UNKNOWN', undefined];

async function getData(session: Session, id: string): Promise<TypeGetData> {
	try {
		const res = await serverClientSession(session).quizz.getQuizz({ id });
		return [undefined, res];
	} catch (error) {
		if (error instanceof TRPCError) {
			return [error.code, undefined];
		}
		return ['UNKNOWN', undefined];
	}
}

export default async function Page({ params }: { params: { id: string } }) {
	const session = (await getAuthSession())!;
	const res = await getData(session, params.id);
	const [code, data] = res;

	if (!code) {
		if (data) {
			return <QuizPageContainer initialQuiz={data} />;
		} else {
			redirect(animeRumbleRoutes.dashboardQuizzes);
		}
	}

	redirect(animeRumbleRoutes.home);
}
