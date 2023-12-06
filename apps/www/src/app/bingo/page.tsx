import { serverClient } from '@/trpc/client/serverClient';

import BingoContainerPage from '@/components/page/bingo/BingoContainerPage';

const BingoPage = async () => {
	const reactives = await serverClient.bingo.getRandomReactives();
	return <BingoContainerPage reactives={reactives} />;
};

export default BingoPage;
