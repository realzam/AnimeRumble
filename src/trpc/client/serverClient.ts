import { appRouter } from '@/trpc/server';
import { type Session } from 'next-auth';

export const serverClient = appRouter.createCaller({
	session: null,
});

export const serverClientSession = (session: Session | null) =>
	appRouter.createCaller({ session });
