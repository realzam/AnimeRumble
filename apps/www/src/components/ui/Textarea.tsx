import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export const textareaVariants = cva(
	'flex min-h-[60px] w-full resize-none rounded-md bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50',
	{
		variants: {
			variant: {
				default:
					'border border-input shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
				invisible: 'focus-visible:outline-none',
			},
			defaultVariants: {
				variant: 'default',
			},
		},
	},
);
export interface TextareaProps
	extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
		VariantProps<typeof textareaVariants> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, variant, ...props }, ref) => {
		return (
			<textarea
				className={cn(textareaVariants({ variant, className }))}
				ref={ref}
				{...props}
			/>
		);
	},
);
Textarea.displayName = 'Textarea';

export { Textarea };
