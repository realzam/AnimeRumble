import React from 'react';
import Image from 'next/image';
import { Pause, SkipForward } from 'lucide-react';

import useHostLoteria from '@/hooks/useHostLoteria';
import { AspectRatio } from '@/components/ui/AspectRatio';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
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
					{cardsPassed.reverse().map((card) => (
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
	const { currentCard, game, nextCard } = useHostLoteria();
	return (
		<Card className='col-span-3 flex flex-col items-center justify-center space-y-2 p-2'>
			<Card className='flex w-[180px] bg-primary p-2'>
				<AspectRatio ratio={3 / 5}>
					<div className='relative h-full overflow-hidden rounded-sm'>
						<Image
							alt='up'
							src={game.cards[currentCard].img}
							className={game.cards[currentCard].fit}
							fill
						/>
						<div className='absolute bottom-0 w-full bg-slate-900/70 text-center text-white'>
							{`${game.cards[currentCard].index}. ${game.cards[currentCard].title}`}
						</div>
					</div>
				</AspectRatio>
			</Card>
			<div className='flex space-x-2'>
				<Button variant='ghost' size='icon'>
					<Pause className='fill-current' />
				</Button>
				<Button variant='ghost' size='icon' onClick={() => nextCard()}>
					<SkipForward className='fill-current' />
				</Button>
			</div>
		</Card>
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
					<CardTitle>Cartas Faltantes:</CardTitle>
					<CardTitle>{cardsMissed.length}</CardTitle>
				</AspectRatio>
			</Card>
		</Card>
	);
};

export default HostLoteriaCardsCarousel;
