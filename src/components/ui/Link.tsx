import * as React from 'react';
import NextLink, { type LinkProps } from 'next/link';

import { cn } from '@/lib/utils';

// const Link = (props: LinkProps): JSX.Element => {
// 	return <NextLink {...props}>Link</NextLink>;
// };

const Link = React.forwardRef<
	HTMLAnchorElement,
	LinkProps & { children: React.ReactNode; className?: string }
>(({ className, children, ...props }, ref) => {
	return (
		<NextLink
			className={cn(
				'transition-colors hover:text-foreground/50 text-foreground',
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
