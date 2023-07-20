import { cn } from '@/lib/utils';

interface Props {
	children: React.ReactNode;
	className?: string;
	active: boolean;
	activeClassName: string;
}

function OverlayPanel({
	children,
	className,
	active,
	activeClassName,
}: Props): JSX.Element {
	return (
		<div
			className={cn(
				'absolute flex items-center justify-center flex-col py-0 px-10 text-center t-0 h-full w-1/2 translate-x-0 transition-transform duration-600 ease-in-out',
				className,
				active && activeClassName,
			)}
		>
			{children}
		</div>
	);
}

export default OverlayPanel;
