import { type serverClient } from '@/trpc/client/serverClient';

export type LoteriaCardsDataType = Awaited<
	ReturnType<typeof serverClient.loteria.getCards>
>;

export type LoteriaCardDataType = Awaited<
	ReturnType<typeof serverClient.loteria.getCards>
>[0];

export type LoteriaGameDataType = Awaited<
	ReturnType<typeof serverClient.loteria.startLoteriaHost>
>;
