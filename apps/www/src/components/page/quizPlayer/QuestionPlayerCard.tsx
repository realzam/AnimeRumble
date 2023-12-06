'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { AspectRatio } from '@radix-ui/react-aspect-ratio';

import { type QuizzesPlayerDataType } from '@/types/quizQuery';
import animeRumbleRoutes from '@/lib/routes';
import { Button } from '@ui/Button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardTitle,
} from '@ui/Card';

interface Props {
	quiz: QuizzesPlayerDataType[0];
}
const QuestionPlayerCard = ({ quiz }: Props) => {
	const router = useRouter();
	return (
		<Card className='overflow-hidden shadow-lg'>
			<div className='w-full'>
				<AspectRatio ratio={16 / 9}>
					<Image alt={quiz.title} src={quiz.img || ''} fill />
					<div className='absolute bottom-0 w-full bg-slate-900/60 px-3 text-center font-semibold capitalize text-white backdrop-blur-sm'>
						{quiz.title}
					</div>
				</AspectRatio>
			</div>
			<CardContent className='mt-2 flex w-full items-center justify-between px-2'>
				<div className='flex flex-col items-center'>
					<p className='font-semibold'>{quiz.questions.length}</p>
					<p className='text-primary dark:text-primary-light'>Preguntas</p>
				</div>
				<div className='flex flex-col items-center'>
					<p className='font-semibold'>0d 59m 60s</p>
					<p className='text-primary dark:text-primary-light'>Tiempo</p>
					<p className='text-primary dark:text-primary-light'>restante</p>
				</div>
				<div className='flex flex-col items-center'>
					<p className='font-semibold'>{quiz.questions.length}</p>
					<p className='text-primary dark:text-primary-light'>Repuestas</p>
					<p className='text-primary dark:text-primary-light'>enviadas</p>
				</div>
			</CardContent>

			<CardFooter className='flex flex-col items-start'>
				<CardTitle>Descripcción</CardTitle>
				<CardDescription>{quiz.description}</CardDescription>
				<Button
					variant='gradient'
					className='mt-2 w-full'
					onClick={() => {
						router.push(animeRumbleRoutes.playQuiz + '/' + quiz.id);
					}}
				>
					Contestar
				</Button>
			</CardFooter>
		</Card>
	);
};

export default QuestionPlayerCard;
