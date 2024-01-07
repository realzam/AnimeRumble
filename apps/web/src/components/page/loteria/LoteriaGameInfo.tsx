import Image from 'next/image';
import { Memo, Show, useComputed } from '@legendapp/state/react';

import { cn, getStyleClassCardFit } from '@/lib/utils';
import usePlayLoteria from '@/hooks/usePlayLoteria';
import usePlayLoteriaUI from '@/hooks/usePlayLoteriaUI';
import { Badge } from '@ui/Badge';
import { Progress } from '@ui/Progress';
import { AspectRatio } from '@/components/ui/AspectRatio';
import { Card, CardTitle } from '@/components/ui/Card';

const LoteriaGameInfo = () => {
	const { currentCard, updateProgress, passCards, winnersList } =
		usePlayLoteriaUI();
	const { userInfo } = usePlayLoteria();
	const showPodio = useComputed(() => winnersList.get().length > 0);
	return (
		<Card className='relative mx-auto grid w-full max-w-[450px] grid-cols-3 gap-4 p-2 pt-3'>
			<Memo>
				{() => (
					<Progress
						className='absolute top-0 w-full'
						value={updateProgress.get()}
					/>
				)}
			</Memo>
			<Memo>
				{() => (
					<Card className='col-span-1 overflow-hidden'>
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
				)}
			</Memo>
			<div className='col-span-1'>
				<Show if={showPodio}>
					<>
						<CardTitle>Podio:</CardTitle>
						<div className='mt-2 flex shrink-0 flex-col space-y-3'>
							{winnersList.get().map(({ player }, i) => (
								<Memo key={player.id}>
									{() => (
										<Badge
											variant={
												player.id === userInfo.get()!.userId
													? 'default'
													: 'secondary'
											}
											className='w-fit text-xs xs:text-base'
										>{`${i + 1}° ${player.nickName}`}</Badge>
									)}
								</Memo>
							))}
						</div>
					</>
				</Show>
			</div>

			<Card className='border-2 border-dashed border-primary bg-slate-100 shadow-none dark:bg-slate-950'>
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
		</Card>
	);
};

export default LoteriaGameInfo;
