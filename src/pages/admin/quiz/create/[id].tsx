import mongoose from 'mongoose';
import { GetServerSideProps } from 'next';

import WrapperQuizPage from '@/components/quiz/WrapperQuizPage';
import { QuizProvider } from '@/context';
import { db } from '@/db';
import { QuestionDB } from '@/db/models';
import QuizModel from '@/db/models/Quiz';
import { IQuiz } from '@/interfaces';

interface Props {
	quiz: IQuiz;
}

export default function CreatePage({ quiz }: Props) {
	return (
		<QuizProvider initialState={{ index: 0, quiz }}>
			<div>Hola</div>
			{/* <WrapperQuizPage /> */}
		</QuizProvider>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	console.time('create:id');
	const { id } = params as { id: string };
	if (!mongoose.isValidObjectId(id)) {
		return {
			redirect: {
				destination: '/admin/quiz/create',
				permanent: false,
			},
		};
	}
	console.timeLog('create:id');
	await db.connect();
	const quiz = await QuizModel.findById(id);

	if (!quiz) {
		return {
			redirect: {
				destination: '/admin/quiz/create',
				permanent: false,
			},
		};
	}
	console.timeLog('create:id');
	if (quiz.questions.length === 0) {
		quiz.questions.push({
			question: '',
		} as QuestionDB);
		await quiz.save();
	}
	console.timeLog('create:id');
	await db.disconnect();
	const quizObj = quiz.toJSON<IQuiz>({
		flattenMaps: false,
	});
	console.timeEnd('create:id');
	return {
		props: {
			quiz: quizObj,
		},
	};
};
