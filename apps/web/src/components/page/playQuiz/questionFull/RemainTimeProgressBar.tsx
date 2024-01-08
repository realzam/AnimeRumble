import React, { useRef } from 'react';
import {
	Memo,
	useComputed,
	useMount,
	useObserve,
	useUnmount,
} from '@legendapp/state/react';

import usePlayQuiz from '@/hooks/usePlayQuiz';
import { Progress } from '@/components/ui/Progress';

const RemainTimeProgressBar = () => {
	const { questionUser, time, answer, finishTime, cancelTimer } = usePlayQuiz();
	const interval = useRef<NodeJS.Timeout>();

	const questionTime = useComputed(
		() => parseInt(questionUser.time.get()) * 1000,
	);

	useMount(() => {
		time.set(100);
		finishTime.set(Date.now() + questionTime.get() + 100);
		const i = setInterval(() => {
			const dif = finishTime.get() - Date.now();
			if (dif <= 0) {
				time.set(0);
				answer(-1);
				clearInterval(i);
				return;
			}
			let v = (dif * 100) / questionTime.get();
			v = Math.min(100, v);
			v = Math.max(0, v);
			time.set(v);
		}, 100);
		interval.current = i;
	});

	useUnmount(() => {
		clearInterval(interval.current);
	});

	useObserve(cancelTimer, () => {
		if (cancelTimer.get()) {
			clearInterval(interval.current);
		}
	});

	return (
		<Memo>
			{() => <Progress className='absolute top-0' value={time.get()} />}
		</Memo>
	);
};

export default RemainTimeProgressBar;
