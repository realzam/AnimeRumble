'use client';

import React, { useContext } from 'react';
import { BearContext } from '@/context/bear/bearContext';
// import { trpc } from '@/trpc/client/client';
import { enableReactComponents } from '@legendapp/state/config/enableReactComponents';

import { Button } from '@/components/ui/Button';

import AddQuizButton from './AddQuizButton';

enableReactComponents();
const QuizContainer = () => {
	const { initialQuiz } = useContext(BearContext);

	// const data = useMemo(() => quizQuery.data, [quizQuery.data]);
	return (
		<div className='flex flex-col'>
			<div>
				quiz title:
				{initialQuiz.title}
			</div>
			<div>question:{initialQuiz.questions.length}</div>
			<Button
				className='m-3'
				onClick={() => {
					// isSelectedX.set((v) => v + 1);
				}}
			>
				Add bear
			</Button>
			{/* <button onClick={() => refetch()}>refetch</button> */}
			<AddQuizButton />
		</div>
	);
};

export default QuizContainer;
