'use client';

import { useEffect } from 'react';
import { Nunito } from 'next/font/google';
import { Memo, useObservable } from '@legendapp/state/react';
import { useAnimate } from 'framer-motion';

import { cn } from '@/lib/utils';
import usePlayLoteria from '@/hooks/usePlayLoteria';
import usePlayLoteriaUI from '@/hooks/usePlayLoteriaUI';
import { AlertDialog, AlertDialogOverlay } from '@/components/ui/AlertDialog';

const nunito = Nunito({
	subsets: ['latin'],
	weight: '600',
});
const LoteriaCountDownDialog = () => {
	const { socket } = usePlayLoteria();
	const { showCountdownDialog, soundCounter } = usePlayLoteriaUI();
	const counter = useObservable(10);
	const [scope, animate] = useAnimate();

	useEffect(() => {
		socket?.on('startCountdown', (value) => {
			counter.set(value);
		});
	}, [socket, counter]);

	useEffect(() => {
		socket?.removeListener('preAnimeCountdown');
		socket?.on('preAnimeCountdown', () => {
			animate(
				scope.current,
				{ scale: 0.2, opacity: 0.1 },
				{ duration: 0.25, ease: 'easeInOut' },
			);
		});
	}, [socket, animate, scope]);

	useEffect(() => {
		socket?.removeListener('countdown');
		socket?.on('countdown', async (n) => {
			counter.set(n);
			soundCounter.play();
			await animate(
				scope.current,
				{ scale: 1.2, opacity: 1 },
				{ duration: 0.15, ease: 'easeInOut' },
			);
			await animate(
				scope.current,
				{ scale: 1 },
				{ duration: 0.1, ease: 'easeInOut' },
			);
		});
	}, [socket, animate, scope, soundCounter, counter]);

	return (
		<Memo>
			{() => (
				<AlertDialog open={showCountdownDialog.get()}>
					<AlertDialogOverlay>
						<div className='flex h-full w-full items-center justify-center'>
							<div
								ref={scope}
								className={cn(
									'mb-9 select-none text-center text-[20rem] leading-[17rem] text-indigo-600',
									nunito.className,
								)}
							>
								<Memo>{counter}</Memo>
							</div>
						</div>
					</AlertDialogOverlay>
				</AlertDialog>
			)}
		</Memo>
	);
};

export default LoteriaCountDownDialog;
