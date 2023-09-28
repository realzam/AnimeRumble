'use client';

import { Card, CardDescription, CardHeader, CardTitle } from '@ui/Card';
import { Input } from '@ui/Input';
import { ScrollArea as UIScrollArea } from '@ui/ScrollArea';
import { Separator } from '@ui/Separator';
import Navbar from '@web/Navbar';

import AnswersTypeContainer from './AnswersTypeContainer';
import { PointsSelect } from './PointsSelect';
import { TimeSelect } from './TimeSelect';

const TAGS = Array.from({ length: 8 }).map(
	(_, i, a) => `v1.2.0-beta.${a.length - i}`,
);

export default function Home() {
	return (
		<>
			<Navbar />
			<div className='container flex h-[calc(100vh-3.5rem-1px)] py-8'>
				<Card className='mr-4 flex h-full w-72 shrink-0 flex-col'>
					<CardHeader>
						<CardTitle>Shigatsu wa kimi no uso</CardTitle>
						<CardDescription>
							Deploy your new project in one-click.
						</CardDescription>
					</CardHeader>
					<Separator />

					<Tasks />
				</Card>
				<Card className='flex flex-1  flex-col p-8'>
					<UIScrollArea className='h-full'>
						<div className='flex min-h-[calc(100vh-12rem)] flex-col justify-between'>
							<div className='p-1'>
								<Input
									className='h-11 text-center text-2xl'
									id='question'
									placeholder='Escribe tu pregunta'
									name='question'
								/>
							</div>
							<div className='flex h-80 items-center justify-between'>
								<TimeSelect />
								<div className='h-full w-[568px] bg-slate-900'></div>
								<PointsSelect />
							</div>
							<AnswersTypeContainer />
						</div>
					</UIScrollArea>
				</Card>
			</div>
		</>
	);
}

const Tasks = () => {
	return (
		<UIScrollArea>
			<div style={{ padding: '15px 20px' }}>
				<div className='text-violet-400'>Tags uwu</div>
				{TAGS.map((tag) => (
					<div className='mt-3 border-t pt-3' key={tag}>
						{tag}
					</div>
				))}
			</div>
		</UIScrollArea>
	);
};
