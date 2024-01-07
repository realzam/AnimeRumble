import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Pencil, Trash2 } from 'lucide-react';

import { type QuizDataType } from '@/types/quizQuery';
import animeRumbleRoutes from '@/lib/routes';
import useDashboardQuizzes from '@/hooks/useDashboardQuizzes';
import { AspectRatio } from '@ui/AspectRatio';
import { Badge } from '@ui/Badge';
import { Card, CardContent, CardHeader, CardTitle } from '@ui/Card';
import { Button } from '@/components/ui/Button';

interface Props {
	quiz: QuizDataType;
}
const QuizDraftItem = ({ quiz }: Props) => {
	const router = useRouter();
	const { openDeleteDialog, openAsignateDialog } = useDashboardQuizzes();
	return (
		<Card className='my-4 flex h-36 flex-row overflow-hidden' key={quiz.id}>
			<div className='relative w-[254px] shrink-0'>
				<AspectRatio ratio={16 / 9}>
					<Image
						src={quiz.img ?? '/svg/quiz_placeholder.svg'}
						alt={`Quiz-Anime-${quiz.title}`}
						className='rounded-l-lg bg-neutral-200 object-cover dark:bg-slate-900'
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
								router.push(animeRumbleRoutes.createQuiz + quiz.id);
							}}
						>
							<Pencil />
						</Button>

						<Button
							onClick={() => openDeleteDialog(quiz)}
							size='icon'
							variant='destructive'
							className='ml-3'
						>
							<Trash2 />
						</Button>
					</div>
				</CardHeader>
				<div>
					<Button
						variant='gradient'
						onClick={() => {
							openAsignateDialog(quiz);
						}}
					>
						Asignar
					</Button>
				</div>
			</CardContent>
		</Card>
	);
};

export default QuizDraftItem;
