'use client';

import { useContext } from 'react';
import { QuizContext } from '@context/quiz';
import { IconMenuOrder } from '@tabler/icons-react';

import { Card, CardContent, CardTitle } from '@ui/Card';
import { ScrollArea } from '@ui/ScrollArea';

const ListQuizzes = () => {
	const { quiz, indexQuestionUI } = useContext(QuizContext);

	const questions = quiz.questions;

	return (
		<ScrollArea type='always'>
			<div className='px-5 py-4'>
				<div className='text-violet-400'>{`${questions.length} ${
					questions.length === 1 ? 'pregunta' : 'preguntas'
				} `}</div>

				{questions.map((question, index) => (
					<Card
						key={question.id}
						className='mt-3 transition-colors duration-300 hover:bg-accent'
						onClick={() => {
							indexQuestionUI.set(index);
							// setIndexQuestionUI(question.id);
						}}
					>
						<CardContent className='flex items-center p-0'>
							<div className='flex  w-full flex-col items-center '>
								<div className='mt-5 shrink-0'>
									<CardTitle>{question.question}</CardTitle>
								</div>
								<div className='w-full flex-1'>
									<div className='grid grid-cols-2 gap-2 p-5'>
										<div className='h-5 border border-red-500' />
										<div className='h-5 border border-blue-500' />
										<div className='h-5 border border-yellow-500' />
										<div className='h-5 border border-green-500' />
									</div>
								</div>
							</div>
							<IconMenuOrder className='mr-2 shrink-0' />
						</CardContent>
					</Card>
				))}
			</div>
		</ScrollArea>
	);
};

export default ListQuizzes;
