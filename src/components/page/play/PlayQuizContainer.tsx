import PlayQuizProvider from '@/context/playQuiz/PlayQuizProvider';

import { type QuizDataType } from '@/types/quizQuery';

import PlayQuizStateSwitch from './PlayQuizStateSwitch';

interface Props {
	quiz: QuizDataType;
	user: string;
}
const PlayQuizContainer = ({ quiz, user }: Props) => {
	return (
		<PlayQuizProvider initialQuiz={quiz} user={user}>
			<PlayQuizStateSwitch />
		</PlayQuizProvider>
	);
};

export default PlayQuizContainer;
