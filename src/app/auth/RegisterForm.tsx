import { type ObservablePrimitive } from '@legendapp/state';
import { observer } from '@legendapp/state/react';
// import { useForm } from 'react-hook-form';

import { IconBrandFacebook, IconBrandGoogle } from '@tabler/icons-react';

import { cn } from '@/lib/utils';
import { Button } from '@ui/Button';
import {
	Card,
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

const RegisterForm = observer(({ active }: Props) => {
	return (
		<Card
			className={cn(
				'absolute left-0 top-0 z-[1] flex h-fit w-full flex-col border-none opacity-0 transition-all duration-1000 ease-in-out xs:justify-center md:w-1/2 md:duration-600',
				active.get() &&
					'opacity-1 z-[5] md:translate-x-full md:animate-show-overlay',
			)}
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
						<Label htmlFor='name'>Nombre completo</Label>
						<Input id='name' type='text' placeholder='kirito' />
					</div>
					<div className='grid gap-2'>
						<Label htmlFor='email'>Email</Label>
						<Input id='email' type='email' placeholder='m@example.com' />
					</div>
					<div className='grid gap-2'>
						<Label htmlFor='password'>Password</Label>
						<Input id='password' type='password' />
					</div>
					<div className='grid gap-2'>
						<Label htmlFor='cpassword'>Corfirm Password</Label>
						<Input id='password' type='password' />
					</div>
				</CardContent>
				<CardFooter>
					<Button className='w-full'>Create account</Button>
				</CardFooter>
			</form>
		</Card>
	);
});

export default RegisterForm;
