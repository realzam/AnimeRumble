import React from 'react';
import Image from 'next/image';
import NextLink from 'next/link';

import animeRumbleRoutes from '@/lib/routes';
import { Button } from '@ui/Button';

interface Props {
	active?: 'quizz' | 'bingo' | 'loteria' | 'users';
}
const Sidebar = ({ active = 'quizz' }: Props) => {
	return (
		<div className='space-y-4 py-4 pb-12'>
			<div className='px-3 py-2'>
				<h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>
					Actividades
				</h2>
				<div className='space-y-1'>
					<Button
						variant={active === 'quizz' ? 'secondary' : 'ghost'}
						className='w-full justify-start'
						asChild
					>
						<NextLink href={animeRumbleRoutes.dashboardQuizzes}>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='mr-2 h-4 w-4'
							>
								<circle cx='12' cy='12' r='10' />
								<polygon points='10 8 16 12 10 16 10 8' />
							</svg>
							Quizzes
						</NextLink>
					</Button>
					<Button
						variant={active === 'bingo' ? 'secondary' : 'ghost'}
						className='w-full justify-start'
						asChild
					>
						<NextLink href={animeRumbleRoutes.dashboardBingo}>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='mr-2 h-4 w-4'
							>
								<rect width='7' height='7' x='3' y='3' rx='1' />
								<rect width='7' height='7' x='14' y='3' rx='1' />
								<rect width='7' height='7' x='14' y='14' rx='1' />
								<rect width='7' height='7' x='3' y='14' rx='1' />
							</svg>
							Bingo
						</NextLink>
					</Button>
					<Button
						variant={active === 'loteria' ? 'secondary' : 'ghost'}
						className='w-full justify-start'
						asChild
					>
						<NextLink href={animeRumbleRoutes.dashboardLoteria}>
							<Image
								alt='AnimeRumbleIcon'
								src='/svg/loteria.svg'
								// {...props}
								width={24}
								height={24}
							/>
							Lotería
						</NextLink>
					</Button>

					<Button
						variant={active === 'users' ? 'secondary' : 'ghost'}
						className='w-full justify-start'
						asChild
					>
						<NextLink href={animeRumbleRoutes.dashboardConfig}>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='mr-2 h-4 w-4'
							>
								<path d='M4.9 19.1C1 15.2 1 8.8 4.9 4.9' />
								<path d='M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5' />
								<circle cx='12' cy='12' r='2' />
								<path d='M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5' />
								<path d='M19.1 4.9C23 8.8 23 15.1 19.1 19' />
							</svg>
							Usuarios
						</NextLink>
					</Button>
				</div>
			</div>

			<div className='px-3 py-2'>
				<h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>
					Configuraciones
				</h2>
			</div>
		</div>
	);
};

export default Sidebar;
