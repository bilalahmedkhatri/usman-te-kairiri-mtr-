'use server'

import { signIn } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { loginSchema, registerSchema, type LoginInput, type RegisterInput } from '@/lib/validations/auth'
import bcrypt from 'bcryptjs'
import { AuthError } from 'next-auth'

export async function loginAction(data: LoginInput) {
    try {
        const validatedFields = loginSchema.parse(data)

        await signIn('credentials', {
            email: validatedFields.email,
            password: validatedFields.password,
            redirectTo: '/dashboard',
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'Invalid credentials!' }
                default:
                    return { error: 'Something went wrong!' }
            }
        }
        throw error // Re-throw redirect errors
    }
}

export async function registerAction(data: RegisterInput) {
    try {
        const validatedFields = registerSchema.parse(data)

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email: validatedFields.email },
        })

        if (existingUser) {
            return { error: 'Email already in use!' }
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(validatedFields.password, 10)

        // Create user
        await prisma.user.create({
            data: {
                name: validatedFields.name,
                email: validatedFields.email,
                password: hashedPassword,
                role: 'BUYER', // Default role
            },
        })

        // Auto login after registration
        await signIn('credentials', {
            email: validatedFields.email,
            password: validatedFields.password,
            redirectTo: '/dashboard',
        })

    } catch (error) {
        if (error instanceof AuthError) {
            throw error // Re-throw redirect errors from signIn
        }
        console.error('Registration error:', error)
        return { error: 'Registration failed. Please try again.' }
    }
}
