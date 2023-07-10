'use client';

import ActivityCard from '@/components/ui/ActivityCard';

export default function Home() {
	return (
		<div className='container grid grid-cols-3 gap-4 mt-4'>
			<ActivityCard />
			<ActivityCard />
			<ActivityCard />
			<ActivityCard />
			<ActivityCard />
			<ActivityCard />
			<ActivityCard />
		</div>
	);
}
