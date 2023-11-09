'use client';

import { createContext } from 'react';
import { type serverClient } from '@/trpc/client/serverClient';
import { type AppRouter } from '@/trpc/server';
import { type TRPCClientErrorLike } from '@trpc/react-query';
import { type UseTRPCQueryResult } from '@trpc/react-query/shared';
import { type inferRouterOutputs } from '@trpc/server';

type RefetchType = UseTRPCQueryResult<
	inferRouterOutputs<AppRouter>['quizz']['getQuizz'],
	TRPCClientErrorLike<AppRouter>
>['refetch'];

type QuizDataType = Awaited<ReturnType<typeof serverClient.quizz.getQuizz>>;
interface State {
	initialQuiz: QuizDataType;
	// quiz: ObservableObject<QuizDataType>;
	// isSelectedX: ObservablePrimitive<number>;
	refetch: RefetchType;
}
export const BearContext = createContext<State>({} as State);
