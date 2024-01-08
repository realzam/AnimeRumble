import DashBoardAdmin from '@/components/page/dashboard/DashBoardAdmin';
import DashboardRumbleContainer from '@/components/page/dashboard/rumble/DashboardRumbleContainer';

const RumblePage = () => {
	return (
		<DashBoardAdmin active='rumble'>
			<DashboardRumbleContainer />
		</DashBoardAdmin>
	);
};

export default RumblePage;
