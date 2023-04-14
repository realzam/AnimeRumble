import QuizDashboard from '@/components/admin/dashboards/QuizDashboard';
import { AdminLayout } from '@/layouts';

const DashboardPage = (): JSX.Element => {
	return (
		<AdminLayout>
			<QuizDashboard />
		</AdminLayout>
	);
};

export default DashboardPage;
