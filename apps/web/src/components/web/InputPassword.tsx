import { forwardRef, useRef } from 'react';
import { enableReactComponents } from '@legendapp/state/config/enableReactComponents';
import { Reactive, useObservable, useSelector } from '@legendapp/state/react';
import { Eye, EyeOff } from 'lucide-react';

import { cn, useDOMRef } from '@/lib/utils';
import { Button } from '@ui/Button';
import { type InputProps } from '@ui/Input';

enableReactComponents();
const InputPassword = forwardRef<
	HTMLInputElement,
	InputProps & {
		error?: boolean;
		errorMessage?: string;
	}
>(
	(
		{
			className,
			type: _,
			onFocus,
			onBlur,
			error = false,
			errorMessage,
			...props
		},
		ref,
	) => {
		const servicesRef = useRef<HTMLDivElement>(null);
		const domRef = useDOMRef<HTMLInputElement>(ref);
		const blur = useObservable(false);
		const showPassword = useObservable(false);
		const type = useSelector(() => (showPassword.get() ? 'text' : 'password'));

		return (
			<>
				<Reactive.div
					$className={() =>
						cn(
							'box-border flex h-9 w-full cursor-text flex-row items-center gap-1.5 rounded-md border border-input bg-transparent py-1 pl-3 text-sm focus-within:outline-none focus-within:ring-1 focus-within:ring-ring hover:bg-secondary/80',
							className,
							blur.get() && 'outline-none ring-1 ring-ring',
							error && 'border-destructive focus-within:ring-destructive',
						)
					}
					onClick={() => {
						domRef.current?.focus();
					}}
					ref={servicesRef}
				>
					<Reactive.input
						$className='h-full w-full bg-transparent focus-visible:outline-none'
						ref={domRef}
						$type={type}
						onFocus={(e) => {
							blur.toggle();
							onFocus?.(e);
						}}
						onBlur={(e) => {
							blur.set(false);
							onBlur?.(e);
						}}
						{...props}
					/>

					<Button
						type='button'
						variant='ghost'
						size='icon'
						className='my-2 p-0 text-foreground'
						onClick={() => {
							if (domRef.current) {
								domRef.current.type = !showPassword.get() ? 'text' : 'password';
							}
							showPassword.toggle();
						}}
					>
						{showPassword.get() ? <EyeOff /> : <Eye />}
					</Button>
				</Reactive.div>
				{errorMessage && (
					<p className='text-[0.8rem] font-medium text-destructive'>
						{errorMessage}
					</p>
				)}
			</>
		);
	},
);

InputPassword.displayName = 'ReactiveInputPassword';

export default InputPassword;
