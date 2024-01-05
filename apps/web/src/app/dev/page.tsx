import { serverClient } from '@/trpc/client/serverClient';

import DevContainer from '@/components/page/dev/DevContainer';

const page = async () => {
	const list = await serverClient.loteria.getCards();

	return (
		<div>
			<DevContainer list={list} />
		</div>
	);
};

export default page;
