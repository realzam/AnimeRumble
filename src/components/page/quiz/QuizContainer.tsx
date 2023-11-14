import QuizDetailsContiener from './QuizDetailsContiener';
import QuizPageSideBar from './QuizPageSideBar';

const QuizContainer = () => {
	return (
		<div className='relative'>
			<div className='container flex h-[calc(100vh-3.5rem-1px)] py-8'>
				<QuizPageSideBar />
				<QuizDetailsContiener />
			</div>
		</div>
	);
};

export default QuizContainer;
