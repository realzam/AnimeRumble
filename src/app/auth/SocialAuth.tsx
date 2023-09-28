import { IconBrandFacebook, IconBrandGoogle } from '@tabler/icons-react';

import { Button } from '@ui/Button';

const SocialAuth = () => {
	return (
		<>
			<div className='grid grid-cols-2 gap-6'>
				<Button variant='outline'>
					<IconBrandFacebook className='mr-2 h-4 w-4' />
					Facebook
				</Button>
				<Button variant='outline'>
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
