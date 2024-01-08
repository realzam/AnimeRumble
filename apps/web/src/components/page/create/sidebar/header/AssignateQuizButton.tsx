import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { trpc } from '@/trpc/client/client';
import { Computed, useObservable } from '@legendapp/state/react';
import * as Popover from '@radix-ui/react-popover';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar as CalendarIcon } from 'lucide-react';
import moment from 'moment';

import animeRumbleRoutes from '@/lib/routes';
import {
	actualizarHora,
	cn,
	getTimestampFormDate,
	horasFaltantesHastaFinDelDia,
} from '@/lib/utils';
import useQuiz from '@/hooks/useQuiz';
import { Accordion } from '@ui/Accordion';
import { Button } from '@ui/Button';
import { Calendar } from '@ui/Calendar';
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@ui/Dialog';
import { CardTitle } from '@/components/ui/Card';
import { ScrollArea } from '@/components/ui/ScrollArea';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/Select';
import ButtonGradientLoading from '@/components/web/ButtonGradientLoading';

import AsignateIncorrectQuestionItem from './AsignateIncorrectQuestionItem';
import AsignateValidQuestionItem from './AsignateValidQuestionItem';

const AssignateQuizButton = () => {
	const { quiz, ui } = useQuiz();
	const isLoading = useObservable(false);
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
		<Computed>
			{() => (
				<Dialog
					onOpenChange={() => {
						isLoading.set(false);
					}}
				>
					<DialogTrigger asChild>
						<Button variant='gradient'>Asignar</Button>
					</DialogTrigger>
					<DialogContent className='sm:max-w-[425px]'>
						<DialogHeader>
							<DialogTitle>Resumen</DialogTitle>
							<DialogDescription>
								Informacion de las preguntas que estaran en el quiz
							</DialogDescription>
						</DialogHeader>

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
												'w-[280px] justify-start bg-card text-left font-normal',
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
										className='z-50 mt-2 w-auto rounded-md border bg-popover p-0'
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
								{errorDate && (
									<div className='text-destructive'>{errorDate}</div>
								)}
							</div>
						</div>
						<div className='flex items-start space-x-2'>
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
											'w-[180px] bg-card',
											errorHour !== '' && 'ring-1 ring-destructive',
										)}
									>
										<SelectValue placeholder='Selecccionar hora' />
									</SelectTrigger>
									<SelectContent className='max-h-56 w-auto'>
										<ScrollArea
											className={tags.length > 5 ? 'h-56 pr-2' : 'pr-2'}
										>
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
								{errorHour && (
									<div className='text-destructive'>{errorHour}</div>
								)}
							</div>
						</div>
						<ScrollArea className='h-[400px] pr-2'>
							<Accordion type='single' collapsible>
								{quiz.questions
									.get()
									.map((q, index) =>
										q.hasError ? (
											<AsignateIncorrectQuestionItem
												key={q.id}
												question={q}
												index={index}
											/>
										) : (
											<AsignateValidQuestionItem
												key={q.id}
												question={q}
												index={index}
											/>
										),
									)}
							</Accordion>
						</ScrollArea>
						<DialogFooter>
							{quiz.questions.get().some((q) => q.hasError) ? (
								<DialogClose asChild>
									<Button
										variant='destructive'
										type='submit'
										onClick={() => {
											const quizT = quiz.questions
												.get()
												.find((q) => q.hasError);
											ui.scrollForce.set(true);
											ui.scrollToQuestion.set(quizT!.id);
										}}
									>
										Arreglar
									</Button>
								</DialogClose>
							) : (
								<ButtonGradientLoading
									isLoading={isLoading}
									type='submit'
									onClick={async () => {
										if (tags.length == 0) {
											setDate(undefined);
											setErrorHour('Es necesario seleccionar una hora');
										}
										if (!date) {
											setErrorDate('Es necesario seleccionar un día');
											return;
										}
										if (!hour) {
											setErrorHour('Es necesario seleccionar una hora');
											return;
										}
										isLoading.set(true);
										await asignate.mutate(
											{
												quizId: quiz.id.get(),
												date: getTimestampFormDate(actualizarHora(date, hour)),
											},
											{
												onSuccess: () => {
													router.replace(
														animeRumbleRoutes.dashboardQuizzes + '?tabs=active',
													);
												},
												onSettled: () => {
													isLoading.set(false);
												},
											},
										);
									}}
								>
									Asignar
								</ButtonGradientLoading>
							)}
						</DialogFooter>
					</DialogContent>
				</Dialog>
			)}
		</Computed>
	);
};

export default AssignateQuizButton;
