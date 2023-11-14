import { CardContent, CardDescription, CardHeader, CardTitle } from '@ui/Card';
import { ScrollArea } from '@ui/ScrollArea';

function DashboardConfigContainer() {
	return (
		<ScrollArea type='always'>
			<CardHeader>
				<CardTitle>Team Members</CardTitle>
				<CardDescription>
					Invite your team members to collaborate.
				</CardDescription>
			</CardHeader>
			<CardContent className='grid gap-6'></CardContent>
		</ScrollArea>
	);
}

export default DashboardConfigContainer;
