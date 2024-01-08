'use client';

import { Memo } from '@legendapp/state/react';

import usePlayQuiz from '@/hooks/usePlayQuiz';
import { AlertDialog, AlertDialogOverlay } from '@/components/ui/AlertDialog';
import { Spinner } from '@/components/web/Spinner';

const LoadingAnswerDialog = () => {
	const { isLoadingAnswer } = usePlayQuiz();

	return (
		<Memo>
			{() => (
				<AlertDialog open={isLoadingAnswer.get()}>
					<AlertDialogOverlay>
						<div className='flex h-full w-full flex-col items-center justify-center'>
							<div className='h-24 w-24'>
								<Spinner />
							</div>
							<div className='m-2 text-xl'>Cargando...</div>
						</div>
					</AlertDialogOverlay>
				</AlertDialog>
			)}
		</Memo>
	);
};

export default LoadingAnswerDialog;
