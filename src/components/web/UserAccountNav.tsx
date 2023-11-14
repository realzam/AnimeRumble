import Link from 'next/link';
import { type Session } from 'next-auth';

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
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
						{user.name && <p className='font-medium'>{user.name}</p>}
						{user.email && (
							<p className='w-[200px] truncate text-sm '>{user.email}</p>
						)}
					</div>
				</div>
				<DropdownMenuSeparator />
				<DropdownMenuItem asChild>
					<Link href='/'>Meow</Link>
				</DropdownMenuItem>
				<UserAccountNavItemSignOut />
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserAccountNav;
