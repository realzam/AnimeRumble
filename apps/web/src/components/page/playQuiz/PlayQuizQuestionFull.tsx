import Image from 'next/image';
import { Memo, Show, useComputed } from '@legendapp/state/react';

import usePlayQuiz from '@/hooks/usePlayQuiz';
import { Card } from '@/components/ui/Card';
import { ScrollArea } from '@/components/ui/ScrollArea';

import CorrectAnswersNotification from './questionFull/CorrectAnswersNotification';
import LoadingAnswerDialog from './questionFull/LoadingAnswerDialog';
import PlayerAnswerCard from './questionFull/PlayerAnswerCard';
import PlayerAnswerTFCard from './questionFull/PlayerAnswerTFCard';
import RemainTimeProgressBar from './questionFull/RemainTimeProgressBar';
import WrongAnswersNotification from './questionFull/WrongAnswersNotification';

const PlayQuizQuestionFull = () => {
	const { questionUser, quiz, showCorrectAnswer, isCorrectAnswer } =
		usePlayQuiz();
	const isMultiple = useComputed(
		() => questionUser.questionType.get() === 'Multiple',
	);
	return (
		<div className='relative h-all'>
			<LoadingAnswerDialog />
			<Show if={showCorrectAnswer}>
				<Show if={isCorrectAnswer} else={<WrongAnswersNotification />}>
					<CorrectAnswersNotification />
				</Show>
			</Show>
			<RemainTimeProgressBar />
			<div className='h-[calc(100vh-3.5rem-1px)] w-full'>
				<div className='h-5' />
				<ScrollArea
					className='h-[calc(100vh-3.5rem-1px-1.25rem)]'
					type='always'
				>
					<div className='mx-auto flex max-w-[1200px] flex-col justify-between sm:px-4 2md:px-6'>
						<div className='flex items-center'>
							<div className='flex w-14 shrink-0 items-center justify-center font-semibold text-white'>
								<Memo>
									{() => (
										<>
											{questionUser.position.get() + 1}/{quiz.questions.length}
										</>
									)}
								</Memo>
							</div>
							<div className='grow px-3 text-center text-xs font-semibold sm:text-base 2md:text-2xl'>
								<Memo>{() => <>{questionUser.question.get()}</>}</Memo>
							</div>
							<div className='w-14 shrink-0 text-center text-sm font-semibold md:text-base'>
								1000 puntos
							</div>
						</div>

						<div className='my-4 flex h-fit items-center justify-center'>
							<Card
								className='relative overflow-hidden'
								style={{
									height:
										'min((100vh - 3.5rem - 1px) * 0.5 - 24px,(100vw - 4rem - 24px) * 0.5625)',
									width:
										'min(100vw - 4rem - 24px,((100vh - 3.5rem - 1px) * 0.5 - 24px) * 1.7777776 )',
								}}
							>
								{questionUser.img.get() && (
									<Image
										alt={questionUser.question.get()}
										src={questionUser.img.get()}
										sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
										fill
										priority
									/>
								)}
							</Card>
						</div>

						<div className='flex items-center'>
							<div className='my-auto grid w-full grid-cols-2 gap-3'>
								<Show
									if={isMultiple}
									else={
										<>
											<PlayerAnswerTFCard variantTrue />
											<PlayerAnswerTFCard variantTrue={false} />
										</>
									}
								>
									{questionUser.answers
										.get()
										.filter((q) => q !== '')
										.map((qq, i) => (
											<PlayerAnswerCard
												key={`${i}-${qq}`}
												index={i}
												question={qq}
											/>
										))}
								</Show>
							</div>
						</div>
					</div>
				</ScrollArea>
			</div>
		</div>
	);
};

export default PlayQuizQuestionFull;
