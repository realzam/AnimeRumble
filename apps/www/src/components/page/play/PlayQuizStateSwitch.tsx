'use client';

import { Switch } from '@legendapp/state/react';

import usePlayQuiz from '@/hooks/usePlayQuiz';

import PlayQuizQuestionContainer from './PlayQuizQuestionContainer';
import PlayQuizShowPrelude from './PlayQuizShowPrelude';
import PlayQuizShowQuestion from './PlayQuizShowQuestion';
import PlayQuizStadistics from './PlayQuizStadistics';
import PlayQuizStart from './PlayQuizStart';

const PlayQuizStateSwitch = () => {
	const { stateQuiz } = usePlayQuiz();

	return (
		<div>
			<Switch value={stateQuiz}>
				{{
					showStart: () => <PlayQuizStart />,
					showPrelude: () => <PlayQuizShowPrelude />,
					showQuestion: () => <PlayQuizShowQuestion />,
					showFullUI: () => <PlayQuizQuestionContainer />,
					showEnd: () => <PlayQuizStadistics />,
					default: () => <div>Error</div>,
				}}
			</Switch>
		</div>
	);
};

export default PlayQuizStateSwitch;
