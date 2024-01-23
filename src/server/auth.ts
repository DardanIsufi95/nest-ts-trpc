import {
	getServerSession,
	type DefaultSession,
	type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


import { env } from "~/env";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
	interface Session extends DefaultSession {
		user: {
			id: string;
			// ...other properties
			// role: UserRole;
		} & DefaultSession["user"];
	}

	// interface User {
	//   // ...other properties
	//   // role: UserRole;
	// }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
	callbacks: {
		session: ({ session, token }) => ({
			...session,
			accessToken: token.accessToken,
			user: {
				...session.user,
				id: token.sub,
			}
		}),
		async jwt({ token, user, account, profile }) {
			console.log('jwt', token, user, account, profile);
			return token;
		}
	},
	providers: [
		CredentialsProvider({
			id: "credentials",
			name: "Credentials",
			credentials: {
				username: {
					label: "Username",
					type: "text",
				},
				password: {
					label: "Password",
					type: "password",
				},
			},
			async authorize(credentials ) {
				let user = null;

				if (
					credentials?.username === 'dardan' &&
					credentials?.password === 'dardan'
				) {
					user = {
						id: "1",
						name: "Dardan Isufi",
						email: "test",
					}
				}


				
				if (user) {
					return user;
				} else {
					return null;
				}
			},
			
		}),
	],
	secret: env.NEXTAUTH_SECRET,
	jwt: {
		secret: 'secret',
	},
	session: {
		maxAge: 30 * 24 * 60 * 60, // 30 days
		updateAge: 20, // 20 seconds,
		strategy: 'jwt',
	},
	pages: {
		signIn: "/auth/login",
		signOut: "/auth/logout",
	},
	debug: true
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
