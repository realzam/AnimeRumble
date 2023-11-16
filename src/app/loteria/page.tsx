import { serverClient } from '@/trpc/client/serverClient';

import LoteriaContainerPage from '@/components/page/loteria/LoteriaContainerPage';

const LoteriaPage = async () => {
	const cards = await serverClient.loteria.getRandomCards();

	return <LoteriaContainerPage cards={cards} />;
};

export default LoteriaPage;
