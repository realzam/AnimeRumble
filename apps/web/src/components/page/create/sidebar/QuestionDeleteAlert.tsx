'use client';

import { trpc } from '@/trpc/client/client';
import { Memo } from '@legendapp/state/react';

import { sleep } from '@/lib/utils';
import useQuiz from '@/hooks/useQuiz';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from '@ui/AlertDialog';

const QuestionDeleteAlert = () => {
	const deleteQuestion = trpc.quizz.deleteQuestion.useMutation();
	const { setQuestionUiAfterDelete, quiz, props, id, ui, closeDeleteQuestion } =
		useQuiz();

	return (
		<Memo>
			{() => (
				<AlertDialog
					open={ui.showDeleteQuestionAlert.get()}
					onOpenChange={() => {
						closeDeleteQuestion();
					}}
				>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle className='text-destructive'>
								¿Quieres eliminar pregunta?
							</AlertDialogTitle>
							<AlertDialogDescription>
								Una vez eliminado no se podrá recuperar la información
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancelar</AlertDialogCancel>
							<AlertDialogAction
								className='bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90'
								onClick={async (e) => {
									e.preventDefault();
									e.stopPropagation();
									setQuestionUiAfterDelete();
									if (quiz.questions.get().length > 1) {
										await sleep(100);
										deleteQuestion.mutate(
											{
												questionId: ui.targetDeleteQuestion.get(),
												quizId: id,
											},
											{
												onSuccess: () => {
													props.refetch();
												},
											},
										);
									}
									closeDeleteQuestion();
								}}
							>
								Eliminar pregunta
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			)}
		</Memo>
	);
};

export default QuestionDeleteAlert;
