import animeRumbleRoutes from '@/lib/routes';
import ActivityCard from '@web/ActivityCard';

export default function HomePage() {
	return (
		<main className='flex flex-1'>
			<div className='container mt-4 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
				<ActivityCard
					title='Quiz'
					route={animeRumbleRoutes.activityQuizzes}
					icon='/svg/quiz_icon.svg'
				/>
				<ActivityCard
					title='Lotería'
					route={animeRumbleRoutes.activityLoteria}
					icon='/svg/quiz_icon.svg'
					color='red'
				/>
				<ActivityCard
					title='Bingo'
					route={animeRumbleRoutes.activityBingo}
					icon='/svg/quiz_icon.svg'
					color='yellow'
				/>
			</div>
		</main>
	);
}
