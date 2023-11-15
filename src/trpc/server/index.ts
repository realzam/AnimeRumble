import { authRouter } from '@/routes/auth.route';
import { bingoRouter } from '@/routes/bingo.route';
import { loteriaRouter } from '@/routes/loteria.route';
import { quizRouter } from '@/routes/quizz.route';

import { router } from './trpc';

export const appRouter = router({
	auth: authRouter,
	quizz: quizRouter,
	bingo: bingoRouter,
	loteria: loteriaRouter,
});

export type AppRouter = typeof appRouter;
