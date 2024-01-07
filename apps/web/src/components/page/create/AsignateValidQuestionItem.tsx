import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { type QuestionType } from '@/types/quizQuery';
import animeRumbleRoutes from '@/lib/routes';
import { cn } from '@/lib/utils';
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
const AsignateValidQuestionItem = ({ question, index, quizID }: Props) => {
	const router = useRouter();
	return (
		<AccordionItem value={question.id}>
			<AccordionTrigger>
				<div className='flex items-center'>
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
						<Badge variant='secondary' className='w-fit'>
							{question.questionType == 'Multiple'
								? 'Muiltiple'
								: 'Verdadero o Falso'}
						</Badge>
						<Button
							variant='outline'
							className='w-fit'
							onClick={() => {
								router.push(
									animeRumbleRoutes.createQuiz + quizID + '?index=' + index,
								);
							}}
						>
							Modificar
						</Button>
					</div>
				</div>
				<div className='flex flex-col'>
					{question.questionType === 'Multiple' ? (
						<>
							<div>Respuestas</div>
							{question.answers.map((ans, i) => (
								<div
									key={`${question.id}-answers-${i}`}
									className={cn(
										'm-1',
										question.correctAnswers[i] &&
											'text-base font-bold text-green-800',
									)}
								>
									{ans !== '' ? `${i + 1}.- ${ans}` : ''}
								</div>
							))}
						</>
					) : (
						<div className='flex items-center'>
							<div>Respuesta:</div>
							<div className='ml-1 text-base font-bold text-green-800'>
								{question.correctAnswerTF ? 'Verdadero' : 'Falso'}
							</div>
						</div>
					)}
				</div>
			</AccordionContent>
		</AccordionItem>
	);
};

export default AsignateValidQuestionItem;
