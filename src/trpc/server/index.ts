import { authRouter } from '@/routes/auth.route';
import { quizRouter } from '@/routes/quizz.route';

import { router } from './trpc';

export const appRouter = router({
	auth: authRouter,
	quizz: quizRouter,
});

export type AppRouter = typeof appRouter;
