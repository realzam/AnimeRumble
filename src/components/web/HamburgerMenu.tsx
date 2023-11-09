import { forwardRef } from 'react';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';

import { cn } from '@/lib/utils';
import { Button, type ButtonProps } from '@ui/Button';
import { Sheet, SheetTrigger } from '@ui/Sheet';

type HamburgerMenuProps = Omit<ButtonProps, 'asChild' | 'size'>;

const HamburgerMenu = forwardRef<HTMLButtonElement, HamburgerMenuProps>(
	({ className, variant = 'outline', children, ...props }, ref) => {
		return (
			<Sheet>
				<SheetTrigger asChild>
					<Button
						variant={variant}
						size='icon'
						className={cn(className)}
						ref={ref}
						{...props}
					>
						<HamburgerMenuIcon />
						<span className='sr-only'>Menu Navigation</span>
					</Button>
				</SheetTrigger>
				{children}
			</Sheet>
		);
	},
);

HamburgerMenu.displayName = 'HamburgerMenu';

export { HamburgerMenu };
