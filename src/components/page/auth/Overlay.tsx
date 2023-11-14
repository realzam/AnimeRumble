'use client';

import { type ObservablePrimitive } from '@legendapp/state';
import { enableReactComponents } from '@legendapp/state/config/enableReactComponents';
import { Reactive } from '@legendapp/state/react';

import { cn } from '@/lib/utils';

import OverlayLogin from './OverlayLogin';
import OverlayRegister from './OverlayRegister';

enableReactComponents();
interface Props {
	isRegisterFocus: ObservablePrimitive<boolean>;
}

const Overlay = ({ isRegisterFocus }: Props) => {
	return (
		<Reactive.div
			$className={() =>
				cn(
					't-0 absolute left-1/2 z-[6] hidden h-full w-1/2 overflow-hidden transition-transform duration-600 ease-in-out md:block',
					isRegisterFocus.get() && '-translate-x-full',
				)
			}
		>
			<Reactive.div
				$className={() =>
					cn(
						`relative -left-full h-full w-[200%] translate-x-0 bg-[url('/images/auth-background.gif')] bg-cover bg-left-top bg-no-repeat text-white transition-transform duration-600 ease-in-out before:absolute before:inset-0 before:bg-gradient-to-t before:from-zinc-950/40 before:from-60%`,
						isRegisterFocus.get() && 'translate-x-1/2',
					)
				}
			>
				<OverlayLogin isRegisterFocus={isRegisterFocus} />
				<OverlayRegister isRegisterFocus={isRegisterFocus} />
			</Reactive.div>
		</Reactive.div>
	);
};

export default Overlay;
