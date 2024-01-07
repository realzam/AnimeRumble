import { useContext } from 'react';
import { DashboardQuizzesContext } from '@/context/dashboardQuizzes/DashboardQuizzesContext';

const useDashboardQuizzes = () => {
	const state = useContext(DashboardQuizzesContext);
	if (!state)
		throw new Error('Missing LoteriaInfoAdminContex.Provider in the tree');
	return state;
};

export default useDashboardQuizzes;
