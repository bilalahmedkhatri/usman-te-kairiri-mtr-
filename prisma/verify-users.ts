import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function verifyUsers() {
    console.log('🔍 Verifying users in database...\n');

    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            status: true,
            country: true,
        },
        orderBy: {
            id: 'asc',
        },
    });

    console.log(`✅ Total users found: ${users.length}\n`);

    // Group by role
    const roleGroups = users.reduce((acc, user) => {
        if (!acc[user.role]) acc[user.role] = [];
        acc[user.role].push(user);
        return acc;
    }, {} as Record<string, typeof users>);

    // Display users by role
    Object.entries(roleGroups).forEach(([role, roleUsers]) => {
        console.log(`📋 ${role}: ${roleUsers.length} user(s)`);
        roleUsers.forEach((user) => {
            console.log(`   ${user.id}. ${user.email} - ${user.name} (${user.country})`);
        });
        console.log('');
    });

    console.log('✨ Verification complete!');
}

verifyUsers()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
