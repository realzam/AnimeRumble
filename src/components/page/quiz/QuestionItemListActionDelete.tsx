'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';

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
	AlertDialogTrigger,
} from '@ui/AlertDialog';
import { Button } from '@ui/Button';

interface Props {
	questionId: string;
}
const QuestionItemListActionDelete = ({ questionId }: Props) => {
	const { setQuestionUiAfterDelete } = useQuiz();
	const [open, setOpen] = useState(false);
	return (
		<AlertDialog open={open} onOpenChange={setOpen}>
			<AlertDialogTrigger asChild>
				<Button
					variant='ghost'
					className='p-1 text-destructive/10 hover:text-destructive'
				>
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
						className='bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90'
						onClick={async (e) => {
							e.preventDefault();
							e.stopPropagation();
							setQuestionUiAfterDelete(questionId);
							setOpen(false);
							// if (quiz.questions.get().length > 1) {
							// 	setQuestionUiAfterDelete(questionId);
							// 	await sleep(1000);
							// 	await trpcUtils.client.quizz.deleteQuestion.mutate({
							// 		questionId,
							// 		quizId: id,
							// 	});
							// 	await props$.refetch();
							// 	setOpen(false);
							// }
						}}
					>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

export default QuestionItemListActionDelete;
