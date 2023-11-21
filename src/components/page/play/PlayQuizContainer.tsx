import PlayQuizProvider from '@/context/playQuiz/PlayQuizProvider';

import { type QuizDataType } from '@/types/quizQuery';

import PlayQuizStateSwitch from './PlayQuizStateSwitch';

interface Props {
	quiz: QuizDataType;
}
const PlayQuizContainer = ({ quiz }: Props) => {
	return (
		<PlayQuizProvider initialQuiz={quiz}>
			<PlayQuizStateSwitch />
		</PlayQuizProvider>
	);
};

export default PlayQuizContainer;
