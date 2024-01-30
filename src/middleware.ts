import { withAuth } from "next-auth/middleware"

export default withAuth({
  // Matches the pages config in `[...nextauth]`
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/error',
  }
})



export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/" , "/(api|trpc)(.*)"],
};