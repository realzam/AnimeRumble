import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { PartyPopper } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@ui/Button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@ui/Dialog';

import { Card } from '../ui/Card';

interface PropsCard {
	title: string;
	icon: string;
	className?: string;
	link: string;
}
const AtivityCardAdmin = ({ title, className, icon, link }: PropsCard) => {
	return (
		<Link href={link}>
			<Card
				className={cn(
					'flex h-36 cursor-pointer flex-col items-center justify-center transition-all duration-300 hover:scale-105 hover:ring-2',
					className,
				)}
			>
				<Image
					className='z-10 h-20 w-20'
					alt='AnimeRumbleIcon'
					src={icon}
					width={100}
					height={100}
					priority
				/>
				<div className='mt-2 text-xl font-semibold capitalize tracking-widest'>
					{title}
				</div>
			</Card>
		</Link>
	);
};

const StartActivityDialog = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant='gradient' className='mb-4 ml-2'>
					<PartyPopper className='mr-2 h-6 w-6' />
					Iniciar Actividad
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Selecciona una Actividad</DialogTitle>
					<DialogDescription>
						<div className='mt-3 grid grid-cols-2 gap-2'>
							<AtivityCardAdmin
								icon='/svg/loteria_icon.svg'
								title='Loteria'
								className='col-span-1 ring-animePurple hover:bg-animePurple'
								link='/host?activity=loteria'
							/>
							<AtivityCardAdmin
								icon='/svg/bingo_icon.svg'
								title='Bingo'
								className='col-span-1 ring-animeRed hover:bg-animeRed'
								link='/host?activity=bingo'
							/>
							<AtivityCardAdmin
								icon='/svg/loteria_icon.svg'
								title='Anime Rumble'
								className='col-span-2 ring-animeYellow hover:bg-animeYellow'
								link='/host?activity=rumble'
							/>
						</div>
					</DialogDescription>
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
};

export default StartActivityDialog;
