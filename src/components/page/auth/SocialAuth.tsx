'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { IconBrandFacebook, IconBrandGoogle } from '@tabler/icons-react';
import { signIn, useSession } from 'next-auth/react';

import animeRumbleRoutes from '@/lib/routes';
import { Button } from '@ui/Button';

const SocialAuth = () => {
	const router = useRouter();
	const session = useSession();
	const searchParams = useSearchParams();
	useEffect(() => {
		if (session.status == 'authenticated') {
			let callbackUrl = searchParams?.get('callbackUrl');
			if (!callbackUrl) {
				callbackUrl =
					session.data.user.role == 'admin'
						? animeRumbleRoutes.dashboard
						: animeRumbleRoutes.home;
			}
			const urlDecoaded = decodeURIComponent(callbackUrl);

			router.replace(urlDecoaded);
		}
	}, [router, searchParams, session]);

	return (
		<>
			<div className='grid grid-cols-2 gap-6'>
				<Button variant='outline'>
					<IconBrandFacebook className='mr-2 h-4 w-4' />
					Facebook
				</Button>
				<Button
					variant='outline'
					onClick={async () => {
						await signIn('google', { redirect: false });
					}}
				>
					<IconBrandGoogle className='mr-2 h-4 w-4' />
					Google
				</Button>
			</div>
			<div className='relative'>
				<div className='absolute inset-0 flex items-center'>
					<span className='w-full border-t' />
				</div>
				<div className='relative flex justify-center text-xs uppercase'>
					<span className='bg-background px-2 text-muted-foreground'>
						Or continue with
					</span>
				</div>
			</div>
		</>
	);
};

export default SocialAuth;
