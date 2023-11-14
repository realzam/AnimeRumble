'use client';

import { enableReactComponents } from '@legendapp/state/config/enableReactComponents';

import { Card } from '@ui/Card';
import { ScrollArea } from '@ui/ScrollArea';

import QuestionAnswersTypeContainer from './QuestionAnswersTypeContainer';
import QuestionPointsSelect from './QuestionPointsSelect';
import QuestionTimeSelect from './QuestionTimeSelect';
import QuestionUploadImage from './QuestionUploadImage';
import QuizQuestionInput from './QuizQuestionInput';

enableReactComponents();

const QuizDetailsContiener = () => {
	return (
		<Card className='flex w-full flex-col py-8 pl-4 pr-2'>
			<ScrollArea type='always'>
				<div>
					<div className='p-1'>
						<QuizQuestionInput />
					</div>
					<div className='my-5 flex h-80 items-center justify-between'>
						<QuestionTimeSelect />
						<QuestionUploadImage />
						<QuestionPointsSelect />
					</div>
					<QuestionAnswersTypeContainer />
				</div>
			</ScrollArea>
		</Card>
	);
};

export default QuizDetailsContiener;
