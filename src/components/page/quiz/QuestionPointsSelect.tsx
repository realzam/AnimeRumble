import { Memo } from '@legendapp/state/react';

import { type QuestionType } from '@/types/quizQuery';
import useQuiz from '@/hooks/useQuiz';
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@ui/Select';

type PointsEnum = QuestionType['points'];

const QuestionPointsSelect = () => {
	const { id, ui, trpcUtils, props$ } = useQuiz();
	return (
		<div className='m-2 flex flex-col items-center p-1'>
			<h3 className='mb-2 font-semibold leading-none tracking-tight'>Puntos</h3>
			<Memo>
				{() => (
					<Select
						value={ui.question.points.get()}
						onValueChange={(value: PointsEnum) => {
							ui.question.points.set(value);
							trpcUtils.client.quizz.updateQuestion
								.mutate({
									questionId: ui.question.id.get(),
									quizId: id,
									points: value,
								})
								.then(() => {
									props$.refetch();
								});
						}}
					>
						<SelectTrigger className='w-[180px]'>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value='standar'>Normales</SelectItem>
								<SelectItem value='none'>Sin puntos</SelectItem>
								<SelectItem value='double'>Puntos Doble</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				)}
			</Memo>
		</div>
	);
};

export default QuestionPointsSelect;
