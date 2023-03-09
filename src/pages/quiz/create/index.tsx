import { GetServerSideProps } from 'next';

import { db } from '@/db';
import { QuizModel } from '@/db/models';

export default function CreatePage() {
	return <></>;
}

export const getServerSideProps: GetServerSideProps = async () => {
	const newQuiz = new QuizModel({
		description: '',
		createdAt: Date.now(),
		questions: [{}],
	});
	try {
		await db.connect();
		const quiz = await newQuiz.save();
		await db.disconnect();
		return {
			redirect: {
				destination: `/quiz/create/${quiz.id}`,
				permanent: false,
			},
		};
	} catch (error) {
		await db.disconnect();
	}

	return {
		redirect: {
			destination: `/`,
			permanent: false,
		},
	};
};
