'use client';

import { Card, CardDescription, CardHeader, CardTitle } from '@ui/Card';
import { Input } from '@ui/Input';
import { ScrollArea as UIScrollArea } from '@ui/ScrollArea';
import { Separator } from '@ui/Separator';
import Navbar from '@web/Navbar';

import AnswersTypeContainer from '../AnswersTypeContainer';
import ListQuizzes from '../ListQuizzes';
import { PointsSelect } from '../PointsSelect';
import { TimeSelect } from '../TimeSelect';

interface Props {}

export default function QuizPage({}: Props) {
	return (
		<>
			<Navbar />
			<div className='container flex h-[calc(100vh-3.5rem-1px)] py-8'>
				<Card className='mr-4 flex h-full w-80 shrink-0 flex-col'>
					<CardHeader>
						<CardTitle>Shigatsu wa kimi no uso</CardTitle>
						<CardDescription>
							Deploy your new project in one-click.
						</CardDescription>
					</CardHeader>
					<Separator />

					<ListQuizzes />
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
