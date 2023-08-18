import { type ObservablePrimitive } from '@legendapp/state';
import { observer } from '@legendapp/state/react';

import { cn } from '@/lib/utils';

import OverlayLogin from './OverlayLogin';
import OverlayRegister from './OverlayRegister';

interface Props {
	active: ObservablePrimitive<boolean>;
}

const Overlay = observer(({ active }: Props) => {
	return (
		<div
			className={cn(
				't-0 absolute left-1/2 z-[6] hidden h-full w-1/2 overflow-hidden transition-transform duration-600 ease-in-out md:block',
				active.get() && '-translate-x-full',
			)}
		>
			<div
				className={cn(
					`relative -left-full h-full w-[200%] translate-x-0 bg-[url('/images/auth-background.gif')] bg-cover bg-left-top bg-no-repeat text-white transition-transform duration-600 ease-in-out before:absolute before:inset-0 before:bg-gradient-to-t before:from-zinc-950/40 before:from-60%`,
					active.get() && 'translate-x-1/2',
				)}
			>
				<OverlayLogin active={active} />
				<OverlayRegister active={active} />
			</div>
		</div>
	);
});

export default Overlay;
