'use client';

import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

import { DropdownMenuItem } from '@ui/DropdownMenu';

const UserAccountNavItemSignOut = () => {
	return (
		<DropdownMenuItem
			className='w-fit cursor-pointer text-red-600 focus:text-red-800'
			onClick={(e) => {
				e.preventDefault();
				signOut().catch(console.error);
			}}
		>
			Cerrar sesión
			<LogOut className='ml-2 h-4 w-4' />
		</DropdownMenuItem>
	);
};

export default UserAccountNavItemSignOut;
