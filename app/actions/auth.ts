'use server'

import { signIn } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { loginSchema, registerSchema, type LoginInput, type RegisterInput } from '@/lib/validations/auth'
import bcrypt from 'bcryptjs'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation'

export async function loginAction(data: LoginInput) {
    let success = false;

    try {
        // Validate input data
        const validatedFields = loginSchema.parse(data);

        // Call NextAuth signIn
        await signIn('credentials', {
            email: validatedFields.email,
            password: validatedFields.password,
            redirect: false, // Prevent NextAuth from throwing Next.js redirect
        });

        // If we reach here, signIn didn't throw an AuthError
        success = true;
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return { error: 'Invalid credentials!' };
                default:
                    return { error: 'Something went wrong!' };
            }
        }

        // Handle unexpected errors (excluding NEXT_REDIRECT since we used redirect: false)
        console.error('Login error:', error);
        return { error: 'Something went wrong!' };
    }

    // Redirect must be called outside the try-catch block 
    // down here it will throw NEXT_REDIRECT and Next.js will handle it properly
    if (success) {
        redirect('/dashboard');
    }
}

export async function registerAction(data: RegisterInput) {
    let success = false;

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
            redirect: false,
        })

        success = true;

    } catch (error) {
        if (error instanceof AuthError) {
            console.log('Registration error:', error)
            return { error: 'Registration succeeded, but auto-login failed.' }
        }

        console.error('Registration error:', error)
        return { error: 'Registration failed. Please try again.' }
    }

    // Redirect must be called outside the try-catch block 
    // down here it will throw NEXT_REDIRECT and Next.js will handle it properly
    if (success) {
        redirect('/dashboard');
    }
}
