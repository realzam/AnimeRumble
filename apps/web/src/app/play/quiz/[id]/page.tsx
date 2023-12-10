import React from 'react';
import { redirect } from 'next/navigation';
import { serverClientSession } from '@/trpc/client/serverClient';
import { TRPCError } from '@trpc/server';
import { type Session } from 'next-auth';

import { type QuizDataType } from '@/types/quizQuery';
import { getAuthSession } from '@/lib/nextauth';
import animeRumbleRoutes from '@/lib/routes';
import PlayQuizContainer from '@/components/page/playQuiz/PlayQuizContainer';

type TypeGetData =
	| [undefined, QuizDataType]
	| [TRPCError['code'], undefined]
	| ['UNKNOWN', undefined];

async function getData(ss: Session, id: string): Promise<TypeGetData> {
	try {
		const res = await serverClientSession(ss).quizz.getQuizPlay({ id });
		return [undefined, res];
	} catch (error) {
		if (error instanceof TRPCError) {
			return [error.code, undefined];
		}
		return ['UNKNOWN', undefined];
	}
}

const PlayQuizPage = async ({ params }: { params: { id: string } }) => {
	const session = await getAuthSession();
	if (session === null || session.user === null) {
		redirect(animeRumbleRoutes.login + '/?callbackUrl=/quiz');
	}

	const res = await getData(session, params.id);
	const [code, data] = res;
	if (!code) {
		console.log('PlayQuizPage render', data);

		return <PlayQuizContainer quiz={data} user={session.user.id} />;
	}
	if (code === 'UNAUTHORIZED') {
		redirect(animeRumbleRoutes.login + '/?callbackUrl=/quiz');
	}

	redirect(animeRumbleRoutes.activityQuizzes);
};

export default PlayQuizPage;
