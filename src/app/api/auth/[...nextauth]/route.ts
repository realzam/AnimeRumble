// import { users } from '@/db/models/schema';
// import { LoginSchema } from '@/schema/auth';
// import Database from 'better-sqlite3';
// import { eq } from 'drizzle-orm';
// import { drizzle } from 'drizzle-orm/better-sqlite3';
// import NextAuth, { type NextAuthOptions } from 'next-auth';
// import Credentials from 'next-auth/providers/credentials';

// import { comparePassword } from '@/lib/utils';

// const sqlite = new Database('sqlite.db');
// const db = drizzle(sqlite);

// const nextAuthOptions: NextAuthOptions = {
// 	providers: [
// 		Credentials({
// 			name: 'credentials',
// 			id: 'credentials',
// 			credentials: {
// 				email: {
// 					label: 'Email',
// 					type: 'email',
// 				},
// 				password: { label: 'Password', type: 'password' },
// 			},
// 			authorize: async (credentials, _) => {
// 				const creds = await LoginSchema.parseAsync(credentials);

// 				const usersResults = await db
// 					.select()
// 					.from(users)
// 					.where(eq(users.email, creds.email))
// 					.limit(1);

// 				if (usersResults.length === 0) {
// 					console.log('no user');
// 					throw new Error('Correo o contraseña incorrecto');
// 				}
// 				const user = usersResults[0];

// 				const isValidPassword = await comparePassword(
// 					creds.password,
// 					user.password,
// 				);

// 				if (!isValidPassword) {
// 					console.log('invalid password');
// 					throw new Error('Correo o contraseña incorrecto');
// 				}
// 				return {
// 					id: user.email,
// 					email: user.email,
// 					name: user.name,
// 				};
// 			},
// 		}),
// 	],
// 	session: {
// 		strategy: 'jwt',
// 	},
// 	callbacks: {
// 		jwt: async ({ token, user }) => {
// 			if (user) {
// 				token.id = user.id;
// 				token.email = user.email;
// 				token.name = user.name;
// 			}

// 			return token;
// 		},
// 		session: async ({ session, token }) => {
// 			if (token) {
// 				session.user = { email: token.email, name: token.name };
// 			}

// 			return session;
// 		},
// 	},
// 	jwt: {
// 		secret: 'super-secret',
// 		maxAge: 15 * 24 * 30 * 60,
// 	},
// 	pages: {
// 		signIn: '/auth/login',
// 		newUser: '/auth/register',
// 	},
// };

// const handler = NextAuth(nextAuthOptions);

// export { handler as GET, handler as POST };

import NextAuth, { type NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

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
			authorize: async () => {
				return {
					id: 'dksdjksdj',
					email: 'nino@google.com',
					name: 'nino',
				};
			},
		}),
	],
	pages: {
		signIn: '/auth/login',
		newUser: '/auth/register',
	},
	session: {
		strategy: 'jwt',
	},
	callbacks: {
		async jwt({ token, user }) {
			if (user) token.user = user;
			return token;
		},
		async session({ session, token }) {
			session.user = {
				email: token.email,
				name: token.email,
			};
			return session;
		},
	},
};

const handler = NextAuth(nextAuthOptions);
export { handler as GET, handler as POST };
