import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import axios from "@/lib/axios";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            credentials: {},
            async authorize(credentials, req) {
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
        strategy: "jwt"
    },
    pages: {
        signIn: "/signin"
    },
    callbacks: {
        async jwt({ token, user, account }) {
            
            if (user && account) {
                return { ...token, ...user }
            }
            return token
        },
        async session({ session, token }) {
            return { ...session.user, ...token }
        }
    }
}

const authHandler = NextAuth(authOptions)

export default async function handler(...params) {
    await authHandler(...params)
}
