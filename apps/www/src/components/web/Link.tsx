import { forwardRef } from 'react';
import NextLink, { type LinkProps } from 'next/link';

import { cn } from '@/lib/utils';

const Link = forwardRef<
	HTMLAnchorElement,
	LinkProps & { children: string; className?: string }
>(({ className, children, ...props }, ref) => {
	return (
		<NextLink
			className={cn(
				'underline-offset-4 transition-colors hover:text-primary hover:underline dark:hover:text-primary-light',
				className,
			)}
			ref={ref}
			{...props}
		>
			{children}
		</NextLink>
	);
});

Link.displayName = 'Link';

export default Link;
