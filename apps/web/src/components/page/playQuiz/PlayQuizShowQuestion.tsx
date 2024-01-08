import { Memo } from '@legendapp/state/react';

import usePlayQuiz from '@/hooks/usePlayQuiz';

const PlayQuizShowQuestion = () => {
	const { questionUser } = usePlayQuiz();
	return (
		<div className='flex h-[calc(100vh-3.5rem-1px)] items-center justify-center overflow-hidden p-2 text-center text-xl md:text-5xl'>
			<h3 className='animate-jump-in select-none animate-once animate-ease-out'>
				<Memo>{questionUser.question}</Memo>
			</h3>
		</div>
	);
};

export default PlayQuizShowQuestion;
