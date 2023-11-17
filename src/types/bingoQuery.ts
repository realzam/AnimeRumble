import { type serverClient } from '@/trpc/client/serverClient';

export type BingoReactivesDataType = Awaited<
	ReturnType<typeof serverClient.bingo.getRandomReactives>
>;

export type BingoReactiveDataType = Awaited<
	ReturnType<typeof serverClient.bingo.getRandomReactives>
>[0];
