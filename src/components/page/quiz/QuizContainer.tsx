// import { useRef } from 'react';

import QuizDetailsContiener from './QuizDetailsContiener';
import QuizPageSideBar from './QuizPageSideBar';

const QuizContainer = () => {
	// const renderCount = ++useRef(0).current;
	return (
		<div className='relative'>
			{/* <div className='absolute left-1 top-1'>Renders: {renderCount}</div> */}
			<div className='container flex h-[calc(100vh-3.5rem-1px)] py-8'>
				<QuizPageSideBar />
				<QuizDetailsContiener />
			</div>
		</div>
	);
};

export default QuizContainer;
