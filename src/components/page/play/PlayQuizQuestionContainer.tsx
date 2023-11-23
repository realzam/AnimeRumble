'use client';

// import Image from 'next/image';
import Image from 'next/image';
import {
	Memo,
	reactive,
	Show,
	Switch,
	useComputed,
} from '@legendapp/state/react';

import usePlayQuiz from '@/hooks/usePlayQuiz';
import { Progress } from '@ui/Progress';
import { Card } from '@/components/ui/Card';

import { PlayerAnswerCard, PlayerAnswerTFCard } from './PlayerAnswerCard';

const ReactiveProgress = reactive(Progress);
// import { Card } from '@/components/ui/Card';

// import { PlayerAnswerCard } from './PlayerAnswerCard';

const PlayQuizQuestionContainer = () => {
	const {
		time,
		timeInt,
		showCorrectAnswer,
		isCorrectAnswer,
		question,
		points,
		index,
		questions,
	} = usePlayQuiz();

	const value = useComputed(() => 100 * (time.get() / timeInt));
	// const resTime = useSelector(
	// 	() => (time.get() * 100) / (parseInt(question.time) * 100),
	// );

	return (
		<>
			<div className='container relative mx-auto h-[calc(100vh-3.5rem-1px)]'>
				<Show if={showCorrectAnswer}>
					<Show
						if={isCorrectAnswer}
						else={
							<div className='absolute left-0 z-50 flex h-20 w-full animate-fade-down flex-col items-center justify-center rounded-b bg-red-400 text-lg font-semibold tracking-widest text-white animate-normal animate-once'>
								<Memo>
									{() => (
										<>{time.get() <= 0 ? 'Se acabo el tiempo' : 'Incorrecto'}</>
									)}
								</Memo>
								<div className='rounded-full bg-white px-4 py-1 text-lg text-red-400'>
									No te rindas, tu puedes
								</div>
							</div>
						}
					>
						<div className='absolute left-0 z-50 flex h-20 w-full animate-fade-down flex-col items-center justify-center rounded-b bg-green-400 text-lg font-semibold tracking-widest text-white animate-normal animate-once'>
							<p>Correcto</p>
							<div className='rounded-full bg-white px-4 py-1 text-lg text-green-400'>
								<Switch value={question.points}>
									{{
										standar: () => (
											<>
												+<Memo>{points}</Memo>
											</>
										),
										double: () => (
											<>
												+<Memo>{points}</Memo> (
												<Memo>{() => points.get() * 2}</Memo>x2)
											</>
										),
										none: () => <>+1</>,
										default: () => <></>,
									}}
								</Switch>
							</div>
						</div>
					</Show>
				</Show>

				<ReactiveProgress $value={value} className='absolute left-0 w-full' />

				<div className='h-full'>
					<div className='flex h-[10%] items-center'>
						<div className='flex h-14 w-14 items-center justify-center rounded-full bg-primary font-semibold text-white'>
							{index.get() + 1}/{questions.length}
						</div>
						<div className='grow text-center font-semibold'>
							{question.question}
						</div>
						<div className='w-14 flex-none font-semibold'>1000 puntos</div>
					</div>
					<div className='flex h-[50%] items-center justify-center'>
						<Card
							className='relative overflow-hidden'
							style={{
								height:
									'min((100vh - 3.5rem - 1px) * 0.5 - 24px,(100vw - 4rem - 24px) * 0.5625)',
								width:
									'min(100vw - 4rem - 24px,((100vh - 3.5rem - 1px) * 0.5 - 24px) * 1.7777776 )',
							}}
						>
							{question.img && (
								<Image
									priority
									alt={question.question}
									src={question.img}
									fill
								/>
							)}
						</Card>
					</div>
					<div className='flex h-[40%] items-center'>
						<div className='my-auto grid w-full grid-cols-2 gap-3'>
							<Show if={question.questionType === 'Multiple'}>
								{question.answers
									.filter((q) => q !== '')
									.map((qq, i) => (
										<PlayerAnswerCard
											key={`${i}-${qq}`}
											index={i}
											question={qq}
										/>
									))}
							</Show>

							<Show if={question.questionType === 'TF'}>
								<PlayerAnswerTFCard variantTrue />
								<PlayerAnswerTFCard variantTrue={false} />
							</Show>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default PlayQuizQuestionContainer;
