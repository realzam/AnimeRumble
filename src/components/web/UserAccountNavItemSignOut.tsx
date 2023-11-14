'use client';

import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

import { DropdownMenuItem } from '@ui/DropdownMenu';

const UserAccountNavItemSignOut = () => {
	return (
		<DropdownMenuItem
			className='cursor-pointer text-red-600'
			onClick={(e) => {
				e.preventDefault();
				signOut().catch(console.error);
			}}
		>
			Sign Out
			<LogOut className='ml-2 h-4 w-4' />
		</DropdownMenuItem>
	);
};

export default UserAccountNavItemSignOut;
