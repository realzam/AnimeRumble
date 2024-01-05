import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: boolean;
	errorMessage?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, error = false, errorMessage, ...props }, ref) => {
		return (
			<>
				<input
					type={type}
					className={cn(
						'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
						error && 'border-destructive focus-visible:ring-destructive',
						className,
					)}
					ref={ref}
					{...props}
				/>
				{errorMessage && (
					<p className='text-[0.8rem] font-medium text-destructive'>
						{errorMessage}
					</p>
				)}
			</>
		);
	},
);
Input.displayName = 'Input';

export { Input };
