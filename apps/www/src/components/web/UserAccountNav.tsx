import { type Session } from 'next-auth';

import { capitalizeWord } from '@/lib/utils';
import { Badge } from '@ui/Badge';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@ui/DropdownMenu';

import UserAccountNavItemSignOut from './UserAccountNavItemSignOut';
import UserAvatar from './UserAvatar';

interface Props {
	user: Session['user'];
}

const UserAccountNav = ({ user }: Props) => {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger id='user-profile'>
				<UserAvatar user={user} />
			</DropdownMenuTrigger>
			<DropdownMenuContent align='end'>
				<div className='flex items-center justify-start gap-2 p-2'>
					<div className='flex flex-col space-y-1'>
						{user.name && (
							<div className='flex space-x-2'>
								<p className='font-semibold'>{capitalizeWord(user.name)}</p>
								<Badge>{user.role}</Badge>
							</div>
						)}
						{user.email && (
							<p className='max-w-[300px] truncate text-sm'>
								{user.email.toLowerCase()}
							</p>
						)}
					</div>
				</div>
				<DropdownMenuSeparator />
				<UserAccountNavItemSignOut />
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserAccountNav;
