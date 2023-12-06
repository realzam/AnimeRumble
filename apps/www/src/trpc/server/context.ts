import { type inferAsyncReturnType } from '@trpc/server';

import { getAuthSession } from '@/lib/nextauth';

export const createContext = async () => {
	const session = await getAuthSession();
	return {
		session,
	};
};

export type Context = inferAsyncReturnType<typeof createContext>;
