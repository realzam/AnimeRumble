'use client';

import { useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { trpc } from '@/trpc/client/client';
import { type serverClient } from '@/trpc/client/serverClient';
import { Pencil } from 'lucide-react';

import { AspectRatio } from '@ui/AspectRatio';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/Card';
import { ScrollArea } from '@ui/ScrollArea';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

import DeleteQuizAlertDialog from './DeleteQuizAlertDialog';
import EmptyQuizzesListView from './EmptyQuizzesListView';

type IQuiz = Awaited<
	ReturnType<(typeof serverClient)['quizz']['getListQuizzes']>
>;

interface Props {
	initialQuizzes: IQuiz;
	type: IQuiz[0]['state'];
}
const QuizzesListView = ({ initialQuizzes, type }: Props) => {
	const router = useRouter();
	const quizzes = trpc.quizz.getListQuizzes.useQuery(undefined, {
		initialData: initialQuizzes,
	});

	const quizzesList = useMemo(
		() => quizzes.data.filter((q) => q.state === type),
		[quizzes.data, type],
	);
	if (quizzesList.length === 0) {
		return <EmptyQuizzesListView />;
	}
	return (
		<ScrollArea className='h-full w-full rounded' type='always'>
			<div className='pr-5'>
				{quizzesList.map((quiz) => (
					<Card
						className='my-4 flex h-36 flex-row overflow-hidden'
						key={quiz.id}
					>
						<div className='relative w-[254px] shrink-0'>
							<AspectRatio ratio={16 / 9}>
								<Image
									src={
										quiz.img ??
										'https://images.unsplash.com/photo-1535025183041-0991a977e25b'
									}
									alt={`Quiz-Anime-${quiz.title}`}
									className='rounded-l-lg object-cover'
									fill
								/>
							</AspectRatio>
							<Badge className='absolute bottom-2 right-2 select-none rounded-full p-1 px-3'>
								{`${quiz.questions.length} pregunta${
									quiz.questions.length > 1 ? 's' : ''
								}`}
							</Badge>
						</div>
						<CardContent className='flex w-full flex-col justify-between p-3'>
							<CardHeader className='flex flex-row items-center justify-between p-0'>
								<CardTitle>{quiz.title}</CardTitle>
								<div>
									<Button
										size='icon'
										variant='ghost'
										onClick={() => {
											router.push('/quiz/' + [quiz.id]);
										}}
									>
										<Pencil />
									</Button>
									<DeleteQuizAlertDialog
										quizId={quiz.id}
										refetch={quizzes.refetch}
									/>
								</div>
							</CardHeader>
							<div>
								<Button className=''>Asignar</Button>
								<Button className='mx-3' variant='outline'>
									Empezar
								</Button>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</ScrollArea>
	);
};

export default QuizzesListView;
