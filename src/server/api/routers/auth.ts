
import { publicProcedure ,protectedProcedure, createTRPCRouter } from "../trpc";
import { signIn , signOut } from "~/server/auth/auth";
import { credentialsSchema } from "~/server/auth/CredentialsProvider";



export const authRouter = createTRPCRouter({
    login: publicProcedure
        .input(credentialsSchema)
        .mutation(async ({ input, ctx }) => {
            
            try {
                await signIn('credentials',{
                    ...input,
                    redirect: false,
                })
                return {
                    success: true,
                };
            }catch(error){
                console.log(error);
                return {
                    success: false,
                }
            }
            
            
        }),
    me: protectedProcedure.query(({ input , ctx }) => {
        return ctx.session.user;
    }),
    test: publicProcedure.query(({ input , ctx }) => {
        return {
            success: true,
        };
    }) ,
    logout: protectedProcedure.mutation(async ({ input , ctx }) => {
        await signOut();
    })
})