import type { Adapter , AdapterUser ,AdapterAccount , AdapterSession, VerificationToken } from '@auth/core/adapters';

const users : AdapterUser[] = [
    {
        id: "1",
        name: "Dardan Isufi",
        email: "test",
        emailVerified: new Date(Date.now() - 1000 * 60 * 60 * 24), 
    }
]

const accounts : AdapterAccount[] = [
    {
        providerAccountId: "1",
        provider: "credentials",
        type: "oauth",
        userId: "1",
    }
]

const sessions : AdapterSession[] = [
    {
        sessionToken: "1",
        userId: "1",
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
    }
]



const verificationTokens : VerificationToken[] = []

export class MyAdapter implements Adapter {

    static  async  createUser(user: AdapterUser){
        
        users.push(user);
        return user;
    }

    static async  getUser(id: string){
        return users.find(user => user.id === id) || null;
    }

    static async  getUserByEmail?(email: string){
        return users.find(user => user.email === email) || null;
    }

    static async  updateUser(user: Partial<AdapterUser> & Pick<AdapterUser, "id">) {
        const updatedUser = users.find(u => u.id === user.id);   
        
        if(!updatedUser){
            throw new Error("User not found");
        }
        return {
            ...updatedUser,
            ...user,
        };
    }

    static async  getUserByAccount(
        providerAccountId: Pick<AdapterAccount, "provider" | "providerAccountId">
    ): Promise<AdapterUser | null> {
        return users.find(user => user.id === providerAccountId.provider && user.email === providerAccountId.providerAccountId) || null;
    }


    static async createSession(session: {
        sessionToken: string
        userId: string
        expires: Date
    }) {
        sessions.push(session);
        return session;
    }

    static async getSessionAndUser(
        sessionToken: string
    ){
        
        const session = sessions.find(s => s.sessionToken === sessionToken);
        if(!session){
            return null;
        }
        const user = users.find(u => u.id === session.userId);
        if(!user){
            return null;
        }
        return {
            session,
            user,
        }
    }

    static async updateSession?(
        session: Partial<AdapterSession> & Pick<AdapterSession, "sessionToken">
    ) {
        const updatedSession = sessions.find(s => s.sessionToken === session.sessionToken);
        if(!updatedSession){
            return null;
        }
        return {
            ...updatedSession,
            ...session,
        }
    }

    static async deleteSession?(
        sessionToken: string
    ) {
        const session = sessions.find(s => s.sessionToken === sessionToken);
        if(!session){
            return null;
        }
        sessions.splice(sessions.indexOf(session), 1);
        return session;
    }

    static async createVerificationToken(
        verificationToken: VerificationToken
    ){
        console.log(verificationToken);
        verificationTokens.push({
            ...verificationToken,
            expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
            identifier: Math.random().toString(36).substring(7),
            token: Math.random().toString(36).substring(7)
        });
        return verificationToken;
    }

    static async useVerificationToken?(params: {
        identifier: string
        token: string
    }) {
        const token = verificationTokens.find(t => t.identifier === params.identifier && t.token === params.token);
        if(!token){
            return null;
        }
        verificationTokens.splice(verificationTokens.indexOf(token), 1);
        return token;
    }
}

