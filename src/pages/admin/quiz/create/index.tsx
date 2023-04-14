import { GetServerSideProps } from 'next';

import { db } from '@/db';
import { QuizModel } from '@/db/models';

export default function CreatePage() {
	return <></>;
}

export const getServerSideProps: GetServerSideProps = async () => {
	try {
		console.log('Quiz-create');

		const newQuiz = new QuizModel({
			description: '',
			createdAt: Date.now(),
			questions: [{}],
		});
		await db.connect();
		const quiz = await newQuiz.save();
		await db.disconnect();
		return {
			redirect: {
				destination: `/admin/quiz/create/${quiz.id}`,
				permanent: false,
			},
		};
	} catch (error) {
		console.error('Quiz-create', error);
		await db.disconnect();
	}

	return {
		redirect: {
			destination: `/`,
			permanent: false,
		},
	};
};
