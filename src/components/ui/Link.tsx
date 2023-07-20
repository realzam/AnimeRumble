import { forwardRef } from 'react';
import NextLink, { type LinkProps } from 'next/link';

import { cn } from '@/lib/utils';

// const Link = (props: LinkProps): JSX.Element => {
// 	return <NextLink {...props}>Link</NextLink>;
// };

const Link = forwardRef<
	HTMLAnchorElement,
	LinkProps & { children: string; className?: string }
>(({ className, children, ...props }, ref) => {
	return (
		<NextLink
			className={cn(
				'transition-colors hover:text-secondary-darken derk:hover:text-secondary/80 text-foreground',
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
