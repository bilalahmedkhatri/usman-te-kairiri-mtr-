'use server';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';

export type UserRole = 'ADMIN' | 'MANAGER' | 'USER' | 'DEALER' | 'SUPPLIER' | 'BUYER' | 'VIEWER';
export type UserStatus = 'ACTIVE' | 'INACTIVE';

export type GetUsersParams = {
    page?: number;
    limit?: number;
    search?: string;
    role?: string;
    status?: string;
};

export type UserData = {
    id: number;
    email: string;
    name: string | null;
    phone: string | null;
    role: UserRole;
    status: UserStatus;
    department: string | null;
    createdAt: Date;
};

export type GetUsersResponse = {
    users: UserData[];
    total: number;
    page: number;
    totalPages: number;
    hasMore: boolean;
};

export async function getUsers(params: GetUsersParams = {}): Promise<GetUsersResponse> {
    const page = params.page || 1;
    const limit = params.limit || 20;
    const skip = (page - 1) * limit;

    try {
        // Build where clause for filtering
        const where: any = {};

        // Search across multiple fields
        if (params.search && params.search.trim()) {
            where.OR = [
                { name: { contains: params.search, mode: 'insensitive' } },
                { email: { contains: params.search, mode: 'insensitive' } },
                { phone: { contains: params.search } },
                { department: { contains: params.search, mode: 'insensitive' } },
            ];
        }

        // Filter by role
        if (params.role && params.role !== 'all') {
            where.role = params.role.toUpperCase();
        }

        // Filter by status
        if (params.status && params.status !== 'all') {
            where.status = params.status.toUpperCase();
        }

        // Get total count for pagination
        const total = await prisma.user.count({ where });

        // Get paginated users
        const users = await prisma.user.findMany({
            where,
            select: {
                id: true,
                email: true,
                name: true,
                phone: true,
                role: true,
                status: true,
                department: true,
                createdAt: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
            skip,
            take: limit,
        });

        const totalPages = Math.ceil(total / limit);

        return {
            users: users as UserData[],
            total,
            page,
            totalPages,
            hasMore: page < totalPages,
        };
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to fetch users');
    }
}

// Server action to create a new user
export async function createUser(data: {
    email: string;
    name: string;
    phone?: string;
    role: UserRole;
    status: UserStatus;
    department?: string;
    password: string;
}) {
    try {
        // Check if user with this email already exists
        const existingUser = await prisma.user.findUnique({
            where: { email: data.email },
        });

        if (existingUser) {
            return { success: false, error: 'Email already in use' };
        }

        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(data.password, 12);

        const user = await prisma.user.create({
            data: {
                email: data.email,
                name: data.name,
                phone: data.phone,
                role: data.role,
                status: data.status,
                department: data.department,
                password: hashedPassword,
            },
        });

        return { success: true, user };
    } catch (error) {
        console.error('Error creating user:', error);
        return { success: false, error: 'Failed to create user' };
    }
}

// Server action to update a user
export async function updateUser(
    id: number,
    data: {
        name?: string;
        phone?: string;
        role?: UserRole;
        status?: UserStatus;
        department?: string;
        password?: string;
    }
) {
    try {
        const user = await prisma.user.update({
            where: { id },
            data,
        });

        return { success: true, user };
    } catch (error) {
        console.error('Error updating user:', error);
        return { success: false, error: 'Failed to update user' };
    }
}

// Server action to delete a user
export async function deleteUser(id: number) {
    try {
        await prisma.user.delete({
            where: { id },
        });

        return { success: true };
    } catch (error) {
        console.error('Error deleting user:', error);
        return { success: false, error: 'Failed to delete user' };
    }
}
