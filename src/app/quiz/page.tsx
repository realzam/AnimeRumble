import { serverClient } from '@/trpc/client/serverClient';

import QuizPlayerPage from '@/components/page/quizPlayer/QuizPlayerPage';

const Quizk = async () => {
	const quizzes = await serverClient.quizz.getListQuizzesPlayer();
	return <QuizPlayerPage quizzes={quizzes} />;
};

export default Quizk;
