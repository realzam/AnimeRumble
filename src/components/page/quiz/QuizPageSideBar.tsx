import { Card } from '@ui/Card';
import { Separator } from '@ui/Separator';

import ListQuizzes from './ListQuizzes';
import QuizPageSideBarHeader from './QuizPageSideBarHeader';

const QuizPageSideBar = () => {
	return (
		<Card className='mr-4 flex h-full w-80 shrink-0 flex-col'>
			<QuizPageSideBarHeader />
			<Separator />
			<ListQuizzes />
		</Card>
	);
};

export default QuizPageSideBar;
