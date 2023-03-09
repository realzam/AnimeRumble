import mongoose from 'mongoose';
import { GetServerSideProps } from 'next';

import WrapperQuizPage from '@/components/quiz/WrapperQuizPage';
import { QuizProvider } from '@/context/quiz';
import { db } from '@/db';
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
	await db.disconnect();

	if (!quiz) {
		return {
			redirect: {
				destination: '/quiz/create',
				permanent: false,
			},
		};
	}
	const quizObj = quiz.toJSON<IQuiz>({
		flattenMaps: false,
	});

	return {
		props: {
			quiz: quizObj,
		},
	};
};
