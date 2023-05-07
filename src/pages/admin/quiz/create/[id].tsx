import { useContext, useEffect } from 'react';

import mongoose from 'mongoose';
import { GetServerSideProps } from 'next';
import { SWRConfig } from 'swr';

import WrapperQuizPage from '@/components/quiz/WrapperQuizPage';
import { QuizContext } from '@/context';
import { db } from '@/db';
import { QuestionDB } from '@/db/models';
import QuizModel from '@/db/models/Quiz';
import { IQuiz } from '@/interfaces';

interface Props {
	fallback: {
		[key: string]: IQuiz;
	};
	id: string;
}

export default function CreatePage({ fallback, id }: Props) {
	const { quizID, setQuizID } = useContext(QuizContext);

	useEffect(() => {
		if (quizID === '') {
			setQuizID(id);
		}
	}, [setQuizID, id, quizID]);

	if (quizID === '') {
		return <></>;
	}
	return (
		<SWRConfig value={{ fallback }}>
			<WrapperQuizPage />
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
			id,
		},
	};
};
