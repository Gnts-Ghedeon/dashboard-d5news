import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import axios from "@/lib/axios";

type Credentials = {
    email: string | undefined;
    password: string | undefined;
}

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials: Credentials | undefined, req) {
                if (!credentials) {
                    return null;
                }
                const { email, password } = credentials;
                try {
                    const response = await axios.post("/auth/login", { email, password }, { withCredentials: true });
                    
                    if (response.data && response.data.statusCode === 201) {
                        return { ...response.data.user }
                    }
                } catch (error) {
                    console.error(error)
                }

                return null
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt' as const
    },
    pages: {
        signIn: "/signin"
    },
    callbacks: {
        async jwt({ token, user, account }: { token: any; user: any; account: any }) {
            
            if (user && account) {
                return { ...token, ...user }
            }
            return token
        },
        async session({ session, token }: { session: any; token: any }) {
            return { ...session.user, ...token }
        }
    }
}

const authHandler = NextAuth(authOptions)

export default async function handler(...params: any) {
    await authHandler(...params)
}
