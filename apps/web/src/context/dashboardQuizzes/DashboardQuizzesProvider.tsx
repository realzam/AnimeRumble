import { trpc } from '@/trpc/client/client';
import { type serverClient } from '@/trpc/client/serverClient';
import { useObservable } from '@legendapp/state/react';
import { useObservableQuery } from '@legendapp/state/react-hooks/useObservableQuery';
import { getQueryKey } from '@trpc/react-query';

import { type QuizDataType } from '@/types/quizQuery';

import {
	DashboardQuizzesContext,
	type TypeQuizQueryProps,
} from './DashboardQuizzesContext';

type IQuizzes = Awaited<
	ReturnType<(typeof serverClient)['quizz']['getListQuizzes']>
>;

interface Props {
	initialQuizzes: IQuizzes;
	initTab: string;
	children: React.ReactNode;
}

const DashboardQuizzesProvider = ({
	initialQuizzes,
	children,
	initTab,
}: Props) => {
	const utils = trpc.useUtils();

	const showAsignateDialog = useObservable(false);
	const showDeleteDialog = useObservable(false);
	const tabsValue = useObservable(initTab);
	const quizTarget = useObservable<QuizDataType>(initialQuizzes[0]);
	const quizzes = useObservable<IQuizzes>(initialQuizzes);
	const query$ = useObservableQuery({
		queryKey: getQueryKey(trpc.quizz.getListQuizzes, undefined, 'query'),
		queryFn: () =>
			utils.client.quizz.getListQuizzes
				.query()
				.then((res: IQuizzes) => res)
				.catch(),
		initialData: initialQuizzes,
	});

	const props = useObservable<TypeQuizQueryProps>(() => {
		const q = query$.get();
		const { data: _, ...opt } = q;
		return opt;
	});

	const openAsignateDialog = (quiz: QuizDataType) => {
		quizTarget.set(quiz);
		showAsignateDialog.set(true);
	};

	const closeAsignateDialog = () => {
		showAsignateDialog.set(false);
	};

	const openDeleteDialog = (quiz: QuizDataType) => {
		quizTarget.set(quiz);
		showDeleteDialog.set(true);
	};

	const closeDeleteDialog = () => {
		showDeleteDialog.set(false);
	};

	return (
		<DashboardQuizzesContext.Provider
			value={{
				quizTarget,
				quizzes,
				props,
				showAsignateDialog,
				showDeleteDialog,
				openAsignateDialog,
				closeAsignateDialog,
				openDeleteDialog,
				closeDeleteDialog,
				tabsValue,
			}}
		>
			{children}
		</DashboardQuizzesContext.Provider>
	);
};

export default DashboardQuizzesProvider;
