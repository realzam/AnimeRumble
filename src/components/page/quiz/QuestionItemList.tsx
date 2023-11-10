import { type Observable } from '@legendapp/state';
import { enableReactComponents } from '@legendapp/state/config/enableReactComponents';
import { Computed, reactive } from '@legendapp/state/react';

import { type QuestionType } from '@/types/quizQuery';
import { cn } from '@/lib/utils';
import useQuiz from '@/hooks/useQuiz';
import { Card, CardContent, CardTitle } from '@ui/Card';

import QuestionItemListActions from './QuestionItemListActions';

enableReactComponents();
interface Props {
	id: string;
	item: Observable<QuestionType>;
}
const ReactiveCard = reactive(Card);
const QuestionItemList = ({ id, item }: Props) => {
	const { setQuestionUi, ui } = useQuiz();
	return (
		<ReactiveCard
			$className={() =>
				cn(
					'mt-3 transition-colors duration-300 hover:bg-accent',
					ui.questionId.get() === item.id.get() &&
						'bg-card  ring-2 ring-primary dark:bg-slate-900',
				)
			}
		>
			<CardContent className='flex h-32 items-center p-0'>
				<div
					className='flex  w-full flex-col items-center'
					onClick={() => {
						setQuestionUi(item.id.get());
					}}
				>
					<div className='mt-5 shrink-0'>
						<Computed>
							{() => <CardTitle>{item.question.get() || '...'}</CardTitle>}
						</Computed>
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
				<QuestionItemListActions questionId={id} />
			</CardContent>
		</ReactiveCard>
	);
};

export default QuestionItemList;
