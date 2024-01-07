'use client';

import { useMemo } from 'react';
import { trpc } from '@/trpc/client/client';
import { type serverClient } from '@/trpc/client/serverClient';

import { ScrollArea } from '@ui/ScrollArea';

import AssignateQuiz from '../../create/AssignateQuiz';
import DeleteQuizAlertDialog from './DeleteQuizAlertDialog';
import EmptyQuizzesListView from './EmptyQuizzesListView';
import QuizDraftItem from './QuizDraftItem';

type IQuiz = Awaited<
	ReturnType<(typeof serverClient)['quizz']['getListQuizzes']>
>;

interface Props {
	initialQuizzes: IQuiz;
	type: IQuiz[0]['state'];
}
const QuizzesListView = ({ initialQuizzes, type }: Props) => {
	const quizzes = trpc.quizz.getListQuizzes.useQuery(undefined, {
		initialData: initialQuizzes,
	});

	const quizzesList = useMemo(
		() => quizzes.data.filter((q) => q.state === type),
		[quizzes.data, type],
	);
	if (quizzesList.length === 0) {
		return <EmptyQuizzesListView />;
	}
	return (
		<>
			<DeleteQuizAlertDialog />
			<AssignateQuiz />
			<ScrollArea className='h-full w-full rounded' type='always'>
				<div className='pr-5'>
					{quizzesList.map((quiz) => (
						<QuizDraftItem quiz={quiz} key={quiz.id} />
					))}
				</div>
			</ScrollArea>
		</>
	);
};

export default QuizzesListView;
