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

type TimeEnum = QuestionType['time'];

const QuestionTimeSelect = () => {
	const { id, ui, trpcUtils, props$ } = useQuiz();
	return (
		<div className='m-2 flex flex-col items-center p-1'>
			<h3 className='mb-2 font-semibold leading-none tracking-tight'>
				Limite Tiempo
			</h3>
			<Memo>
				{() => (
					<Select
						value={ui.question.time.get()}
						onValueChange={(value: TimeEnum) => {
							ui.question.time.set(value);
							trpcUtils.client.quizz.updateQuestion
								.mutate({
									questionId: ui.question.id.get(),
									quizId: id,
									time: value,
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
								<SelectItem value='5'>5 segundos</SelectItem>
								<SelectItem value='10'>10 segundos</SelectItem>
								<SelectItem value='15'>15 segundos</SelectItem>
								<SelectItem value='20'>20 segundos</SelectItem>
								<SelectItem value='30'>30 segundos</SelectItem>
								<SelectItem value='45'>45 segundos</SelectItem>
								<SelectItem value='60'>60 segundos</SelectItem>
								<SelectItem value='90'>90 segundos</SelectItem>
							</SelectGroup>
						</SelectContent>
					</Select>
				)}
			</Memo>
		</div>
	);
};

export default QuestionTimeSelect;
