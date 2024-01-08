import { type serverClient } from '@/trpc/client/serverClient';
import { type UseBaseQueryResult } from '@tanstack/react-query';

export type QuizDataType = Awaited<
	ReturnType<typeof serverClient.quizz.getQuizz>
>;

export type QuestionType = QuizDataType['questions'][0];

export type QuizzesPlayerDataType = Awaited<
	ReturnType<typeof serverClient.quizz.getListQuizzesPlayer>
>;
export type ListQuizzesDataType = Awaited<
	ReturnType<typeof serverClient.quizz.getListQuizzes>
>;

// export type AnserUserDataType = Awaited<
// 	ReturnType<typeof serverClient.quizz.getAnswerUser>
// >;

export type TypeQuizQuery = UseBaseQueryResult<QuizDataType, unknown>;

export type TypeQuizQueryProps = Omit<TypeQuizQuery, 'data'>;

export type TypeGetQuizPlay = Awaited<
	ReturnType<typeof serverClient.quizz.getQuizPlay>
>;

export type TypeGetQuestionUser = Awaited<
	ReturnType<typeof serverClient.quizz.getQuestionUser>
>;

export type TypeGetSimpleSumaryUser = Awaited<
	ReturnType<typeof serverClient.quizz.getSimpleSumary>
>;
