'use client';

import { trpc } from '@/trpc/client/client';

import { type QuizzesPlayerDataType } from '@/types/quizQuery';

import QuestionPlayerCard from './QuestionPlayerCard';

interface Props {
	quizzes: QuizzesPlayerDataType;
}
const QuizPlayerPage = ({ quizzes }: Props) => {
	const { data } = trpc.quizz.getListQuizzesPlayer.useQuery(undefined, {
		initialData: quizzes,
	});
	return (
		<main className='flex flex-1'>
			<div className='container mt-4 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
				{data.length > 0 ? (
					data.map((quiz) => <QuestionPlayerCard key={quiz.id} quiz={quiz} />)
				) : (
					<>no quizzes actives :)</>
				)}
			</div>
		</main>
	);
};

export default QuizPlayerPage;
