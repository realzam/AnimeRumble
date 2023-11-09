import { env } from '@/env.mjs'; // On server
import * as schema from '@/models';
import { accounts, users } from '@/models';
import { LoginSchema } from '@/schema/auth';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import Database from 'better-sqlite3';
import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
import { getServerSession, type NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { comparePassword } from './utils';

const sqlite = new Database('sqlite.db');
const db = drizzle(sqlite, { schema });
migrate(db, { migrationsFolder: 'drizzle' });

const providerCredentials = Credentials({
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

		const accountResults = await db
			.select()
			.from(accounts)
			.where(eq(accounts.userId, user.id))
			.limit(1);

		if (accountResults.length > 0) {
			console.log('usuario esta registrado con', accountResults[0].provider);
			throw new Error(`Inicia session con ${accountResults[0].provider}`);
		}

		const isValidPassword = await comparePassword(
			creds.password,
			user.password || '',
		);

		if (!isValidPassword) {
			console.log('invalid password');
			throw new Error('Correo o contraseña incorrecto');
		}
		return {
			id: user.id,
			email: user.email,
			name: user.name,
		};
	},
});

export const nextAuthOptions: NextAuthOptions = {
	session: {
		strategy: 'jwt',
	},
	pages: {
		signIn: '/auth/login',
		newUser: '/auth/register',
	},
	adapter: DrizzleAdapter(db),
	providers: [
		GoogleProvider({
			clientId: env.GOOGLE_CLIENT_ID,
			clientSecret: env.GOOGLE_CLIENT_SECRET,
		}),
		providerCredentials,
	],
	callbacks: {
		jwt: async ({ token }) => {
			const dbUser = await db.query.users.findFirst({
				where: eq(users.email, token.email || ''),
			});
			if (dbUser) {
				token.id = dbUser.id;
				token.role = dbUser.role;
			}
			return token;
		},
		session: async ({ session, token }) => {
			if (token && session.user) {
				session.user.id = token.id;
				session.user.name = token.name;
				session.user.email = token.email;
				session.user.image = token.picture;
				session.user.role = token.role;
			}

			return session;
		},
	},
};

export const getAuthSession = () => {
	return getServerSession(nextAuthOptions);
};
