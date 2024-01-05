import { serverClient } from '@/trpc/client/serverClient';

import { getAuthSession } from '@/lib/nextauth';
import LoteriaContainerPage from '@/components/page/loteria/LoteriaContainerPage';

const LoteriaPage = async () => {
	const allCards = await serverClient.loteria.getCards();
	const currentGame = await serverClient.loteria.getCurrentGame();
	const session = await getAuthSession();
	return (
		<div className='h-[calc(100vh-3.5rem-1px)]'>
			<div className='m-[0_auto] flex h-full flex-col'>
				<LoteriaContainerPage
					allCards={allCards}
					session={session}
					currentGame={currentGame}
				/>
			</div>
		</div>
	);
};

export default LoteriaPage;
