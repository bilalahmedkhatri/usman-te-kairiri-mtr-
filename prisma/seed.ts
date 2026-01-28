import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
    console.log('🌱 Starting database seed...')

    // Create default site
    const site = await prisma.site.upsert({
        where: { domain: 'localhost' },
        update: {},
        create: {
            domain: 'localhost',
            name: 'Hokira International',
            isActive: true,
            themeConfig: {
                primaryColor: 'hsl(0 72% 51%)',
                secondaryColor: 'hsl(24 95% 53%)',
                logo: '/logo.png',
            },
            contactInfo: {
                email: 'info@hokirainternational.org',
                phone: '+1234567890',
                address: 'Tokyo, Japan',
                whatsapp: '+1234567890',
            },
            defaultCurrency: 'USD',
        },
    })
    console.log('✅ Created site:', site.name)

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 12)

    const admin = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
            email: 'admin@example.com',
            name: 'Admin User',
            password: hashedPassword,
            role: 'ADMIN',
            siteId: site.id,
            emailVerified: new Date(),
        },
    })
    console.log('✅ Created admin user:', admin.email)

    // Create test buyer
    const buyerPassword = await bcrypt.hash('buyer123', 12)

    const buyer = await prisma.user.upsert({
        where: { email: 'buyer@example.com' },
        update: {},
        create: {
            email: 'buyer@example.com',
            name: 'Test Buyer',
            password: buyerPassword,
            role: 'BUYER',
            siteId: site.id,
            country: 'Kenya',
            phone: '+254123456789',
        },
    })
    console.log('✅ Created buyer user:', buyer.email)

    // Create currencies
    const currencies = [
        { code: 'USD', symbol: '$', name: 'US Dollar' },
        { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
        { code: 'EUR', symbol: '€', name: 'Euro' },
        { code: 'GBP', symbol: '£', name: 'British Pound' },
        { code: 'KES', symbol: 'KSh', name: 'Kenyan Shilling' },
    ]

    for (const currency of currencies) {
        await prisma.currency.upsert({
            where: { code: currency.code },
            update: {},
            create: currency,
        })
    }
    console.log('✅ Created currencies')

    // Create ports
    const ports = [
        { name: 'Yokohama', country: 'Japan', region: 'East Asia', isDestination: false },
        { name: 'Tokyo', country: 'Japan', region: 'East Asia', isDestination: false },
        { name: 'Mombasa', country: 'Kenya', region: 'East Africa', isDestination: true },
        { name: 'Dar es Salaam', country: 'Tanzania', region: 'East Africa', isDestination: true },
        { name: 'Durban', country: 'South Africa', region: 'Southern Africa', isDestination: true },
        { name: 'Dubai', country: 'UAE', region: 'Middle East', isDestination: true },
    ]

    for (const port of ports) {
        await prisma.port.create({
            data: port,
        })
    }
    console.log('✅ Created ports')

    // Create sample vehicles
    const vehicles = [
        {
            stockNumber: 'TYT-001',
            vinChassis: 'JT2BF18K0X0123456',
            make: 'Toyota',
            model: 'Harrier',
            yearManufacture: 2018,
            yearRegistration: 2018,
            priceFob: 15000,
            status: 'AVAILABLE' as const,
            featured: true,
            siteId: site.id,
            specs: {
                create: {
                    engineCode: '2AZ-FE',
                    engineCc: 2400,
                    fuelType: 'Petrol',
                    transmission: 'FAT',
                    driveType: '4WD',
                    steering: 'RHD',
                    seats: 5,
                    doors: 5,
                    colorExterior: 'Pearl White',
                    colorInterior: 'Black Leather',
                    trimGrade: '240G Premium',
                    mileageKm: 45000,
                    vehicleType: 'SUV',
                    options: {
                        sunroof: true,
                        leather: true,
                        navigation: true,
                        backCamera: true,
                    },
                },
            },
            logistics: {
                create: {
                    lengthCm: 470,
                    widthCm: 183,
                    heightCm: 169,
                    m3: 14.5,
                    weightKg: 1650,
                    originCountry: 'Japan',
                    inspectionStatus: 'passed',
                    exportCertStatus: true,
                },
            },
        },
        {
            stockNumber: 'TYT-002',
            vinChassis: 'JT2BF18K0X0123457',
            make: 'Toyota',
            model: 'Land Cruiser',
            yearManufacture: 2020,
            yearRegistration: 2020,
            priceFob: 45000,
            status: 'AVAILABLE' as const,
            featured: true,
            siteId: site.id,
            specs: {
                create: {
                    engineCode: '1VD-FTV',
                    engineCc: 4500,
                    fuelType: 'Diesel',
                    transmission: 'FAT',
                    driveType: '4WD',
                    steering: 'RHD',
                    seats: 7,
                    doors: 5,
                    colorExterior: 'Black',
                    colorInterior: 'Beige Leather',
                    trimGrade: 'ZX',
                    mileageKm: 25000,
                    vehicleType: 'SUV',
                    options: {
                        sunroof: true,
                        leather: true,
                        navigation: true,
                        backCamera: true,
                        cruiseControl: true,
                    },
                },
            },
            logistics: {
                create: {
                    lengthCm: 490,
                    widthCm: 197,
                    heightCm: 188,
                    m3: 18.2,
                    weightKg: 2500,
                    originCountry: 'Japan',
                    inspectionStatus: 'passed',
                    exportCertStatus: true,
                },
            },
        },
    ]

    for (const vehicle of vehicles) {
        await prisma.vehicle.create({
            data: vehicle,
        })
    }
    console.log('✅ Created sample vehicles')

    console.log('🎉 Seed completed successfully!')
    console.log('\n📝 Test Credentials:')
    console.log('Admin: admin@example.com / admin123')
    console.log('Buyer: buyer@example.com / buyer123')
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
