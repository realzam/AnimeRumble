import moment from 'moment';

import DevContainer from '@/components/page/dev/DevContainer';

const page = async () => {
	const time = moment()
		.add(1, 'day')
		.add(55, 'minutes')
		.add(8, 'hours')
		.diff(0);
	return (
		<div>
			<DevContainer time={time} />
		</div>
	);
};

export default page;
