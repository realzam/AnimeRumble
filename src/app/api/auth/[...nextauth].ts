import { users } from '@/db/models/schema';
import { LoginSchema } from '@/schema/auth';
import Database from 'better-sqlite3';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { type NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { comparePassword } from '@/lib/utils';

const sqlite = new Database('sqlite.db');
const db = drizzle(sqlite);

export const nextAuthOptions: NextAuthOptions = {
	providers: [
		Credentials({
			name: 'credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'jsmith@gmail.com',
				},
				password: { label: 'Password', type: 'password' },
			},
			authorize: async (credentials, __) => {
				const creds = await LoginSchema.parseAsync(credentials);

				const usersResults = await db
					.select()
					.from(users)
					.where(eq(users.email, creds.email))
					.limit(1);

				if (usersResults.length === 0) {
					return null;
				}
				const user = usersResults[0];

				const isValidPassword = await comparePassword(
					user.password,
					creds.password,
				);

				if (!isValidPassword) {
					return null;
				}
				return {
					id: user.email,
					email: user.email,
					name: user.name,
				};
			},
		}),
	],
};
