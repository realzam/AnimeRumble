import bcrypt from 'bcryptjs';

import type { IUserRoles } from '@/interfaces/user';

interface SeedUser {
	name: string;
	email: string;
	role: IUserRoles;
	password: string;
}

interface SeedData {
	users: SeedUser[];
}

export const initialData: SeedData = {
	users: [
		{
			name: 'Sergio Zamorano',
			email: 'sergio@google.com',
			password: bcrypt.hashSync('123456'),
			role: 'admin',
		},
		{
			name: 'Eduardo Rios',
			email: 'eduardo@google.com',
			password: bcrypt.hashSync('123456'),
			role: 'client',
		},
	],
};
