import { initTRPC } from '@trpc/server';
import { ZodError } from 'zod';

const t = initTRPC.create({
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

export const router = t.router;
export const publicProcedure = t.procedure;
