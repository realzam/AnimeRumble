import ActivityCard from '@web/ActivityCard';

export default function HomePage() {
	return (
		<div className='flex min-h-screen flex-col'>
			<main className='flex flex-1'>
				<div className='container mt-4 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
					<ActivityCard title='Quiz' route='/' icon='/svg/quiz_icon.svg' />
					<ActivityCard
						title='Lotería'
						route='/'
						icon='/svg/quiz_icon.svg'
						color='red'
					/>
					<ActivityCard
						title='Bingo'
						route='/'
						icon='/svg/quiz_icon.svg'
						color='yellow'
					/>
				</div>
			</main>
		</div>
	);
}
