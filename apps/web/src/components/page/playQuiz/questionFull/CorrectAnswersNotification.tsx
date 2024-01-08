'use client';

import { Memo, Switch } from '@legendapp/state/react';

import usePlayQuiz from '@/hooks/usePlayQuiz';

const CorrectAnswersNotification = () => {
	const { questionUser, points } = usePlayQuiz();
	return (
		<div className='absolute left-0 z-50 flex h-20 w-full animate-fade-down flex-col items-center justify-center rounded-b bg-green-400 text-lg font-semibold tracking-widest text-white animate-normal animate-once'>
			<p>Correcto</p>
			<div className='rounded-full bg-white px-4 py-1 text-lg text-green-400'>
				<Switch value={questionUser.points}>
					{{
						standar: () => (
							<>
								+<Memo>{points}</Memo>
							</>
						),
						double: () => (
							<>
								+<Memo>{points}</Memo>
								<Memo>{() => <>{points.get() / 2}</>}</Memo>
								(x2)
							</>
						),
						none: () => <>+1</>,
						default: () => <></>,
					}}
				</Switch>
			</div>
		</div>
	);
};

export default CorrectAnswersNotification;
