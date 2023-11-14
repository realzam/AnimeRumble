'use client ';

import { useObserve } from '@legendapp/state/react';
import { type UploadFileResponse } from 'uploadthing/client';

import useQuiz from '@/hooks/useQuiz';
import { useUploadV2 } from '@/hooks/useUploadImage';

const QuestionUploadImage = () => {
	const { id, ui, trpcUtils, props$ } = useQuiz();

	const onClientUploadComplete = async (res?: UploadFileResponse[]) => {
		res ??= [];

		let img:
			| {
					url: string;
					key: string;
			  }
			| undefined = undefined;
		if (res[0]) {
			img = {
				url: res[0].url,
				key: res[0].key,
			};
		}
		await trpcUtils.client.quizz.updateQuestion.mutate({
			img,
			quizId: id,
			questionId: ui.questionId.get(),
		});
		await props$.refetch();
	};

	const onRemoveImage = async () => {
		await trpcUtils.client.quizz.updateQuestion.mutate({
			img: {
				key: null,
				url: null,
			},
			quizId: id,
			questionId: ui.questionId.get(),
		});
		props$.refetch();
	};

	const { UploadImage, setInitialPreview } = useUploadV2({
		onClientUploadComplete,
		initialPreview: ui.question.img.get(),
	});

	useObserve(ui.question, () => {
		setInitialPreview(ui.question.img.get() || '');
	});

	return (
		<div className='w-full'>
			<UploadImage mode='auto' onRemoveImage={onRemoveImage} />
		</div>
	);
};

export default QuestionUploadImage;
