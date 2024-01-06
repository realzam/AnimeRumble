'use client';

import { useCallback } from 'react';
import { useObservable } from '@legendapp/state/react';
import confetti from 'canvas-confetti';

interface Props {
	onEnd?: () => void;
	duration?: number;
}
const useConfetti = (props?: Props) => {
	const isPlaying = useObservable(false);

	const duration = 30 * 1000;

	function randomInRange(min: number, max: number) {
		return Math.random() * (max - min) + min;
	}

	const startConfetti = useCallback(() => {
		if (window !== undefined) {
			const animationEnd = Date.now() + duration;
			const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
			isPlaying.set(true);
			const interval: NodeJS.Timeout = setInterval(function () {
				const timeLeft = animationEnd - Date.now();

				if (timeLeft <= 0) {
					isPlaying.set(false);
					if (props?.onEnd) {
						props.onEnd();
					}
					return clearInterval(interval);
				}

				const particleCount = 50 * (timeLeft / duration);
				// since particles fall down, start a bit higher than random
				confetti({
					...defaults,
					particleCount,
					origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
				});
				confetti({
					...defaults,
					particleCount,
					origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
				});
			}, 250);
		}
	}, [isPlaying, duration, props]);

	return { startConfetti, isPlaying };
};

export default useConfetti;
