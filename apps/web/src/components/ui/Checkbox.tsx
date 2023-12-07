'use client';

import * as React from 'react';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';

const Checkbox = React.forwardRef<
	React.ElementRef<typeof CheckboxPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> & {
		showRippleAwait?: boolean;
	}
>(({ className, showRippleAwait = false, ...props }, ref) => (
	<CheckboxPrimitive.Root
		ref={ref}
		className={cn(
			'group peer h-4 w-4 shrink-0 rounded-sm border border-primary text-primary-foreground shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
			className,
		)}
		{...props}
	>
		<CheckboxPrimitive.Indicator className='flex items-center justify-center text-current'>
			<CheckIcon className='h-full w-full' />
		</CheckboxPrimitive.Indicator>
		{showRippleAwait && (
			<span className='flex h-full items-center justify-center'>
				<span className='h-full w-full rounded-full bg-primary opacity-0 group-data-[state=unchecked]:animate-ping-slow' />
			</span>
		)}
	</CheckboxPrimitive.Root>
));
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
