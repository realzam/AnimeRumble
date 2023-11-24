import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { trpc } from '@/trpc/client/client';
import * as Popover from '@radix-ui/react-popover';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar as CalendarIcon } from 'lucide-react';
import moment from 'moment';

import { type QuizDataType } from '@/types/quizQuery';
import animeRumbleRoutes from '@/lib/routes';
import {
	actualizarHora,
	cn,
	getTimestampFormDate,
	horasFaltantesHastaFinDelDia,
} from '@/lib/utils';
import { Accordion } from '@ui/Accordion';
import { Button } from '@ui/Button';
import { Calendar } from '@ui/Calendar';
import { CardTitle } from '@ui/Card';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@ui/Dialog';
import { ScrollArea } from '@ui/ScrollArea';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@ui/Select';

import AsignateIncorrectQuestionItem from './AsignateIncorrectQuestionItem';
import AsignateValidQuestionItem from './AsignateValidQuestionItem';

interface Props {
	quiz: QuizDataType;
	refetch: () => void;
}

const AssignateQuiz = ({ refetch, quiz }: Props) => {
	const router = useRouter();
	const [date, setDate] = useState<Date>();
	const [hour, setHour] = useState<string>();
	const [errorDate, setErrorDate] = useState<string>('');
	const [errorHour, setErrorHour] = useState<string>('');
	const tags = useMemo(() => {
		if (date) {
			return horasFaltantesHastaFinDelDia(date);
		}
		return [];
	}, [date]);

	const asignate = trpc.quizz.asignateQuiz.useMutation();

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant='gradient'
					onClick={async () => {
						refetch();
					}}
				>
					Asignar
				</Button>
			</DialogTrigger>
			<DialogContent
				className={cn(
					'sm:max-w-[425px]',
					quiz.questions.length > 4 && 'h-[500px]',
				)}
			>
				<DialogHeader>
					<DialogTitle>Resumen</DialogTitle>
					<DialogDescription>
						Informacion de las preguntas que estaran en el quiz
					</DialogDescription>
				</DialogHeader>
				<ScrollArea type='always' className='pr-1'>
					<div className='flex items-start space-x-2'>
						<CardTitle
							className={cn('mt-3', errorDate !== '' && 'text-destructive')}
						>
							Fecha:
						</CardTitle>

						<div>
							<Popover.Root>
								<Popover.Trigger>
									<Button
										variant='outline'
										className={cn(
											'w-[280px] justify-start text-left font-normal',
											!date && 'text-muted-foreground',
											errorDate !== '' && 'ring-1 ring-destructive',
										)}
									>
										<CalendarIcon className='mr-2 h-4 w-4' />
										{date ? (
											format(date, 'PPP', {
												locale: es,
											})
										) : (
											<span>Seleccionar fecha</span>
										)}
									</Button>
								</Popover.Trigger>
								<Popover.Content
									align='center'
									sideOffset={4}
									className='mt-2 w-auto rounded-md border bg-popover p-0'
								>
									<AnimatePresence>
										<motion.div
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											transition={{ duration: 0.3 }}
										>
											<Calendar
												locale={es}
												fromDate={moment().toDate()}
												toDate={moment().add(2, 'M').toDate()}
												mode='single'
												selected={date}
												onSelect={(d) => {
													setDate(d);
													if (d) {
														setErrorDate('');
														const horasRestantes =
															horasFaltantesHastaFinDelDia(d);
														if (hour && !horasRestantes.includes(hour)) {
															setHour(undefined);
														}
													} else {
														setErrorDate('Es necesario seleccionar un día');
														setHour(undefined);
													}
												}}
												initialFocus
											/>
										</motion.div>
									</AnimatePresence>
								</Popover.Content>
							</Popover.Root>
							{errorDate && <div className='text-destructive'>{errorDate}</div>}
						</div>
					</div>
					<div className='my-3 flex items-start space-x-2'>
						<CardTitle
							className={cn('mt-3', errorHour !== '' && 'text-destructive')}
						>
							Hora:
						</CardTitle>
						<div>
							<Select
								onValueChange={(v) => {
									setHour(v);
									setErrorHour('');
								}}
								value={hour}
							>
								<SelectTrigger
									className={cn(
										'w-[180px]',
										errorHour !== '' && 'ring-1 ring-destructive',
									)}
								>
									<SelectValue placeholder='Selecccionar hora' />
								</SelectTrigger>
								<SelectContent className='max-h-56 w-auto'>
									<ScrollArea className={tags.length > 5 ? 'h-56' : ''}>
										<SelectGroup>
											<SelectLabel>Hora</SelectLabel>
											{tags.map((tag) => (
												<SelectItem key={tag} value={tag}>
													{tag}
												</SelectItem>
											))}
										</SelectGroup>
									</ScrollArea>
								</SelectContent>
							</Select>
							{errorHour && <div className='text-destructive'>{errorHour}</div>}
						</div>
					</div>

					<Accordion type='single' collapsible>
						{quiz.questions.map((q, index) =>
							q.hasError ? (
								<AsignateIncorrectQuestionItem
									key={q.id}
									question={q}
									index={index}
									quizID={quiz.id}
								/>
							) : (
								<AsignateValidQuestionItem
									key={q.id}
									question={q}
									index={index}
									quizID={quiz.id}
								/>
							),
						)}
					</Accordion>

					<DialogFooter>
						{quiz.questions.some((q) => q.hasError) ? (
							<Button
								variant='destructive'
								type='submit'
								onClick={() => {
									router.push(
										animeRumbleRoutes.createQuiz +
											quiz.id +
											'?index=' +
											quiz.questions.findIndex((q) => q.hasError),
									);
								}}
							>
								Arreglar
							</Button>
						) : (
							<Button
								variant='gradient'
								type='submit'
								onClick={async () => {
									console.log('send asignate0');
									if (tags.length == 0) {
										setDate(undefined);
										setErrorHour('Es necesario seleccionar una hora');
									}
									console.log('send asignate1');
									if (!date) {
										setErrorDate('Es necesario seleccionar un día');
										return;
									}
									console.log('send asignate2');
									if (!hour) {
										setErrorHour('Es necesario seleccionar una hora');
										return;
									}
									console.log('send asignate3');

									await asignate.mutate({
										quizId: quiz.id,
										date: getTimestampFormDate(actualizarHora(date, hour)),
									});
								}}
							>
								Asignar
							</Button>
						)}
					</DialogFooter>
				</ScrollArea>
			</DialogContent>
		</Dialog>
	);
};

export default AssignateQuiz;
