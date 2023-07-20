'use client';

import ActivityCard from '@/components/ui/ActivityCard';

export default function Home() {
	return (
		<div className='container grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3'>
			<ActivityCard title='Quizzes' route='/' src='/quiz_icon.svg' />
			<ActivityCard
				title='Loteria'
				colorName='loteria'
				src='/quiz_icon.svg'
				route='/'
			/>
			<ActivityCard
				title='Bingo'
				colorName='bingo'
				src='/quiz_icon.svg'
				route='/'
			/>
		</div>
	);
}
