import Image from 'next/image';

import usePlayQuiz from '@/hooks/usePlayQuiz';
import { AspectRatio } from '@/components/ui/AspectRatio';
import { Button } from '@/components/ui/Button';
import {
	Card,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/Card';

const PlayQuizStartScreen = () => {
	const { quiz, joinToQuiz } = usePlayQuiz();
	return (
		<div className='flex h-all w-full items-center justify-center'>
			<Card className='flex w-full flex-col shadow-lg xs:w-[400px] 2md:w-[450px]'>
				<CardHeader className='p-2 xs:p-6'>
					<AspectRatio ratio={16 / 9}>
						<div className='relative h-full w-full overflow-hidden rounded-sm'>
							<Image
								alt={quiz.title}
								src={quiz.img || '/svg/quiz_placeholder.svg'}
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
								fill
								priority
							/>
						</div>
					</AspectRatio>
					<CardTitle className='mx-auto text-xl'>{quiz.title}</CardTitle>
					<CardDescription className='text-justify text-base'>
						{quiz.description}
					</CardDescription>
				</CardHeader>
				<CardFooter>
					<Button
						variant='gradient'
						className='mx-auto'
						onClick={() => joinToQuiz()}
					>
						Contestar
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
};

export default PlayQuizStartScreen;
