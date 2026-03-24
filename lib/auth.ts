import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { loginSchema } from '@/lib/validations/auth'

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                try {
                    // Validate credentials
                    const { email, password } = loginSchema.parse(credentials)

                    // Find user by email
                    const user = await prisma.user.findUnique({
                        where: { email },
                        select: {
                            id: true,
                            email: true,
                            name: true,
                            password: true,
                            role: true,
                            image: true,
                            siteId: true,
                            companyId: true,
                        },
                    })

                    // Check if user exists
                    if (!user) {
                        return null
                    }

                    // Verify password
                    const isPasswordValid = await bcrypt.compare(password, user.password)

                    if (!isPasswordValid) {
                        return null
                    }

                    // Return user object (without password)
                    return {
                        id: String(user.id), // Convert to string for NextAuth
                        email: user.email,
                        name: user.name,
                        role: user.role,
                        image: user.image,
                        siteId: user.siteId,
                        companyId: user.companyId,
                    }
                } catch (error) {
                    console.error('Authorization error:', error)
                    return null
                }
            },
        }),
    ],

    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },

    pages: {
        signIn: '/login',
        signOut: '/',
        error: '/login',
    },

    callbacks: {
        async jwt({ token, user }) {
            // Add user info to token on sign in
            if (user) {
                token.id = user.id
                token.role = user.role
                token.siteId = user.siteId
                token.companyId = user.companyId
            }
            return token
        },

        async session({ session, token }) {
            // Add user info to session
            if (session.user) {
                session.user.id = token.id as string
                session.user.role = token.role as string
                session.user.siteId = token.siteId as number | null
                session.user.companyId = token.companyId as number | null
            }
            return session
        },
    },

    secret: process.env.NEXTAUTH_SECRET,

    debug: process.env.NODE_ENV === 'development',
    trustHost: true,
})
