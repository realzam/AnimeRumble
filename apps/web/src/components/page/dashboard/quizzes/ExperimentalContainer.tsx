'use client';

import { useRouter } from 'next/navigation';
import { trpc } from '@/trpc/client/client';
import { enableReactComponents } from '@legendapp/state/config/enableReactComponents';
import { Reactive, Show, useObservable } from '@legendapp/state/react';

import animeRumbleRoutes from '@/lib/routes';
import ButtonGradientLoading from '@/components/web/ButtonGradientLoading';
import { Spinner } from '@/components/web/Spinner';

enableReactComponents();
const ExperimentalContainer = () => {
	const generateAIQuiz = trpc.quizz.createQuizFromIA.useMutation();
	const value = useObservable('Crea un quiz con 10 preguntas del anime');
	const creating = useObservable(false);
	const router = useRouter();
	return (
		<div className='flex flex-col space-y-2 p-2'>
			<p>Crea un quiz utilizando inteligenca artificial</p>
			<div className='flex space-x-3'>
				<Reactive.input
					placeholder='Crea un quiz con 10 preguntas del anime'
					className='text-sm file:text-sm flex h-9 w-1/2 rounded-md border border-input bg-transparent px-3 py-1 shadow-sm transition-colors file:border-0 file:bg-transparent file:font-medium placeholder:text-muted-foreground hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
					$value={value}
				/>
				<ButtonGradientLoading
					isLoading={creating}
					onClick={async () => {
						creating.set(true);
						await generateAIQuiz.mutate(
							{ topic: value.get() },
							{
								onSuccess: (res) => {
									router.push(animeRumbleRoutes.createQuiz + res.idQuiz);
								},
							},
						);
					}}
				>
					Generar
				</ButtonGradientLoading>
			</div>
			<Show if={creating}>
				<div className='h-10 w-10'>
					<Spinner />
				</div>
			</Show>
		</div>
	);
};

export default ExperimentalContainer;
