'use client';

import React from 'react';
import { enableReactComponents } from '@legendapp/state/config/enableReactComponents';
import { Show } from '@legendapp/state/react';
import { ReloadIcon } from '@radix-ui/react-icons';

import { Button } from '@ui/Button';

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	isLoading: boolean;
}
enableReactComponents();

const ButtonGradientLoading = React.forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, isLoading, children, ...props }, ref) => {
		return (
			<Button variant='gradient' className={className} ref={ref} {...props}>
				<Show if={isLoading} else={children}>
					<ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
					Espere porfavor
				</Show>
			</Button>
		);
	},
);
ButtonGradientLoading.displayName = 'Button';

export default ButtonGradientLoading;
