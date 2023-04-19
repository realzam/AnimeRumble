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
			<WrapperQuizPage />
		</QuizProvider>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const { id } = params as { id: string };
	console.log('create[id],1');
	if (!mongoose.isValidObjectId(id)) {
		return {
			redirect: {
				destination: '/admin/quiz/create',
				permanent: false,
			},
		};
	}
	console.log('create[id],2');
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
	console.log('create[id],3');
	if (quiz.questions.length === 0) {
		quiz.questions.push({
			question: '',
		} as QuestionDB);
		await quiz.save();
	}
	console.log('create[id],4');
	await db.disconnect();
	const quizObj = quiz.toJSON<IQuiz>({
		flattenMaps: false,
	});
	console.log('create[id],5');
	return {
		props: {
			quiz: quizObj,
		},
	};
};
