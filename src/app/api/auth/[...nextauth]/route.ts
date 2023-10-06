import { users } from '@/db/models';
import { LoginSchema } from '@/schema/auth';
import Database from 'better-sqlite3';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import NextAuth, { type NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { comparePassword } from '@/lib/utils';

const sqlite = new Database('sqlite.db');
const db = drizzle(sqlite);

const nextAuthOptions: NextAuthOptions = {
	providers: [
		Credentials({
			name: 'credentials',
			id: 'credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
				},
				password: { label: 'Password', type: 'password' },
			},
			authorize: async (credentials) => {
				const creds = await LoginSchema.parseAsync(credentials);

				const usersResults = await db
					.select()
					.from(users)
					.where(eq(users.email, creds.email))
					.limit(1);

				if (usersResults.length === 0) {
					console.log('no user');
					throw new Error('Correo o contraseña incorrecto');
				}
				const user = usersResults[0];

				const isValidPassword = await comparePassword(
					creds.password,
					user.password,
				);

				if (!isValidPassword) {
					console.log('invalid password');
					throw new Error('Correo o contraseña incorrecto');
				}
				return {
					id: 'dksdjksdj',
					email: user.email,
					name: user.name,
				};
			},
		}),
	],
	pages: {
		signIn: '/auth/login',
		newUser: '/auth/register',
	},
	jwt: {
		maxAge: 15 * 24 * 30 * 60,
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.user = user;
			}
			return token;
		},
		async session({ session, token }) {
			session.user = {
				email: token.email,
				name: token.name,
			};
			return session;
		},
	},
};

const handler = NextAuth(nextAuthOptions);
export { handler as GET, handler as POST };
