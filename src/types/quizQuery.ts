import { type serverClient } from '@/trpc/client/serverClient';

export type QuizDataType = Awaited<
	ReturnType<typeof serverClient.quizz.getQuizz>
>;

export type QuestionType = QuizDataType['questions'][0];
