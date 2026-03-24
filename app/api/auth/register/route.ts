import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { registerSchema } from '@/lib/validations/auth'
import { ZodError } from 'zod'

function formatAppName(domain: string): string {
    return domain
        .replace('.vercel.app', '')
        .replace('.com', '')
        .replace(/[-.]/g, ' ')
        .toUpperCase()
}
export async function POST(request: NextRequest) {
    try {
        // Parse request body
        const body = await request.json()

        // Validate input
        const validatedData = registerSchema.parse(body)

        // Get domain from request headers (Vercel-safe)
        const host = request.headers.get('x-forwarded-host') ||
            request.headers.get('host') ||
            'localhost'

        const domain = host.split(':')[0]

        // Determine app/site name
        const appName = formatAppName(domain) || process.env.APP_NAME || "Te-Kairiri-Motor Japan"    // auto fallback

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: validatedData.email },
        })

        if (existingUser) {
            return NextResponse.json(
                { error: 'Email already registered' },
                { status: 400 }
            )
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(validatedData.password, 12)

        // Get default site (or create one if needed)
        let site = await prisma.site.findFirst({
            where: { domain: domain },
        })

        if (!site) {
            site = await prisma.site.create({
                data: {
                    domain: domain,
                    name: appName,
                    isActive: true,
                },
            })
        }

        // Create user
        const user = await prisma.user.create({
            data: {
                email: validatedData.email,
                name: validatedData.name,
                password: hashedPassword,
                phone: validatedData.phone || null,
                country: validatedData.country || null,
                role: 'BUYER', // Default role
                siteId: site.id,
            },
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                createdAt: true,
            },
        })

        return NextResponse.json(
            {
                message: 'User created successfully',
                user,
            },
            { status: 201 }
        )
    } catch (error) {
        console.error('Registration error:', error)

        // Handle validation errors
        if (error instanceof ZodError) {
            return NextResponse.json(
                {
                    error: 'Validation failed',
                    details: error.errors.map((err) => ({
                        field: err.path.join('.'),
                        message: err.message,
                    })),
                },
                { status: 400 }
            )
        }

        // Handle other errors
        return NextResponse.json(
            { error: 'An error occurred during registration' },
            { status: 500 }
        )
    }
}
