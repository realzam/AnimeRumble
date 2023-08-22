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
import ReactiveInputPassword from '@/components/ui/ReactiveInputPassword';

enableReactComponents();
interface Props {
	active: ObservablePrimitive<boolean>;
}

const RegisterForm = ({ active }: Props) => {
	return (
		<Reactive.div
			$className={() =>
				cn(
					'absolute left-0 top-0 z-[1] flex h-fit w-full flex-col rounded-xl border border-none bg-card text-card-foreground opacity-0 shadow transition-all duration-1000 ease-in-out xs:justify-center md:w-1/2 md:duration-600',
					active.get() &&
						'opacity-1 z-[5] md:translate-x-full md:animate-show-overlay',
				)
			}
		>
			<form>
				<CardHeader className='space-y-1'>
					<CardTitle className='text-2xl'>Crear cuenta</CardTitle>
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
						<Label htmlFor='fullName'>Nombre completo</Label>
						<Input
							autoComplete='name'
							id='fullName'
							name='fullName'
							placeholder='kirito'
							type='text'
						/>
					</div>
					<div className='grid gap-2'>
						<Label htmlFor='email'>Email</Label>
						<Input
							autoComplete='email'
							id='email'
							name='email'
							placeholder='m@example.com'
							type='email'
						/>
					</div>
					<div className='grid gap-2'>
						<Label htmlFor='register-password'>Password</Label>
						<Input
							autoComplete='new-password'
							id='register-password'
							name='password'
							type='password'
						/>
					</div>
					<div className='grid gap-2'>
						<Label htmlFor='cpassword'>Corfirm Password</Label>
						<ReactiveInputPassword
							autoComplete='new-password'
							id='cpassword'
							name='password'
						/>
					</div>
				</CardContent>
				<CardFooter>
					<Button className='w-full' type='submit'>
						Create account
					</Button>
				</CardFooter>
			</form>
		</Reactive.div>
	);
};

export default RegisterForm;
