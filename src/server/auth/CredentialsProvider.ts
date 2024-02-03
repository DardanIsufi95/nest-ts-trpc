import CredentialsProvider from "next-auth/providers/credentials";
import { NextResponse } from "next/server";
import { z } from "zod";


export const credentialsSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(1),
});

export type credentialsType = z.infer<typeof credentialsSchema>;


export default CredentialsProvider({
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
    async authorize(_credentials ) {

        const credentials = credentialsSchema.safeParse(_credentials);

        if (!credentials.success) {
            return null;
        }

        const { username, password } = credentials.data;


        //return null;


        
        return {
            id: "1",
            name: username,
            email: username,
            image: "https://avatars.githubusercontent.com/u/1396951?v=4",
        }

        
        
    },
    type: "credentials",
})