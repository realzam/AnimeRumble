'use client';

import { trpc } from '@/trpc/client/client';
import { enableReactComponents } from '@legendapp/state/config/enableReactComponents';
import { Reactive, Show, useObservable } from '@legendapp/state/react';

import { Spinner } from '@/components/web/Spinner';

enableReactComponents();
const DevContainer = () => {
	const generateAIQuiz = trpc.quizz.createQuizFromIA.useMutation();
	const value = useObservable('');
	const creating = useObservable(false);
	return (
		<div>
			<Reactive.input $value={value} />
			<button
				onClick={() => {
					creating.set(true);
					generateAIQuiz.mutate({ topic: value.get() });
					creating.set(false);
				}}
			>
				generate
			</button>
			<Show if={creating}>
				<div className='h-10 w-10'>
					<Spinner />
				</div>
			</Show>
		</div>
	);
};

export default DevContainer;
