import { PrismaClient, UserRole, UserStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding database...');

    const hashedPassword = await bcrypt.hash('password123', 10);

    // Create 10 users with different roles
    const users = [
        {
            email: 'usman@azeemlab.com',
            name: 'Usman Ghani',
            password: hashedPassword,
            role: UserRole.ADMIN,
            status: UserStatus.ACTIVE,
            phone: '+92-300-1234567',
            country: 'Pakistan',
            department: 'Administration',
        },
        {
            email: 'manager@carexport.com',
            name: 'Manager User',
            password: hashedPassword,
            role: UserRole.MANAGER,
            status: UserStatus.ACTIVE,
            phone: '+81-3-2345-6789',
            country: 'Japan',
            department: 'Customer Relations',
        },
        {
            email: 'dealer1@tokyo.com',
            name: 'Tokyo Auto Dealer',
            password: hashedPassword,
            role: UserRole.DEALER,
            status: UserStatus.ACTIVE,
            phone: '+81-3-3456-7890',
            country: 'Japan',
            department: 'Sales',
        },
        {
            email: 'dealer2@osaka.com',
            name: 'Osaka Motors',
            password: hashedPassword,
            role: UserRole.DEALER,
            status: UserStatus.ACTIVE,
            phone: '+81-6-4567-8901',
            country: 'Japan',
            department: 'Sales',
        },
        {
            email: 'supplier1@parts.com',
            name: 'Premium Auto Parts',
            password: hashedPassword,
            role: UserRole.SUPPLIER,
            status: UserStatus.ACTIVE,
            phone: '+81-3-5678-9012',
            country: 'Japan',
            department: 'Supply Chain',
        },
        {
            email: 'supplier2@logistics.com',
            name: 'Express Logistics Co',
            password: hashedPassword,
            role: UserRole.SUPPLIER,
            status: UserStatus.ACTIVE,
            phone: '+81-3-6789-0123',
            country: 'Japan',
            department: 'Logistics',
        },
        {
            email: 'buyer1@kenya.com',
            name: 'John Kamau',
            password: hashedPassword,
            role: UserRole.BUYER,
            status: UserStatus.ACTIVE,
            phone: '+254-20-1234567',
            country: 'Kenya',
            department: null,
        },
        {
            email: 'buyer2@uganda.com',
            name: 'Sarah Nakato',
            password: hashedPassword,
            role: UserRole.BUYER,
            status: UserStatus.ACTIVE,
            phone: '+256-41-234567',
            country: 'Uganda',
            department: null,
        },
        {
            email: 'buyer3@tanzania.com',
            name: 'Michael Mwangi',
            password: hashedPassword,
            role: UserRole.BUYER,
            status: UserStatus.ACTIVE,
            phone: '+255-22-123456',
            country: 'Tanzania',
            department: null,
        },
        {
            email: 'dealer3@kyoto.com',
            name: 'Kyoto Premium Cars',
            password: hashedPassword,
            role: UserRole.DEALER,
            status: UserStatus.ACTIVE,
            phone: '+81-75-1234-5678',
            country: 'Japan',
            department: 'Sales',
        },
    ];

    console.log('📝 Creating users...');

    for (const userData of users) {
        const user = await prisma.user.upsert({
            where: { email: userData.email },
            update: {},
            create: userData,
        });
        console.log(`✅ Created user: ${user.email} (${user.role})`);
    }

    console.log('✨ Seed completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Total users: ${users.length}`);
    console.log(`   ADMIN: 1`);
    console.log(`   MANAGER: 1`);
    console.log(`   DEALER: 3`);
    console.log(`   SUPPLIER: 2`);
    console.log(`   BUYER: 3`);
    console.log('\n🔐 Default password for all users: password123');
}

main()
    .catch((e) => {
        console.error('❌ Error during seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
