'use client';

import { useRouter } from 'next/navigation';
import { trpc } from '@/trpc/client/client';
import { enableReactComponents } from '@legendapp/state/config/enableReactComponents';
import { Show } from '@legendapp/state/react';
import { ReloadIcon } from '@radix-ui/react-icons';

import { Separator } from '@ui/Separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@ui/Tabs';
import { Button } from '@/components/ui/Button';

enableReactComponents();
const DashboardQuizzesContainer = () => {
	return (
		<div className='flex-1 space-y-4 p-8 pt-6'>
			<Tabs defaultValue='quizz' className='space-y-6'>
				<TabsList className='grid w-[400px] grid-cols-3'>
					<TabsTrigger value='quizz'>Activos</TabsTrigger>
					<TabsTrigger value='bingo'>Finalizados</TabsTrigger>
					<TabsTrigger value='loteria'>Guardados</TabsTrigger>
				</TabsList>
				<TabsContent value='quizz'>
					<div>
						<h2 className='text-2xl font-semibold tracking-tight'>
							Listen Now A
						</h2>
						<p className='text-sm text-muted-foreground'>
							Top picks for you. Updated daily.
						</p>
					</div>
					<Separator className='my-4' />
					<PodcastEmptyPlaceholder />
				</TabsContent>
				<TabsContent value='bingo'>
					<div>
						<h2 className='text-2xl font-semibold tracking-tight'>
							Listen Now B
						</h2>
						<p className='text-sm text-muted-foreground'>
							Top picks for you. Updated daily.
						</p>
					</div>
					<Separator className='my-4' />
					<PodcastEmptyPlaceholder />
				</TabsContent>
				<TabsContent value='loteria'>
					<div>
						<h2 className='text-2xl font-semibold tracking-tight'>
							Listen Now C
						</h2>
						<p className='text-sm text-muted-foreground'>
							Top picks for you. Updated daily.
						</p>
					</div>
					<Separator className='my-4' />
					<PodcastEmptyPlaceholder />
				</TabsContent>
			</Tabs>
		</div>
	);
};

function PodcastEmptyPlaceholder() {
	const createQuiz = trpc.quizz.createQuizz.useMutation();
	const router = useRouter();
	return (
		<div className='flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed'>
			<div className='mx-auto flex max-w-[420px] flex-col items-center justify-center text-center'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					fill='none'
					stroke='currentColor'
					strokeLinecap='round'
					strokeLinejoin='round'
					strokeWidth='2'
					className='h-10 w-10 text-muted-foreground'
					viewBox='0 0 24 24'
				>
					<circle cx='12' cy='11' r='1' />
					<path d='M11 17a1 1 0 0 1 2 0c0 .5-.34 3-.5 4.5a.5.5 0 0 1-1 0c-.16-1.5-.5-4-.5-4.5ZM8 14a5 5 0 1 1 8 0' />
					<path d='M17 18.5a9 9 0 1 0-10 0' />
				</svg>

				<h3 className='mt-4 text-lg font-semibold'>No hay quizzes</h3>
				<p className='mb-4 mt-2 text-sm text-muted-foreground'>
					You have not added any podcasts. Add one below.
				</p>
				<Button
					className=''
					variant='gradient'
					type='submit'
					disabled={createQuiz.isLoading}
					onClick={() => {
						createQuiz.mutate(
							{
								title: 'Hola mundo',
							},
							{
								onSuccess: ({ quiz }) => {
									console.log(quiz);
									router.push(`/quizz/${quiz.id}`);
								},
							},
						);
					}}
				>
					<Show if={createQuiz.isLoading} else={<>Crear quiz</>}>
						<ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
						Espere porfavor
					</Show>
				</Button>
			</div>
		</div>
	);
}

export default DashboardQuizzesContainer;
