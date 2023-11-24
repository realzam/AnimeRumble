'use client ';

import { useObserve } from '@legendapp/state/react';

import useQuiz from '@/hooks/useQuiz';
import {
	useUploadImage,
	type TypeUploadthingResponse,
} from '@/hooks/useUploadImage';
import { AspectRatio } from '@ui/AspectRatio';

const QuestionUploadImage = () => {
	const { id, ui, trpcUtils, props$ } = useQuiz();

	const onClientUploadComplete = async (res: TypeUploadthingResponse) => {
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

	const { UploadImage, setInitialPreview } = useUploadImage({
		onClientUploadComplete,
		initialPreview: ui.question.img.get(),
	});

	useObserve(ui.question, () => {
		setInitialPreview(ui.question.img.get() || '');
	});

	return (
		<div className='h-full w-full'>
			<AspectRatio ratio={16 / 9}>
				<UploadImage mode='auto' onRemoveImage={onRemoveImage} />
			</AspectRatio>
		</div>
	);
};

export default QuestionUploadImage;
