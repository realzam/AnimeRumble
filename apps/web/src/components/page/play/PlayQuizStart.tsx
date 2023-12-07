import { useEffect, useState } from 'react';
import { Show, useObservable } from '@legendapp/state/react';

import usePlayQuiz from '@/hooks/usePlayQuiz';
import { Button } from '@ui/Button';

const PlayQuizStart = () => {
	const started = useObservable(false);
	const { startQuiz } = usePlayQuiz();

	const [time, setTime] = useState(6);

	let interval: NodeJS.Timeout | undefined = undefined;

	const start = () => {
		started.set(true);
		startQuiz();
		interval = setInterval(() => {
			setTime((prevTime) => prevTime - 1);
		}, 1000);
	};
	useEffect(() => {
		return () => {
			clearInterval(interval);
		};
	}, [interval]);

	return (
		<div className='flex h-[calc(100vh-3.5rem-1px)] select-none flex-col items-center justify-center'>
			<Show
				if={!started.get()}
				else={
					<>
						<div className='animate-ping select-none text-6xl animate-normal animate-duration-1000 animate-infinite'>
							{time}
						</div>
					</>
				}
			>
				<Button onClick={start} variant='gradient'>
					Jugar
				</Button>
			</Show>
		</div>
	);
};

export default PlayQuizStart;
