import { createContext } from 'react';
import { type serverClient } from '@/trpc/client/serverClient';
import {
	type ObservableArray,
	type ObservableObject,
	type ObservablePrimitive,
} from '@legendapp/state';
import { type UseBaseQueryResult } from '@tanstack/react-query';

import { type QuizDataType } from '@/types/quizQuery';

type TypeQuizzesQuery = UseBaseQueryResult<IQuizzes, unknown>;

export type TypeQuizQueryProps = Omit<TypeQuizzesQuery, 'data'>;
type IQuizzes = Awaited<
	ReturnType<(typeof serverClient)['quizz']['getListQuizzes']>
>;

interface State {
	quizzes: ObservableArray<IQuizzes>;
	props: ObservableObject<TypeQuizQueryProps>;
	showAsignateDialog: ObservablePrimitive<boolean>;
	showDeleteDialog: ObservablePrimitive<boolean>;
	quizTarget: ObservablePrimitive<QuizDataType>;
	openAsignateDialog: (quiz: QuizDataType) => void;
	openDeleteDialog: (quiz: QuizDataType) => void;
	closeAsignateDialog: () => void;
	closeDeleteDialog: () => void;
}

export const DashboardQuizzesContext = createContext<State | null>(null);
