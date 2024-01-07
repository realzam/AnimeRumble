'use client';

import { trpc } from '@/trpc/client/client';
import { Memo } from '@legendapp/state/react';

import useDashboardQuizzes from '@/hooks/useDashboardQuizzes';
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

const DeleteQuizAlertDialog = () => {
	const deleteQuiz = trpc.quizz.deleteQuizz.useMutation();
	const { showDeleteDialog, quizTarget, props, closeDeleteDialog } =
		useDashboardQuizzes();
	return (
		<Memo>
			{() => (
				<AlertDialog
					open={showDeleteDialog.get()}
					onOpenChange={() => {
						closeDeleteDialog();
					}}
				>
					<AlertDialogContent>
						<AlertDialogHeader>
							<AlertDialogTitle className='text-destructive'>
								¿Quieres eliminar el quiz?
							</AlertDialogTitle>
							<AlertDialogDescription>
								Esta acción es permanente, se borrara toda la infomación del
								quiz
							</AlertDialogDescription>
						</AlertDialogHeader>
						<AlertDialogFooter>
							<AlertDialogCancel>Cancelar</AlertDialogCancel>
							<AlertDialogAction
								className='bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90'
								onClick={() => {
									deleteQuiz.mutate(
										{
											id: quizTarget.get().id,
										},
										{
											onSuccess: () => {
												props.refetch();
											},
										},
									);
								}}
							>
								Eliminar quiz
							</AlertDialogAction>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			)}
		</Memo>
	);
};

export default DeleteQuizAlertDialog;
