import QuizDashboard from '@/components/admin/dashboards/quiz/QuizDashboard';
import { AdminLayout } from '@/layouts';

const DashboardPage = (): JSX.Element => {
	return (
		<AdminLayout>
			<QuizDashboard />
		</AdminLayout>
	);
};

export default DashboardPage;
