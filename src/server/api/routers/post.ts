import { z } from "zod";
import { signIn } from "~/server/auth/auth";

import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "~/server/api/trpc";

let post = {
	id: 1,
	name: "Hello World",
};

export const postRouter = createTRPCRouter({
	login: publicProcedure
		.input(z.object({ username: z.string(), password: z.string() }))
		.mutation(async ({ input, ctx }) => {
			return signIn('credentials',input).catch((error: unknown) => {
				if (error instanceof Error) {
					console.log(error);
					return {
						error: error.message ?? "An error occurred",
					};
				}
				// Handle case where error is not an instance of Error
				return {
					error: "An error occurred",
				};
			});
		}),
	hello: protectedProcedure
		.input(z.object({ text: z.string() }))
		.query(({ input , ctx }) => {
	 
			return {
				greeting: `Hello ${ctx.session.user.name} ${input.text}`,
			};
		}),
	me: protectedProcedure.query(({ input , ctx }) => {
		return ctx.session.user;
	}),
	testfunction: publicProcedure
		.input(
			z.object({
				text: z.string(),
			})
		)
		.query(({ input }) => {

			
			return {
				greeting: `Hello ${input.text}`,
			};
		}),
	create: protectedProcedure
		.input(z.object({ name: z.string().min(1) }))
		.mutation(async ({ input }) => {
			// simulate a slow db call
			await new Promise((resolve) => setTimeout(resolve, 1000));

			post = { id: post.id + 1, name: input.name };
			return post;
		}),

	getLatest: protectedProcedure.query(() => {
		return post;
	}),

	getSecretMessage: protectedProcedure.query(() => {
		return "you can now see this secret message!";
	}),
});
