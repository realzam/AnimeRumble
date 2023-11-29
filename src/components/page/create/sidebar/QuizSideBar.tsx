import { Card } from '@ui/Card';

import QuizSideBarHeader from './header/QuizSideBarHeader';
import QuestionsList from './list/QuestionsList';

const QuizSideBar = () => {
	return (
		<div className='col-span-2 hidden h-full flex-col space-y-1 2md:flex'>
			<Card className='flex h-[calc(100vh-3.5rem-1px-65px)] shrink-0 flex-col'>
				<QuizSideBarHeader />
				<QuestionsList />
			</Card>
		</div>
	);
};

export default QuizSideBar;

/* 
<Card className='mr-4 h-full w-80  flex-col'> 

<div className='order-2 col-span-2 flex h-full flex-col space-y-1 2md:order-1'>
*/
