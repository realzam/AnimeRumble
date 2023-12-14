import usePlayQuiz from '@/hooks/usePlayQuiz';

const PlayQuizShowQuestion = () => {
	const { question } = usePlayQuiz();
	return (
		<div className='text-5xl flex h-[calc(100vh-3.5rem-1px)] items-center justify-center overflow-hidden p-2 text-center'>
			<h3 className='animate-jump-in select-none animate-once animate-ease-out'>
				{question.question}
			</h3>
		</div>
	);
};

export default PlayQuizShowQuestion;
