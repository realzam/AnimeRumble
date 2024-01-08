'use client';

import React, { useEffect, useRef } from 'react';
import { Memo, useObservable } from '@legendapp/state/react';

const useCountdown = (time: number) => {
	const interval = useRef<NodeJS.Timeout>();
	const state = useObservable({
		start: time,
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
		started: false,
	});
	useEffect(() => {
		interval.current = setInterval(() => {
			const restTime = state.start.get() - Date.now();
			state.seconds.set(Math.floor((restTime % (1000 * 60)) / 1000));
			state.minutes.set(
				Math.floor((restTime % (1000 * 60 * 60)) / (1000 * 60)),
			);
			state.hours.set(
				Math.floor((restTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
			);
			state.days.set(Math.floor(restTime / (1000 * 60 * 60 * 24)));
		}, 100);

		return () => {
			clearInterval(interval.current);
		};
	}, [state]);

	const Component = () => (
		<div>
			<Memo>
				{() => (
					<>{`${state.days.get()}d ${state.hours.get()}h ${state.minutes.get()}m ${state.seconds.get()}s`}</>
				)}
			</Memo>
		</div>
	);
	return Component;
};
export default useCountdown;
