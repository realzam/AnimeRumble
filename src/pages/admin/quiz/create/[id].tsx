import { InputBase, Stack, Typography } from '@mui/material';
import mongoose from 'mongoose';
import { GetServerSideProps } from 'next';
import useSWR, { Fetcher, SWRConfig } from 'swr';

import QuizQuestionContainer from '@/components/quiz/QuizQuestionContainer';
import WrapperQuizPage from '@/components/quiz/WrapperQuizPage';
import { QuizProvider } from '@/context';
import { db } from '@/db';
import { QuestionDB } from '@/db/models';
import QuizModel from '@/db/models/Quiz';
import { IQuiz } from '@/interfaces';

interface Props {
	fallback: {
		[key: string]: IQuiz;
	};
	quiz: IQuiz;
}

export default function CreatePage({ fallback, quiz }: Props) {
	return (
		<SWRConfig value={{ fallback }}>
			<Typography>Hola Mundo</Typography>
			<QuizProvider initialState={{ index: 0, quizInit: quiz }}>
				<div>Hola</div>
				<QuizQuestionContainer />
				{/* <WrapperQuizPage /> */}
			</QuizProvider>
		</SWRConfig>
	);
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const { id } = params as { id: string };
	if (!mongoose.isValidObjectId(id)) {
		return {
			redirect: {
				destination: '/admin',
				permanent: false,
			},
		};
	}
	await db.connect();
	const quiz = await QuizModel.findById(id);

	if (!quiz) {
		return {
			redirect: {
				destination: '/admin',
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
			fallback: {
				[`/api/quiz/${id}`]: quizObj,
			},
			quiz: quizObj,
		},
	};
};
