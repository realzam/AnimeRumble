'use cl';

import { ScrollArea } from '@ui/ScrollArea';
import DashboardRumbleContainer from '@/components/page/dashboard/rumble/DashboardRumbleContainer';
import Sidebar from '@/components/page/dashboard/Sidebar';

const RumblePage = () => {
	return (
		<>
			<div className='grid lg:grid-cols-5'>
				<div className='col-span-1 h-[calc(100vh-3.5rem-1px)]'>
					<Sidebar active='rumble' />
				</div>
				<div className='col-span-3 overflow-hidden lg:col-span-4 lg:border-l'>
					<div className='h-[calc(100vh-3.5rem-1px)]'>
						<ScrollArea className='h-full' type='always'>
							<DashboardRumbleContainer />
						</ScrollArea>
					</div>
				</div>
			</div>
		</>
	);
};

export default RumblePage;
