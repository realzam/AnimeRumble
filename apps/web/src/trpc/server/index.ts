import { authRouter } from '@/routes/auth.route';
import { bingoRouter } from '@/routes/bingo.route';
import { devRouter } from '@/routes/dev.route';
import { loteriaRouter } from '@/routes/loteria.route';
import { quizRouter } from '@/routes/quizz.route';
import { rumbleRouter } from '@/routes/rumble.route';
import { userRouter } from '@/routes/user.route';

import { router } from './trpc';

export const appRouter = router({
	auth: authRouter,
	quizz: quizRouter,
	bingo: bingoRouter,
	loteria: loteriaRouter,
	rumble: rumbleRouter,
	user: userRouter,
	dev: devRouter,
});

export type AppRouter = typeof appRouter;
