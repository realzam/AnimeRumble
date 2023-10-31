import { createContext } from 'react';
import { type serverClient } from '@/trpc/client/serverClient';
import { type AppRouter } from '@/trpc/server';
import { type Observable } from '@legendapp/state';
import { type TRPCClientErrorLike } from '@trpc/client';
import { type DefinedUseTRPCQueryResult } from '@trpc/react-query/shared';

export type TypeResultData = Awaited<
	ReturnType<typeof serverClient.quizz.getQuizz>
>;

export type TypeQuizuseQuery = DefinedUseTRPCQueryResult<
	TypeResultData,
	TRPCClientErrorLike<AppRouter>
>;

export type Typerefetch = TypeQuizuseQuery['refetch'];
interface ContextProps {
	refetch: Typerefetch;
	quiz: TypeResultData;
	indexQuestionUI: Observable<number>;
	questionUI: TypeResultData['questions'][0];
	valueQuestion: Observable<string>;
	typeQuestion: Observable<'Multiple' | 'TF'>;
	setIndexQuestionUI: (i: number) => void;
}

export const QuizContext = createContext({} as ContextProps);
