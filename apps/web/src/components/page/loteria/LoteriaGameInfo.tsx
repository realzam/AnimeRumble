import Image from 'next/image';
import { Memo } from '@legendapp/state/react';

import { cn, getStyleClassCardFit } from '@/lib/utils';
import usePlayLoteriaUI from '@/hooks/usePlayLoteriaUI';
import { Progress } from '@ui/Progress';
import { AspectRatio } from '@/components/ui/AspectRatio';
import { Card, CardHeader, CardTitle } from '@/components/ui/Card';

const LoteriaGameInfo = () => {
	const { currentCard, updateProgress, passCards, winnersList } =
		usePlayLoteriaUI();
	return (
		<Card className='relative mx-auto shrink-0'>
			<Memo>
				{() => (
					<Progress
						className='absolute top-0 w-full'
						value={updateProgress.get()}
					/>
				)}
			</Memo>

			<CardHeader className='m-0 py-4'>
				<div className='flex space-x-5'>
					<Memo>
						{() => (
							<div>
								<CardTitle>Carta actual:</CardTitle>
								<Card className='w-28 shrink-0 overflow-hidden'>
									<AspectRatio ratio={3 / 5}>
										<Image
											alt={currentCard.title.get()}
											src={currentCard.img.get()}
											className={cn(
												'rounded-sm',
												getStyleClassCardFit(currentCard.fit.get()),
											)}
											sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
											fill
											priority
											draggable='false'
										/>
										<div className='absolute bottom-0 w-full bg-slate-900/80 px-3 text-center text-2xs font-semibold capitalize tracking-wider text-white backdrop-blur-sm xs:text-xs sm:text-sm'>
											{currentCard.title.get()}
										</div>
									</AspectRatio>
								</Card>
							</div>
						)}
					</Memo>

					<Card className='w-28 shrink-0 border-2 border-dashed border-primary bg-slate-100 shadow-none dark:bg-slate-950'>
						<AspectRatio
							ratio={3 / 5}
							className='flex flex-col items-center justify-center space-y-2 text-center'
						>
							<CardTitle className='leading-loose tracking-wide'>
								Cartas Faltantes:
							</CardTitle>
							<CardTitle>
								<Memo>{passCards}</Memo>
							</CardTitle>
						</AspectRatio>
					</Card>

					<div>
						<CardTitle>Podio:</CardTitle>
						<div className='mt-2 shrink-0 space-y-3'>
							{winnersList.get().map(({ player }, i) => (
								<div
									key={player.id}
									className='w-fit rounded-full bg-slate-800 p-2 px-4'
								>{`${i + 1}° ${player.nickName}`}</div>
							))}
						</div>
					</div>
				</div>
			</CardHeader>
			{/* <CardContent className='flex flex-wrap justify-center p-1'></CardContent> */}
		</Card>
	);
};

export default LoteriaGameInfo;
