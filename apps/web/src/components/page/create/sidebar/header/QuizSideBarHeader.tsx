import { CardDescription, CardHeader, CardTitle } from '@ui/Card';

import AddQuestionButton from './AddQuestionButton';
import QuestionsSeparator from './QuestionsSeparator';
import QuizDescription from './QuizDescription';
import QuizTitle from './QuizTitle';
import UpdateQuizButton from './UpdateQuizButton';

const QuizSideBarHeader = () => {
	return (
		<CardHeader className='space-y-2'>
			<div className='flex justify-between'>
				<CardTitle className='flex h-9 items-center justify-between'>
					<span className='truncate'>
						<QuizTitle />
					</span>
				</CardTitle>
				<UpdateQuizButton />
			</div>
			<CardDescription>
				<QuizDescription />
			</CardDescription>
			<AddQuestionButton />
			<QuestionsSeparator />
		</CardHeader>
	);
};

export default QuizSideBarHeader;
