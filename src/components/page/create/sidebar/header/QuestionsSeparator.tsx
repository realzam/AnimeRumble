import QuizQuestionsLength from './QuizQuestionsLength';

const QuestionsSeparator = () => {
	return (
		<div className='relative'>
			<div className='absolute inset-0 flex items-center'>
				<span className='w-full border-t' />
			</div>
			<div className='relative flex justify-center  uppercase'>
				<span className='bg-background px-2 text-violet-400'>
					<QuizQuestionsLength />
				</span>
			</div>
		</div>
	);
};

export default QuestionsSeparator;
