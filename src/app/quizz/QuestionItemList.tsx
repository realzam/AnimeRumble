'use client';

import { useContext } from 'react';
import { QuizContext } from '@/context/quiz';
import { type TypeResultData } from '@/context/quiz/QuizContext';
import { IconMenuOrder } from '@tabler/icons-react';

import { cn } from '@/lib/utils';
import { Card, CardContent, CardTitle } from '@ui/Card';

interface Props {
	index: number;
	selected?: boolean;
	question: TypeResultData['questions'][0];
}
const QuestionItemList = ({ question, index, selected = false }: Props) => {
	const { setIndexQuestionUI } = useContext(QuizContext);
	return (
		<Card
			className={cn(
				'mt-3 transition-colors duration-300 hover:bg-accent',
				selected && 'bg-card  ring-2 ring-primary dark:bg-slate-900',
			)}
			onClick={() => {
				setIndexQuestionUI(index);
			}}
		>
			<CardContent className='flex items-center p-0'>
				<div className='flex  w-full flex-col items-center '>
					<div className='mt-5 shrink-0'>
						<CardTitle>{question.question || '...'}</CardTitle>
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
				<IconMenuOrder className='mr-2 shrink-0 cursor-grab' />
			</CardContent>
		</Card>
	);
};

export default QuestionItemList;
