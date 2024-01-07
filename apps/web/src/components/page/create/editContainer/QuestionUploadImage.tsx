'use client ';

import { trpc } from '@/trpc/client/client';
import { useObserve } from '@legendapp/state/react';

import useQuiz from '@/hooks/useQuiz';
import {
	useUploadAnime,
	type TypeUploadthingResponse,
} from '@/hooks/useUploadAnime';
import { AspectRatio } from '@ui/AspectRatio';

const QuestionUploadImage = () => {
	const { id, ui } = useQuiz();
	const updateQuestion = trpc.quizz.updateQuestion.useMutation();

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
		await updateQuestion.mutate({
			img,
			quizId: id,
			questionId: ui.questionId.get(),
		});
	};

	const onRemoveImage = async () => {
		await updateQuestion.mutate({
			img: {
				key: null,
				url: null,
			},
			quizId: id,
			questionId: ui.questionId.get(),
		});
	};

	const { UploadFileAnime, setInitialPreview, clearState } = useUploadAnime({
		onClientUploadComplete,
		initialPreview: ui.question.img.get(),
	});

	useObserve(ui.question, () => {
		if (ui.question.img.get()) {
			setInitialPreview(ui.question.img.get());
		} else {
			clearState();
		}
	});

	return (
		<div className='mx-auto w-[60%]'>
			<AspectRatio ratio={16 / 9}>
				<UploadFileAnime mode='auto' onRemoveFile={onRemoveImage} />
			</AspectRatio>
		</div>
	);
};

export default QuestionUploadImage;
