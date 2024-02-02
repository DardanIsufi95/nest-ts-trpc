import NextAuth, { AuthError, DefaultSession, NextAuthConfig } from "next-auth";

import { env } from "~/env";

import CredentialsProvider from "~/server/auth/CredentialsProvider"


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


export const authOptions : NextAuthConfig = {
	providers: [
		CredentialsProvider
	],
	secret: env.NEXTAUTH_SECRET,
    jwt:{
        maxAge: 30 * 24 * 60 * 60, // 30 days
        
    
    },
	session: {
		maxAge: 30 * 24 * 60 * 60, // 30 days
		updateAge: 20, // 20 seconds,
		strategy: 'jwt',
	},
	pages:{
		signIn: '/auth/login',
		signOut: '/auth/logout',
		error: '/auth/login',
	},
	debug: false
}

export const {auth , signIn, signOut, handlers : {GET , POST}} = NextAuth(authOptions);