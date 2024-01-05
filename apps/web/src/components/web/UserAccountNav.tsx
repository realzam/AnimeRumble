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
				<div className='flex w-80 p-4'>
					<div className='shrink-0'>
						<UserAvatar user={user} className='h-16 w-16' />
					</div>
					<div className='ml-4 grow'>
						{user.name && (
							<>
								<span className='mr-2 font-semibold'>
									{`${user.nickName} (${capitalizeWord(user.name)})`}
								</span>
								<Badge>{user.role}</Badge>
							</>
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
