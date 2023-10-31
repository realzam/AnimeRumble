'use client';

import { QuizProvider } from '@/context/quiz';
import { type serverClient } from '@/trpc/client/serverClient';

import Navbar from '@web/Navbar';

import QuizPageSideBar from './QuizPageSideBar';
import QuizzPageContainer from './QuizzPageContainer';

interface Props {
	initialQuiz: Awaited<ReturnType<typeof serverClient.quizz.getQuizz>>;
}
export default function QuizPage({ initialQuiz }: Props) {
	return (
		<QuizProvider initialQuiz={initialQuiz}>
			<Navbar />
			<div className='container flex h-[calc(100vh-3.5rem-1px)] py-8'>
				<QuizPageSideBar />
				<QuizzPageContainer />
			</div>
		</QuizProvider>
	);
}
