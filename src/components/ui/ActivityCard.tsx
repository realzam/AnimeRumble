import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Card } from './Card';

import { cn } from '@/lib/utils';

// container > card > circle > overlay

type Colors = 'quiz' | 'loteria' | 'bingo';
interface Props {
	title: string;
	route: string;
	colorName?: Colors;
	src: string;
}

function changeFAColor(color: Colors): [string, string, string, string] {
	switch (color) {
		case 'quiz':
			return [
				'bg-quiz',
				'group-hover:after:bg-quiz-light',
				'border-quiz',
				'group-hover:border-quiz-light',
			];
		case 'loteria':
			return [
				'bg-loteria',
				'group-hover:after:bg-loteria-light',
				'border-loteria',
				'group-hover:border-loteria-light',
			];
		case 'bingo':
			return [
				'bg-bingo',
				'group-hover:after:bg-bingo-light',
				'border-bingo',
				'group-hover:border-bingo-light',
			];
		default:
			return ['bg-quiz', 'bg-quiz-light', 'border-quiz', 'border-quiz-light'];
	}
}

const ActivityCard = React.forwardRef<HTMLDivElement, Props>(
	({ route, title, colorName = 'quiz', src, ...props }, ref) => {
		const [bg, bgLight, br, brLight] = changeFAColor(colorName);
		return (
			<Link href={route}>
				<div
					ref={ref}
					{...props}
					className='group flex h-72 transition-all ease-out duration-300 hover:scale-105 hover:-translate-y-1.5'
				>
					{/* card */}
					<Card className='relative flex flex-col items-center justify-center w-full overflow-hidden transition-all duration-300 shadow-lg dark:bg-neutral-900'>
						{/* circle */}
						<div
							className={cn(
								'rounded-full flex after:h-28 after:absolute after:w-28 items-center bg-transparent border-2 box-content h-36 justify-center relative ease-out duration-300 w-36 z-[1] after:rounded-full after:block after:transition-all after:duration-300',
								br,
								brLight,
								bgLight,
							)}
						>
							{/* overlay */}
							<div
								className={cn(
									'rounded-full h-28 absolute w-28 group-hover:scale-[6] origin-center z-0 ease-out duration-500',
									bg,
								)}
							/>

							<Image
								className='z-10'
								alt='AnimeRumbleIcon'
								src={src}
								width={100}
								height={100}
								priority
								{...props}
							/>
						</div>
						<span className='text-xl font-bold mt-7 z-[100] group-hover:text-slate-100'>
							{title}
						</span>
					</Card>
				</div>
			</Link>
		);
	},
);
ActivityCard.displayName = 'ActivityCard';

export default ActivityCard;
