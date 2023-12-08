import React from 'react';
import { type Selector } from '@legendapp/state';
import { reactive, Show } from '@legendapp/state/react';
import { ReloadIcon } from '@radix-ui/react-icons';
import { type VariantProps } from 'class-variance-authority';

import { Button, type buttonVariants } from '../ui/Button';

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	isLoading: Selector<boolean>;
	children: React.ReactNode;
}
const ReactiveButton = reactive(Button);
const ButtonGradientLoading = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, variant: _, isLoading, disabled = false, ...props }, ref) => {
		return (
			<ReactiveButton
				variant='gradient'
				ref={ref}
				$disabled={disabled ? () => true : isLoading}
				{...props}
			>
				<Show if={isLoading} else={children}>
					<ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
					Espere porfavor
				</Show>
			</ReactiveButton>
		);
	},
);
ButtonGradientLoading.displayName = 'ButtonGradientLoading';

export default ButtonGradientLoading;
