import { serverClient } from '@/trpc/client/serverClient';

import LoteriaContainerPage from '@/components/page/loteria/LoteriaContainerPage';

const LoteriaPage = async () => {
	const cards = await serverClient.loteria.getRandomCards();
	const allCards = await serverClient.loteria.getCards();
	return (
		<div className='h-[calc(100vh-3.5rem-1px)]'>
			<div className='m-[0_auto] flex h-full flex-col'>
				<LoteriaContainerPage cards={cards} allCards={allCards} />
			</div>
		</div>
	);
};

export default LoteriaPage;
