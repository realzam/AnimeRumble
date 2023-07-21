import { type ObservablePrimitive } from '@legendapp/state';
import { Legend, observer } from '@legendapp/state/react-components';

import { cn } from '@/lib/utils';

const Overlay = observer(
	({
		children,
		active,
	}: {
		children: React.ReactNode;
		active: ObservablePrimitive<boolean>;
	}) => {
		return (
			<Legend.div
				className$={cn(
					'hidden md:block absolute t-0 left-1/2 w-1/2 h-full overflow-hidden z-[6] transition-transform ease-in-out duration-600 bg-red-500',
					active.get() && '-translate-x-full',
				)}
			>
				<Legend.div
					className$={cn(
						`text-white bg-cover bg-left-top bg-[url('/image.gif')] bg-no-repeat relative -left-full h-full w-[200%] translate-x-0 transition-transform duration-600 ease-in-out before:absolute before:left-0 before:top-0 before:right-0 before:bottom-0 before:bg-gradient-to-t before:from-zinc-950/40 before:from-60%`,
						active.get() && 'translate-x-1/2',
					)}
				>
					{children}
				</Legend.div>
			</Legend.div>
		);
	},
);

export default Overlay;
