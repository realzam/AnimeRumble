import { type serverClient } from '@/trpc/client/serverClient';

import { CardContent, CardDescription, CardHeader, CardTitle } from '@ui/Card';
import { ScrollArea } from '@ui/ScrollArea';

interface Props {
	members: Awaited<ReturnType<typeof serverClient.user.getMemembers>>;
}
const DashboardMembersContainer = ({}: Props) => {
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
};

export default DashboardMembersContainer;
