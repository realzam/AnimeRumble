'use client';

import { Roboto } from 'next/font/google';
import Image from 'next/image';
import { signIn } from 'next-auth/react';

import { cn } from '@/lib/utils';
import { Button } from '@ui/Button';

const roboto = Roboto({
	subsets: ['latin'],
	weight: '500',
});
const SocialAuth = () => {
	return (
		<>
			<div className='relative'>
				<div className='absolute inset-0 flex items-center'>
					<span className='w-full border-t-2' />
				</div>
				<div className='relative flex justify-center text-xs uppercase'>
					<span className='bg-background px-2 text-muted-foreground'>
						O continua con
					</span>
				</div>
			</div>

			<Button
				variant='outline'
				className={cn(
					roboto.className,
					'mx-auto w-fit border-2 px-1 shadow-xl',
				)}
				onClick={async () => {
					await signIn('google', { redirect: false });
				}}
			>
				<div className='relative h-8 w-8'>
					<Image fill alt='Google' src='/svg/google.svg' />
				</div>
				<p className='mr-1'>Acceder con Google</p>
			</Button>
		</>
	);
};

export default SocialAuth;
