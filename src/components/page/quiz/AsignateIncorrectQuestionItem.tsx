import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AlertCircle } from 'lucide-react';

import { type QuestionType } from '@/types/quizQuery';
import animeRumbleRoutes from '@/lib/routes';
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@ui/Accordion';
import { AspectRatio } from '@ui/AspectRatio';
import { Badge } from '@ui/Badge';
import { Button } from '@ui/Button';

interface Props {
	quizID: string;
	question: QuestionType;
	index: number;
}
const AsignateIncorrectQuestionItem = ({ question, index, quizID }: Props) => {
	const router = useRouter();
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
							{question.img ? (
								<Image
									alt={question.question}
									src={question.img}
									className='object-cover'
									fill
								/>
							) : (
								<div className='h-full w-full bg-slate-700' />
							)}
						</AspectRatio>
					</div>
					<div className='flex flex-col justify-between'>
						<Badge className='w-fit' variant='secondary'>
							{question.questionType == 'Multiple'
								? 'Muiltiple'
								: 'Verdadero o Falso'}
						</Badge>
						<Button
							variant='outline'
							className='w-fit border-destructive hover:bg-destructive/20'
							onClick={() => {
								router.push(
									animeRumbleRoutes.createQuiz + quizID + '?index=' + index,
								);
							}}
						>
							Arreglar
						</Button>
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
