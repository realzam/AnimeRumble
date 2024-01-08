import { Card } from '@/components/ui/Card';
import { ScrollArea } from '@/components/ui/ScrollArea';

import QuestionInput from './QuestionInput';
import QuestionPointsSelect from './QuestionPointsSelect';
import QuestionsAnswersContainer from './QuestionsAnswersContainer';
import QuestionTimeSelect from './QuestionTimeSelect';
import QuestionTypeSelect from './QuestionTypeSelect';
import QuestionUploadImage from './QuestionUploadImage';

const QuizEditContainer = () => {
	return (
		<div className='order-1 col-span-7 flex flex-col 2md:order-2 2md:col-span-5'>
			<Card className='flex h-[calc(100vh-3.5rem-1px-65px)] flex-col overflow-hidden border-0 pr-1 sm:border'>
				<ScrollArea type='always'>
					<div className='px-3'>
						<div className='p-3'>
							<QuestionInput />
						</div>
						<div className='my-5'>
							<QuestionUploadImage />
						</div>
						<div className='my-5 flex justify-between'>
							<QuestionTypeSelect />
							<QuestionTimeSelect />
							<QuestionPointsSelect />
						</div>
						<QuestionsAnswersContainer />
					</div>
				</ScrollArea>
			</Card>
		</div>
	);
};

export default QuizEditContainer;
