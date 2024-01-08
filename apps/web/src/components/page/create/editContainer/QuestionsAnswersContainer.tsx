import {
	Memo,
	useComputed,
	useObservable,
	useObserve,
} from '@legendapp/state/react';

import useQuiz from '@/hooks/useQuiz';
import {
	Tooltip,
	TooltipArrow,
	TooltipContent,
	TooltipTrigger,
} from '@ui/Tooltip';

import QuestionAnswersTypeContainer from './QuestionAnswersTypeContainer';

const QuestionsAnswersContainer = () => {
	const { ui } = useQuiz();
	const showError = useObservable(
		() =>
			ui.questionVolatile.errors[1].get() !== '' ||
			ui.questionVolatile.errors[2].get() !== '',
	);

	const errorMsg = useComputed(() => {
		let msg = '';
		if (ui.questionVolatile.errors[1].get() !== '') {
			msg = ui.questionVolatile.errors[1].get();
		} else if (ui.questionVolatile.errors[2].get() !== '') {
			msg = ui.questionVolatile.errors[2].get();
		}
		return msg;
	});

	useObserve(ui.questionVolatile, () => {
		showError.set(
			ui.questionVolatile.errors[1].get() !== '' ||
				ui.questionVolatile.errors[2].get() !== '',
		);
	});

	return (
		<Memo>
			{() => (
				<Tooltip open={showError.get()}>
					<TooltipTrigger asChild>
						<span tabIndex={0}>
							<QuestionAnswersTypeContainer />
						</span>
					</TooltipTrigger>
					<TooltipContent side='top'>
						<TooltipArrow />
						<Memo>{errorMsg}</Memo>
					</TooltipContent>
				</Tooltip>
			)}
		</Memo>
	);
};

export default QuestionsAnswersContainer;
