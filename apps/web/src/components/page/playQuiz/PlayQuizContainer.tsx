import PlayQuizProvider from '@/context/playQuiz/PlayQuizProvider';

import { type TypeGetQuizPlay } from '@/types/quizQuery';

import PlayQuizScreenSelector from './PlayQuizScreenSelector';

interface Props {
	quiz: TypeGetQuizPlay;
}

const PlayQuizContainer = ({ quiz }: Props) => {
	return (
		<PlayQuizProvider quiz={quiz}>
			<PlayQuizScreenSelector />
		</PlayQuizProvider>
	);
};

export default PlayQuizContainer;
