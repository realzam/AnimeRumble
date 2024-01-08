'use client';

import { Switch } from '@legendapp/state/react';

import usePlayQuiz from '@/hooks/usePlayQuiz';

import PlayQuizLoading from './PlayQuizLoading';
import PlayQuizQuestionFull from './PlayQuizQuestionFull';
import PlayQuizShowQuestion from './PlayQuizShowQuestion';
import PlayQuizStartScreen from './PlayQuizStartScreen';
import PlayQuizStadisticsUser from './quizStadistics/PlayQuizStadisticsUser';

const PlayQuizScreenSelector = () => {
	const { stateQuiz } = usePlayQuiz();

	return (
		<div>
			<Switch value={stateQuiz}>
				{{
					showStart: () => <PlayQuizStartScreen />,
					showLoading: () => <PlayQuizLoading />,
					showQuestion: () => <PlayQuizShowQuestion />,
					showFullUI: () => <PlayQuizQuestionFull />,
					showEnd: () => <PlayQuizStadisticsUser />,
					default: () => <div>Error</div>,
				}}
			</Switch>
		</div>
	);
};

export default PlayQuizScreenSelector;
