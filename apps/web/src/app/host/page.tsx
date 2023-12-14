import { serverClient } from '@/trpc/client/serverClient';

import LoteriaHostPage from '@/components/page/host/loteria/LoteriaHostPage';

export default async function HostPage() {
	const res = await serverClient.loteria.startLoteriaHost();

	return <LoteriaHostPage game={res} />;
}
