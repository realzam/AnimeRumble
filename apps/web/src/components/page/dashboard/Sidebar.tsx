import NextLink from 'next/link';
import { Dices, Grid3x3 } from 'lucide-react';

import animeRumbleRoutes from '@/lib/routes';
import { Button } from '@ui/Button';
import StartActivityDialog from '@/components/web/StartActivityDialog';

interface Props {
	active?: 'quizz' | 'bingo' | 'loteria' | 'users' | 'rumble';
}
const Sidebar = ({ active = 'quizz' }: Props) => {
	return (
		<div className='space-y-4 py-4 pb-12'>
			<div className='px-3 py-2'>
				<StartActivityDialog />
				<h2 className='mb-2 px-4 text-lg font-semibold tracking-tight'>
					Actividades
				</h2>
				<div className='space-y-1'>
					<Button
						variant={active === 'quizz' ? 'default' : 'ghost'}
						className='w-full justify-start'
						asChild
					>
						<NextLink href={animeRumbleRoutes.dashboardQuizzes}>
							<svg
								fill='none'
								stroke='currentColor'
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								version='1.1'
								viewBox='0 0 24 24'
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								className='mr-2'
							>
								<g transform='matrix(1.47 0 0 1.47 -5.64 -5.71)'>
									<g transform='translate(3.5 .00293)'>
										<path d='m9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3' />
										<path d='m12 17h0.01' />
									</g>
									<g transform='rotate(180 10.2 12)'>
										<path d='m9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3' />
										<path d='m12 17h0.01' />
									</g>
								</g>
							</svg>
							Quizzes
						</NextLink>
					</Button>
					<Button
						variant={active === 'bingo' ? 'default' : 'ghost'}
						className='w-full justify-start'
						asChild
					>
						<NextLink href={animeRumbleRoutes.dashboardBingo}>
							<Grid3x3 className='mr-2' />
							Bingo
						</NextLink>
					</Button>
					<Button
						variant={active === 'loteria' ? 'default' : 'ghost'}
						className='w-full justify-start'
						asChild
					>
						<NextLink href={animeRumbleRoutes.dashboardLoteria}>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='24'
								height='24'
								viewBox='0 0 24 24'
								fill='none'
								stroke='currentColor'
								strokeWidth='2'
								strokeLinecap='round'
								strokeLinejoin='round'
								className='mr-2'
							>
								<g fill='currentColor' stroke='none'>
									<path d='m7.5 1a1 1 0 0 0-1 1v3.09l0.754-0.754a1.5 1.5 0 0 1 1.24-0.422 1.5 1.5 0 0 1 0.00391 0 1.5 1.5 0 0 1 0.00586 0v-0.041a1 1 0 0 1 0.99-0.877h5.01a1 1 0 0 1 1 1v6.46l2 2v-10.5a1 1 0 0 0-1-1h-9z' />
									<path d='m18 4.04v2.31l1.86 1.07 0.00977 0.00586a1 1 0 0 1 0.305 1.22l-2.18 3.77v0.559l1.26 1.26 3.6-6.24a1 1 0 0 0-0.365-1.37l-4.49-2.59zm-11.7 10.7-0.17 0.295a1 1 0 0 0 0.17 1.2v-1.49z' />
									<path d='m8.38 4.46a1 1 0 0 0-0.637 0.289l-6.36 6.37a1 1 0 0 0 0 1.41l10.3 10.3a1 1 0 0 0 1.41 0l6.36-6.36a1 1 0 0 0 0-1.41l-10.3-10.3a1 1 0 0 0-0.779-0.289zm0.0684 2.82a1 1 0 0 1 0.676 0.264l7.57 7.56a1 1 0 0 1-0.0469 1.25l-3.68 3.68a1 1 0 0 1-1.23 0.00977l-7.54-7.54a1 1 0 0 1-0.0254-1.34l3.63-3.63a1 1 0 0 1 0.656-0.248z' />
								</g>
							</svg>
							Lotería
						</NextLink>
					</Button>

					<Button
						variant={active === 'users' ? 'default' : 'ghost'}
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
								className='mr-2 h-6 w-6'
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

					<Button
						variant={active === 'rumble' ? 'default' : 'ghost'}
						className='w-full justify-start'
						asChild
					>
						<NextLink href={animeRumbleRoutes.dashboardRumble}>
							<Dices className='mr-2' />
							Rumble
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
