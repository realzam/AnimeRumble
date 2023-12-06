import { trpc } from '@/trpc/client/client';
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

type TypeEnum = QuestionType['questionType'];

const QuestionTypeSelect = () => {
	const { id, ui } = useQuiz();
	const updateQuestion = trpc.quizz.updateQuestion.useMutation();
	return (
		<div className='m-2 flex flex-col items-center p-1'>
			<h3 className='mb-2 font-semibold leading-none tracking-tight'>
				Tipo de pregunta
			</h3>
			<Memo>
				{() => (
					<Select
						value={ui.question.questionType.get()}
						onValueChange={(value: TypeEnum) => {
							ui.question.questionType.set(value);
							updateQuestion.mutate({
								questionId: ui.question.id.get(),
								quizId: id,
								questionType: value,
							});
						}}
					>
						<SelectTrigger className='w-[180px]'>
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectItem value='Multiple'>Multiple</SelectItem>
								<SelectItem value='TF'>Verdadero o Falso</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				)}
			</Memo>
		</div>
	);
};

export default QuestionTypeSelect;
