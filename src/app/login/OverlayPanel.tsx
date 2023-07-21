import { type ObservablePrimitive } from '@legendapp/state';
import { observer } from '@legendapp/state/react';

import { cn } from '@/lib/utils';

interface Props {
	children: React.ReactNode;
	className?: string;
	active: ObservablePrimitive<boolean>;
	activeClassName: string;
}

const OverlayPanel = observer(
	({ children, className, active, activeClassName }: Props): JSX.Element => {
		return (
			<div
				className={cn(
					'absolute flex items-center justify-center flex-col py-0 px-10 text-center t-0 h-full w-1/2 translate-x-0 transition-transform duration-600 ease-in-out',
					className,
					active.get() && activeClassName,
				)}
			>
				{children}
			</div>
		);
	},
);

export default OverlayPanel;
