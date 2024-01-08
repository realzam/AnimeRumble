import Image from 'next/image';
import { AlertCircle } from 'lucide-react';

import { type QuestionType } from '@/types/quizQuery';
import useQuiz from '@/hooks/useQuiz';
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@ui/Accordion';
import { AspectRatio } from '@ui/AspectRatio';
import { Badge } from '@ui/Badge';
import { Button } from '@ui/Button';
import { DialogClose } from '@/components/ui/Dialog';

interface Props {
	question: QuestionType;
	index: number;
}
const AsignateIncorrectQuestionItem = ({ question, index }: Props) => {
	const { ui } = useQuiz();
	return (
		<AccordionItem value={question.id}>
			<AccordionTrigger className='text-destructive'>
				<div className='flex items-center'>
					<AlertCircle className='mr-1 text-destructive' />
					<div>{`${index + 1}.-`}</div>
					<div className='ml-1 text-base font-bold'>{question.question}</div>
				</div>
			</AccordionTrigger>
			<AccordionContent className='flex flex-col'>
				<div className='my-2 flex'>
					<div className='mr-2 w-48 shrink-0'>
						<AspectRatio ratio={16 / 9}>
							<div className='h-full w-full overflow-hidden rounded-sm'>
								<Image
									alt={question.question}
									src={question.img || '/images/noImage.jpg'}
									className='object-cover'
									fill
								/>
							</div>
						</AspectRatio>
					</div>
					<div className='flex flex-col justify-between'>
						<Badge className='w-fit' variant='default'>
							{question.questionType == 'Multiple'
								? 'Muiltiple'
								: 'Verdadero o Falso'}
						</Badge>
						<DialogClose asChild>
							<Button
								variant='outline'
								className='w-fit border-destructive hover:bg-destructive/20'
								onClick={() => {
									{
										ui.scrollForce.set(true);
										ui.scrollToQuestion.set(question.id);
									}
								}}
							>
								Arreglar
							</Button>
						</DialogClose>
					</div>
				</div>
				<div className='flex flex-col'>
					{question.errors.map((e, i) => (
						<div
							key={`${question.id}-error-${i}`}
							className='m-1 text-destructive'
						>
							{e}
						</div>
					))}
				</div>
			</AccordionContent>
		</AccordionItem>
	);
};

export default AsignateIncorrectQuestionItem;
