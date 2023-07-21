import { type ObservablePrimitive } from '@legendapp/state';
import { observer, Memo } from '@legendapp/state/react';

import Social from './Social';

import { cn } from '@/lib/utils';

interface Props {
	children: React.ReactNode;
	className?: string;
	active: ObservablePrimitive<boolean>;
	activeClassName?: string;
}
const AuthForm = observer(
	({
		children,
		className,
		active,
		activeClassName = '',
	}: Props): JSX.Element => {
		return (
			<div
				tabIndex={-1}
				className={cn(
					'left-0 w-full md:w-1/2 absolute top-0 h-full transition-all duration-1000 md:duration-600 ease-in-out',
					className,
					active.get() && activeClassName,
				)}
			>
				<form
					onSubmit={(e) => e.preventDefault()}
					action='#'
					className='flex flex-col items-center justify-center h-full px-12 py-0 text-center bg-white dark:bg-neutral-950'
				>
					{children}
					<Memo>
						<Social />
					</Memo>
				</form>
			</div>
		);
	},
);

export default AuthForm;
