'use client';

import { useSearchParams } from 'next/navigation';
import QuizProvider from '@/context/quiz/QuizProvider';

import { type QuizDataType } from '@/types/quizQuery';
import BackButton from '@/components/web/BackButton';

import QuizEditContainer from './editContainer/QuizEditContainer';
import QuizSideBar from './sidebar/QuizSideBar';

interface Props {
	initialQuiz: QuizDataType;
}
const QuizPageContainer = ({ initialQuiz }: Props) => {
	const searchParams = useSearchParams();
	const index = searchParams?.get('index');
	let indexNum = 0;
	if (index) {
		try {
			const n = parseInt(index);
			if (n >= 0 && n < initialQuiz.questions.length) {
				indexNum = n;
			}
		} catch (error) {}
	}

	return (
		<QuizProvider initialQuiz={initialQuiz} index={indexNum}>
			<div className='h-[calc(100vh-3.5rem-1px)] sm:p-2'>
				<div className='w-full'>
					<BackButton />
				</div>
				<div className='mx-auto grid h-[calc(100vh-3.5rem-1px-10px-40px)] max-w-[1400px] grid-cols-7 gap-3'>
					<QuizSideBar />
					<QuizEditContainer />
				</div>
			</div>
		</QuizProvider>
	);
};

export default QuizPageContainer;
