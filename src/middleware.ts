

import {auth } from '~/server/auth/auth'


import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
  apiTRPCPrefix
} from "./routes";
import { NextResponse } from 'next/server';


export default auth((req) => {

	

	const { nextUrl } = req;
	
	const isLoggedIn = !!req.auth;
	console.log('middleware', nextUrl.href)


	const isTrpcRoute= nextUrl.pathname.startsWith(apiTRPCPrefix)
	const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
	const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
	const isAuthRoute = authRoutes.includes(nextUrl.pathname);
	
	if(isTrpcRoute){
		return NextResponse.next();
	}

	if (isApiAuthRoute) {
	  	return null;
	}

	if (isAuthRoute) {
		if (isLoggedIn) {
			return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
		}
		return null;
	}

	if (!isLoggedIn && !isPublicRoute) {
		let callbackUrl = nextUrl.pathname;
		if (nextUrl.search) {
			callbackUrl += nextUrl.search;
		}

		const encodedCallbackUrl = encodeURIComponent(callbackUrl);

		return NextResponse.redirect(new URL(
			`/auth/login?callbackUrl=${encodedCallbackUrl}`,
			nextUrl
		));
	}

	return null;
})

// //Optionally, don't invoke Middleware on some paths
export const config = {
  	matcher: ['/((?!.+\\.[\\w]+$|_next).*)',  '/(api|trpc)(.*)'],
}
// export const config = {
//     matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
// }

// export const config = {
// 	matcher: [
// 	  /*
// 	   * Match all request paths except for the ones starting with:
// 	   * - api (API routes)
// 	   * - _next/static (static files)
// 	   * - _next/image (image optimization files)
// 	   * - favicon.ico (favicon file)
// 	   */
// 	  {
// 		source: '/((?!api/trpc|_next/static|_next/image|favicon.ico).*)',
		
// 	  },
// 	],
//   }
