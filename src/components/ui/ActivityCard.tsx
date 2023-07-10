import { Card } from './Card';

// container > card > circle > overlay

const ActivityCard = (): JSX.Element => {
	return (
		// container
		<div className='group flex h-72  transition-all ease-out duration-300 hover:scale-105 hover:-translate-y-1.5'>
			{/* card */}
			<Card className='flex items-center shadow-lg flex-col justify-center overflow-hidden relative transition-all duration-300 w-full'>
				{/* circle */}
				<div className='rounded-full flex after:h-28 after:absolute after:w-28 group-hover:border-quiz-light group-hover:after:bg-quiz-light items-center bg-transparent border-2 border-quiz box-content h-36 justify-center relative ease-out duration-300 w-36 z-[1] after:rounded-full after:block after:transition-all after:duration-300'>
					{/* overlay */}
					<div className='rounded-full bg-quiz h-28 absolute w-28 group-hover:scale-[6] origin-center z-0 ease-out duration-500' />
				</div>
				<span className='text-xl font-bold mt-7 z-[100] group-hover:text-slate-100'>
					Quizzes
				</span>
			</Card>
		</div>
	);
};
export default ActivityCard;
