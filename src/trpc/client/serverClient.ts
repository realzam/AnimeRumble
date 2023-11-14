import { appRouter } from '@/trpc/server';

export const serverClient = appRouter.createCaller({
	session: null,
});
