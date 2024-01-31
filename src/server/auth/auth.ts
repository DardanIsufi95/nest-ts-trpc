import NextAuth, { AuthError, DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import { env } from "~/env";
import db from "~/server/db";


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

class TestError extends AuthError {
	constructor() {
		super({
			errorCode: 'test',
			error: 'test',
			statusCode: 401,
			message: 'test',
		});
	}

}


export const {auth , signIn, signOut, handlers : {GET , POST}} = NextAuth({
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
				console.log(credentials);
				


				if (typeof credentials?.username != 'string' || typeof credentials?.password != 'string') {
					return null;
				}
				
				const {dataSet } = await db.sp.getUserByUsernameAndPassword(credentials.username, credentials.password)
				const [userRow] = dataSet;
				const userObj =userRow?.[0] ?? null;

				throw new TestError();
				
				return userObj

				
				
			},
			
			
		}),
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
	debug: true
});