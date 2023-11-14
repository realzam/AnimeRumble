import { useRef } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { type Observable } from '@legendapp/state';
import { enableReactComponents } from '@legendapp/state/config/enableReactComponents';
import { Computed, reactive, Show, useMount } from '@legendapp/state/react';
import { AlertCircle } from 'lucide-react';

import { type QuestionType } from '@/types/quizQuery';
import { cn } from '@/lib/utils';
import useQuiz from '@/hooks/useQuiz';
import { Card, CardContent, CardTitle } from '@ui/Card';
import {
	Tooltip,
	TooltipArrow,
	TooltipContent,
	TooltipTrigger,
} from '@ui/Tooltip';

import QuestionItemListActions from './QuestionItemListActions';

enableReactComponents();
interface Props {
	id: string;
	item: Observable<QuestionType>;
}
const ReactiveCard = reactive(Card);
const QuestionItemList = ({ id, item }: Props) => {
	const { setQuestionUi, ui, trpcUtils, props$ } = useQuiz();
	const { attributes, setNodeRef, transform, transition } = useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	const scollToRef = useRef<HTMLDivElement | null>(null);

	useMount(() => {
		if (ui.scroll.get() && ui.scrollToQuestion.get() === id) {
			scollToRef.current?.scrollIntoView();
		}
	});

	return (
		<div className='relative' ref={setNodeRef} style={style} {...attributes}>
			<Show if={item.hasError.get() && item.modified.get()}>
				<Tooltip>
					<TooltipTrigger asChild>
						<div className='absolute right-[-14px] top-[calc(50%-12px)] z-10 flex h-6 w-6 items-center justify-center rounded-full bg-destructive p-[1px]'>
							<AlertCircle className='text-white' />
						</div>
					</TooltipTrigger>
					<TooltipContent side='right' className='bg-destructive'>
						<TooltipArrow className='fill-destructive' />
						<p>Incompleta</p>
					</TooltipContent>
				</Tooltip>
			</Show>
			<ReactiveCard
				ref={scollToRef}
				$className={() =>
					cn(
						'mt-3 overflow-hidden transition-colors duration-300',
						ui.questionId.get() === item.id.get() &&
							'bg-card ring-2 ring-primary dark:bg-slate-900',
					)
				}
			>
				<CardContent className='flex h-32 overflow-hidden p-0'>
					<div
						className='mx-auto flex flex-1 flex-col overflow-hidden hover:bg-accent'
						onClick={() => {
							trpcUtils.client.quizz.setModifiedQuestion
								.mutate({
									questionId: ui.questionId.get(),
								})
								.then(() => {
									props$.refetch();
									setQuestionUi(item.id.get());
								});
						}}
					>
						<div className='mx-5 mt-5'>
							<Computed>
								{() => (
									<CardTitle className='truncate text-center'>
										{item.question.get() || '...'}
									</CardTitle>
								)}
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
		</div>
	);
};

export default QuestionItemList;
