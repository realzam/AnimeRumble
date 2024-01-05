import { initTRPC, TRPCError } from '@trpc/server';
import { ZodError } from 'zod';

import { type Context } from './context';

const t = initTRPC.context<Context>().create({
	errorFormatter(opts) {
		const { shape, error } = opts;
		delete shape.data.stack;
		delete shape.data.path;
		return {
			...shape,
			data: {
				...shape.data,
				zodError:
					error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
						? error.cause.flatten()
						: null,
			},
		};
	},
});

const isAuthed = t.middleware(({ next, ctx }) => {
	if (!ctx.session?.user.email) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
		});
	}
	return next({
		ctx: {
			session: ctx.session,
		},
	});
});

const isAdim = t.middleware(({ next, ctx }) => {
	if (!ctx.session?.user.email) {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
		});
	}

	if (ctx.session?.user.role !== 'admin') {
		throw new TRPCError({
			code: 'UNAUTHORIZED',
			cause: 'no tienes los permisos requeridos',
		});
	}

	return next({
		ctx: {
			session: ctx.session,
		},
	});
});

const isDev = t.middleware(({ next }) => {
	if (process.env.NODE_ENV === 'development') {
		return next();
	}
	throw new TRPCError({
		code: 'FORBIDDEN',
		cause: 'No permitido',
	});
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const devProcedure = t.procedure.use(isDev);
export const userProcedure = t.procedure.use(isAuthed);
export const adminProcedure = t.procedure.use(isAuthed).use(isAdim);
