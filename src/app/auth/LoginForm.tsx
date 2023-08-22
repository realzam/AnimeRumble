import { type ObservablePrimitive } from '@legendapp/state';
import { enableReactComponents } from '@legendapp/state/config/enableReactComponents';
import { Reactive } from '@legendapp/state/react';
import { IconBrandFacebook, IconBrandGoogle } from '@tabler/icons-react';

import { cn } from '@/lib/utils';
import { Button } from '@ui/Button';
import {
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@ui/Card';
import { Input } from '@ui/Input';
import { Label } from '@ui/Label';

interface Props {
	active: ObservablePrimitive<boolean>;
}
enableReactComponents();

const LoginForm = ({ active }: Props) => {
	return (
		<Reactive.div
			$className={() =>
				cn(
					'absolute left-0 top-0 z-[2] flex h-full w-full flex-col justify-center rounded-xl border border-none bg-card text-card-foreground shadow transition-all duration-1000 ease-in-out md:w-1/2 md:duration-600',
					active.get() && 'translate-x-full',
				)
			}
		>
			<CardHeader className='space-y-1'>
				<CardTitle className='text-2xl'>Iniciar sesión</CardTitle>
				<CardDescription>
					Enter your email below to create your account
				</CardDescription>
			</CardHeader>
			<CardContent className='grid gap-4'>
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
				<div className='grid gap-2'>
					<Label htmlFor='email'>Email</Label>
					<Input
						autoComplete='email'
						id='email'
						type='email'
						placeholder='m@example.com'
						name='email'
					/>
				</div>
				<div className='grid gap-2'>
					<Label htmlFor='password'>Password</Label>
					<Input
						id='password'
						type='password'
						name='password'
						autoComplete='current-password'
					/>
				</div>
			</CardContent>
			<CardFooter>
				<Button className='w-full'>Iniciar sesión</Button>
			</CardFooter>
		</Reactive.div>
	);
};

export default LoginForm;
