import React from 'react';
import Image from 'next/image';
import { Memo } from '@legendapp/state/react';
import { Pause, Play, SkipForward } from 'lucide-react';

import { getStyleClassCardFit } from '@/lib/utils';
import useHostLoteria from '@/hooks/useHostLoteria';
import { AspectRatio } from '@/components/ui/AspectRatio';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Progress } from '@/components/ui/Progress';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { Separator } from '@/components/ui/Separator';

const HostLoteriaCardsCarousel = () => {
	return (
		<div className='grid h-72 grid-cols-5 gap-3'>
			<PassCardsLoteria />
			<CurrentLoteria />
			<NextCardsLoteria />
		</div>
	);
};

const PassCardsLoteria = () => {
	const { cardsPassed } = useHostLoteria();
	return (
		<Card>
			<CardHeader>
				<CardTitle>Cartas que pasaron</CardTitle>
			</CardHeader>
			<CardContent className='p-1 pb-4'>
				<ScrollArea className='h-72 w-full px-5' type='always'>
					{cardsPassed.map((card) => (
						<>
							<div className='flex items-center space-x-3'>
								<Card className='w-1/3 overflow-hidden rounded-sm'>
									<AspectRatio ratio={3 / 5}>
										<Image alt='up' src={card.img} fill />
									</AspectRatio>
								</Card>
								<div key={card.id} className='text-sm'>
									{card.title}
								</div>
							</div>
							<Separator className='my-2' />
						</>
					))}
				</ScrollArea>
			</CardContent>
		</Card>
	);
};

const CurrentLoteria = () => {
	const {
		currentCard,
		nextCard,
		cardsMissed,
		togglePauseLoteria,
		updateProgress,
		isPaused,
		cards,
		winnersList,
	} = useHostLoteria();
	return (
		<div className='col-span-3 grid grid-cols-3 gap-2'>
			<Card className='relative col-span-2 flex flex-col items-center justify-center space-y-2 p-2'>
				<Memo>
					{() => (
						<Progress className='absolute top-0' value={updateProgress.get()} />
					)}
				</Memo>
				<Card className='flex w-[180px] bg-primary p-2'>
					<AspectRatio ratio={3 / 5}>
						<div className='relative h-full overflow-hidden rounded-sm'>
							<Image
								alt={cards[currentCard].title}
								src={cards[currentCard].img}
								className={getStyleClassCardFit(cards[currentCard].fit)}
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
								fill
								priority
							/>
							<div className='absolute bottom-0 w-full bg-slate-900/70 text-center text-white'>
								{`${cards[currentCard].index}. ${cards[currentCard].title}`}
							</div>
						</div>
					</AspectRatio>
				</Card>
				<div className='flex space-x-2'>
					<Button
						variant='ghost'
						size='icon'
						onClick={() => togglePauseLoteria()}
					>
						{isPaused ? (
							<Play className='fill-current' />
						) : (
							<Pause className='fill-current' />
						)}
					</Button>
					{cardsMissed.length > 0 && (
						<Button variant='ghost' size='icon' onClick={() => nextCard()}>
							<SkipForward className='fill-current' />
						</Button>
					)}
				</div>
			</Card>
			<Memo>
				{() => (
					<Card className='col-span-1'>
						<CardHeader>
							<CardTitle>Podio:</CardTitle>
						</CardHeader>
						<CardContent className='p-1 pb-4'>
							<ScrollArea className='h-72 w-full px-5' type='always'>
								<div className='flex h-full flex-col space-y-3'>
									{winnersList.get().map(({ player }, i) => (
										<Badge className='text-base' key={player.id}>{`${i + 1}° ${
											player.nickName
										}`}</Badge>
									))}
								</div>
							</ScrollArea>
						</CardContent>
					</Card>
				)}
			</Memo>
		</div>
	);
};

const NextCardsLoteria = () => {
	const { cardsMissed } = useHostLoteria();
	return (
		<Card className='flex items-center justify-center p-2'>
			<Card className='w-[150px] border-2 border-dashed border-primary bg-slate-100 shadow-none dark:bg-slate-950'>
				<AspectRatio
					ratio={3 / 5}
					className='flex flex-col items-center justify-center space-y-2'
				>
					<CardTitle className='text-center'>Cartas Faltantes:</CardTitle>
					<CardTitle>{cardsMissed.length}</CardTitle>
				</AspectRatio>
			</Card>
		</Card>
	);
};

export default HostLoteriaCardsCarousel;
