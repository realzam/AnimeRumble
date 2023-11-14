import { type serverClient } from '@/trpc/client/serverClient';

export type BingoReactiveDataType = Awaited<
	ReturnType<typeof serverClient.bingo.addReactive>
>;
