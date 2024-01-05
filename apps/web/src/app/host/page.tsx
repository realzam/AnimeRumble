import { redirect } from 'next/navigation';
import { serverClientSession } from '@/trpc/client/serverClient';
import { TRPCError } from '@trpc/server';
import { type Session } from 'next-auth';

import { type LoteriaStartLoteriaHostDataType } from '@/types/loteriaQuery';
import { getAuthSession } from '@/lib/nextauth';
import animeRumbleRoutes from '@/lib/routes';
import LoteriaHostPage from '@/components/page/host/loteria/LoteriaHostPage';

type TypeGetData =
	| [undefined, LoteriaStartLoteriaHostDataType, string[]]
	| [TRPCError['code'], undefined, undefined]
	| ['UNKNOWN', undefined, undefined];
async function getData(session: Session): Promise<TypeGetData> {
	try {
		const res = await serverClientSession(session).loteria.createLoteriaGame();
		const playersOnline =
			await serverClientSession(session).loteria.getPlayesrOnline();
		return [undefined, res, playersOnline];
	} catch (error) {
		if (error instanceof TRPCError) {
			return [error.code, undefined, undefined];
		}
		return ['UNKNOWN', undefined, undefined];
	}
}

export default async function HostPage() {
	const session = (await getAuthSession())!;
	const res = await getData(session);
	const [code, data, playersOnline] = res;

	if (!code) {
		return <LoteriaHostPage {...data} playersOnline={playersOnline} />;
	}
	redirect(animeRumbleRoutes.home);
}
