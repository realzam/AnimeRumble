import { cn } from '@/lib/utils';

function Overlay({
	children,
	active,
}: {
	children: React.ReactNode;
	active: boolean;
}) {
	return (
		<div
			className={cn(
				'hidden md:block absolute t-0 left-1/2 w-1/2 h-full overflow-hidden z-[6] transition-transform ease-in-out duration-600',
				active && '-translate-x-full',
			)}
		>
			<div
				className={cn(
					`text-white bg-cover bg-left-top bg-[url('/image.gif')] bg-no-repeat relative -left-full h-full w-[200%] translate-x-0 transition-transform duration-600 ease-in-out before:absolute before:left-0 before:top-0 before:right-0 before:bottom-0 before:bg-gradient-to-t before:from-zinc-950/40 before:from-60%`,
					active && 'translate-x-1/2',
				)}
			>
				{children}
			</div>
		</div>
	);
}

export default Overlay;
