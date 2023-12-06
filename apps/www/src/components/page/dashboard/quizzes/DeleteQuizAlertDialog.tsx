'use client';

import { trpc } from '@/trpc/client/client';
import { Trash2 } from 'lucide-react';

import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from '@ui/AlertDialog';
import { Button } from '@ui/Button';

interface Props {
	quizId: string;
	refetch: () => void;
}
const DeleteQuizAlertDialog = ({ quizId, refetch }: Props) => {
	const deleteQuiz = trpc.quizz.deleteQuizz.useMutation();

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button size='icon' variant='destructive' className='ml-3'>
					<Trash2 />
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle className='text-destructive'>
						Are you absolutely sure?
					</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently delete your
						account and remove your data from our servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction
						onClick={() => {
							deleteQuiz.mutate(
								{
									id: quizId,
								},
								{
									onSuccess: () => {
										refetch();
									},
								},
							);
						}}
					>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default DeleteQuizAlertDialog;
