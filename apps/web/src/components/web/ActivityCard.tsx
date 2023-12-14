import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';

import { Card } from '@ui/Card';

const circleColorsVariants = cva(
	'relative z-[1] box-content flex h-36 w-36 items-center justify-center rounded-full border-2 bg-transparent duration-300 ease-out after:absolute after:block after:h-28 after:w-28 after:rounded-full after:transition-all after:duration-300',
	{
		variants: {
			color: {
				purple:
					'border-animePurple group-hover:border-animePurple-light group-hover:after:bg-animePurple-light',
				red: 'border-animeRed group-hover:border-animeRed-light group-hover:after:bg-animeRed-light',
				yellow:
					'border-animeYellow group-hover:border-animeYellow-light group-hover:after:bg-animeYellow-light',
			},
		},
		defaultVariants: {
			color: 'purple',
		},
	},
);

const overlayColorsVariants = cva(
	'absolute z-0 h-28 w-28 origin-center rounded-full duration-500 ease-out group-hover:scale-[6] sm:group-hover:scale-[7] md:group-hover:scale-[6]',
	{
		variants: {
			color: {
				purple: 'bg-animePurple',
				red: 'bg-animeRed',
				yellow: 'bg-animeYellow',
			},
		},
		defaultVariants: {
			color: 'purple',
		},
	},
);

type ActivityCardProps = VariantProps<typeof circleColorsVariants> & {
	title: string;
	route: string;
	icon: string;
};

const ActivityCard = ({ title, color, route, icon }: ActivityCardProps) => {
	return (
		<Link href={route}>
			<div className='group flex h-72 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-105'>
				<Card className='relative flex w-full flex-col items-center justify-center overflow-hidden shadow-lg transition-all duration-300'>
					{/* circle */}
					<div className={circleColorsVariants({ color })}>
						{/* overlay */}
						<div className={overlayColorsVariants({ color })} />
						{/* Icon */}
						<Image
							className='z-10'
							alt='AnimeRumbleIcon'
							src={icon}
							width={100}
							height={100}
							priority
						/>
					</div>
					<span className='text-xl z-[11] mt-7 font-semibold tracking-widest group-hover:text-slate-100'>
						{title}
					</span>
				</Card>
			</div>
		</Link>
	);
};

export default ActivityCard;
