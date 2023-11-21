'use client';

import { Switch } from '@legendapp/state/react';

import usePlayQuiz from '@/hooks/usePlayQuiz';

import PlayQuizQuestionContainer from './PlayQuizQuestionContainer';
import PlayQuizShowPrelude from './PlayQuizShowPrelude';
import PlayQuizShowQuestion from './PlayQuizShowQuestion';
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
					showEnd: () => <>end podio</>,
					default: () => <div>Error</div>,
				}}
			</Switch>
		</div>
	);
};

export default PlayQuizStateSwitch;
