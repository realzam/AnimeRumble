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
	if (!mongoose.isValidObjectId(id)) {
		return {
			redirect: {
				destination: '/quiz/create',
				permanent: false,
			},
		};
	}
	await db.connect();
	const quiz = await QuizModel.findById(id);

	if (!quiz) {
		return {
			redirect: {
				destination: '/quiz/create',
				permanent: false,
			},
		};
	}
	if (quiz.questions.length === 0) {
		quiz.questions.push({
			question: '',
		} as QuestionDB);
		await quiz.save();
	}
	await db.disconnect();
	const quizObj = quiz.toJSON<IQuiz>({
		flattenMaps: false,
	});

	return {
		props: {
			quiz: quizObj,
		},
	};
};
