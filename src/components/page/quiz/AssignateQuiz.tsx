import { useRouter } from 'next/navigation';
import { AlertCircle } from 'lucide-react';

import { type QuestionType, type QuizDataType } from '@/types/quizQuery';
import animeRumbleRoutes from '@/lib/routes';
import { cn } from '@/lib/utils';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@ui/Accordion';
import { Button } from '@ui/Button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@ui/Dialog';
import { AspectRatio } from '@/components/ui/AspectRatio';
import { Badge } from '@/components/ui/Badge';

interface Props {
	quiz: QuizDataType;
	refetch: () => void;
}

interface PropsItem {
	quizID: string;
	question: QuestionType;
	index: number;
}

const AssignateQuiz = ({ refetch, quiz }: Props) => {
	const router = useRouter();
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant='gradient'
					onClick={async () => {
						refetch();
					}}
				>
					Asignar
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>
						Make changes to your profile here. Click save when youre done.
					</DialogDescription>
				</DialogHeader>
				<Accordion type='single' collapsible>
					{quiz.questions.map((q, index) =>
						// <div key={q.id}>{q.question}</div>
						q.hasError ? (
							<InvalidQuestionItem
								key={q.id}
								question={q}
								index={index}
								quizID={quiz.id}
							/>
						) : (
							<ValidQuestionItem
								key={q.id}
								question={q}
								index={index}
								quizID={quiz.id}
							/>
						),
					)}
				</Accordion>

				<DialogFooter>
					{quiz.questions.some((q) => q.hasError) ? (
						<Button
							variant='destructive'
							type='submit'
							onClick={() => {
								router.push(
									animeRumbleRoutes.createQuiz +
										quiz.id +
										'?index=' +
										quiz.questions.findIndex((q) => q.hasError),
								);
							}}
						>
							Arreglar
						</Button>
					) : (
						<Button variant='gradient' type='submit'>
							Asignar
						</Button>
					)}
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};

const ValidQuestionItem = ({ question: q, index, quizID }: PropsItem) => {
	const router = useRouter();
	return (
		<AccordionItem value={q.id}>
			<AccordionTrigger>
				<div className='flex items-center'>
					<div>{`${index + 1}.-`}</div>
					<div className='ml-1 text-base font-bold'>{q.question}</div>
				</div>
			</AccordionTrigger>
			<AccordionContent className='flex flex-col'>
				<div className='my-2 flex'>
					<div className='mr-2 w-48 shrink-0'>
						<AspectRatio ratio={16 / 9}>
							<div className='h-full w-full bg-blue-500'></div>
						</AspectRatio>
					</div>
					<div className='flex flex-col justify-between'>
						<Badge variant='secondary' className='w-fit'>
							{q.questionType == 'Multiple' ? 'Muiltiple' : 'Verdadero o Falso'}
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
					{q.questionType === 'Multiple' ? (
						<>
							<div>Respuestas</div>
							{q.answers.map((ans, i) => (
								<div
									key={`${q.id}-answers-${i}`}
									className={cn(
										'm-1',
										q.correctAnswers[i] && 'text-base font-bold text-green-800',
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
								{q.correctAnswerTF ? 'Verdadero' : 'Falso'}
							</div>
						</div>
					)}
				</div>
			</AccordionContent>
		</AccordionItem>
	);
};
const InvalidQuestionItem = ({ question: q, index, quizID }: PropsItem) => {
	const router = useRouter();
	return (
		<AccordionItem value={q.id}>
			<AccordionTrigger className='text-destructive'>
				<div className='flex items-center'>
					<AlertCircle className='mr-1 text-destructive' />
					<div>{`${index + 1}.-`}</div>
					<div className='ml-1 text-base font-bold'>{q.question}</div>
				</div>
			</AccordionTrigger>
			<AccordionContent className='flex flex-col'>
				<div className='my-2 flex'>
					<div className='mr-2 w-48 shrink-0'>
						<AspectRatio ratio={16 / 9}>
							<div className='h-full w-full bg-blue-500'></div>
						</AspectRatio>
					</div>
					<div className='flex flex-col justify-between'>
						<Badge className='w-fit' variant='secondary'>
							{q.questionType == 'Multiple' ? 'Muiltiple' : 'Verdadero o Falso'}
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
					{q.errors.map((e, i) => (
						<div key={`${q.id}-error-${i}`} className='m-1 text-destructive'>
							{e}
						</div>
					))}
				</div>
			</AccordionContent>
		</AccordionItem>
	);
};

export default AssignateQuiz;
