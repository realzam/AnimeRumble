'use client';

import { trpc } from '@/trpc/client/client';
import { type serverClient } from '@/trpc/client/serverClient';

import { AspectRatio } from '@ui/AspectRatio';
import { Card, CardDescription, CardHeader, CardTitle } from '@ui/Card';
import { Input } from '@ui/Input';
import { ScrollArea as UIScrollArea } from '@ui/ScrollArea';
import { Separator } from '@ui/Separator';
import Navbar from '@web/Navbar';

import AnswersTypeContainer from '../AnswersTypeContainer';
import ListQuizzes from '../ListQuizzes';
import { PointsSelect } from '../PointsSelect';
import { TimeSelect } from '../TimeSelect';

interface Props {
	id: string;
	initialQuiz: Awaited<ReturnType<typeof serverClient.quizz.quizz>>;
}

export default function QuizPage({ id, initialQuiz }: Props) {
	const quiz = trpc.quizz.quizz.useQuery(
		{ id },
		{
			initialData: initialQuiz,
		},
	);
	return (
		<>
			<Navbar />
			<div className='container flex h-[calc(100vh-3.5rem-1px)] py-8'>
				<Card className='mr-4 flex h-full w-80 shrink-0 flex-col'>
					<CardHeader>
						<CardTitle>{quiz.data.title}</CardTitle>
						<CardDescription>{quiz.data.description}</CardDescription>
					</CardHeader>
					<Separator />

					<ListQuizzes />
				</Card>
				<Card className='flex flex-1  flex-col p-8'>
					<UIScrollArea className='h-full'>
						<div className='flex min-h-[calc(100vh-12rem)] flex-col justify-between'>
							<div className='p-1'>
								<Input
									className='h-11 text-center text-2xl'
									id='question'
									placeholder='Escribe tu pregunta'
									name='question'
									value={quiz.data.questions[0].question}
								/>
							</div>
							<div className='my-5 flex h-80 items-center justify-between'>
								<TimeSelect />
								<Card className='w-full bg-neutral-100 dark:bg-slate-900'>
									<AspectRatio ratio={16 / 9} />
								</Card>
								<PointsSelect />
							</div>
							<AnswersTypeContainer />
						</div>
					</UIScrollArea>
				</Card>
			</div>
		</>
	);
}
