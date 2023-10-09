import { redirect } from 'next/navigation';
import { serverClient } from '@/trpc/client/serverClient';

import QuizPage from './QuizzPage';

async function getData(id: string) {
	try {
		const res = await serverClient.quizz.quizz({ id });
		return res;
	} catch (error) {
		return undefined;
	}
}

export default async function Page({ params }: { params: { id: string } }) {
	const data = await getData(params.id);
	if (!data) {
		redirect('/dashboard');
	} else {
		return <QuizPage id={data.id} initialQuiz={data} />;
	}
}
