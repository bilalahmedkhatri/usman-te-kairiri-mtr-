import { PrismaClient, VehicleStatus } from '@prisma/client';
import { readFileSync } from 'fs';
import { join } from 'path';

const prisma = new PrismaClient();

async function executeSeedSql() {
    try {
        const sqlPath = join(__dirname, 'seed.sql');
        const sql = readFileSync(sqlPath, 'utf8');

        console.log('📝 Executing seed.sql...');

        // Execute the SQL script. 
        // Note: We use executeRawUnsafe. In some environments, multiple statements might need splitting.
        // For PostgreSQL, this usually works for the whole script.
        await prisma.$executeRawUnsafe(sql);
        console.log('✅ seed.sql executed successfully');
    } catch (error: any) {
        if (error.code === 'P2010' || error.message.includes('already exists') || error.message.includes('unique constraint')) {
            console.warn('⚠️ seed.sql execution finished (some data might already exist)');
        } else {
            console.error('❌ Error executing seed.sql:', error);
            // We don't throw here to allow the vehicle seeding to attempt to run
        }
    }
}

async function main() {
    // 1. Run the SQL seed first
    // await executeSeedSql();

    console.log('🚗 Seeding vehicles...');

    // Get siteId (use the first site or create a default one)
    let site = await prisma.site.findFirst();
    if (!site) {
        site = await prisma.site.create({
            data: {
                domain: 'default.carexport.com',
                name: 'Default Car Export Site',
                isActive: true,
            },
        });
        console.log(`✅ Created default site: ${site.name}`);
    }

    // Get dealer users for vehicle assignment
    const dealers = await prisma.user.findMany({
        where: { role: 'DEALER' },
        select: { id: true, email: true, name: true },
    });

    if (dealers.length === 0) {
        console.error('❌ No dealers found! Please run user seed first.');
        return;
    }

    console.log(`📋 Found ${dealers.length} dealers`);

    // Vehicle data based on data/cars.ts
    const vehiclesData: Array<any> = [
        {
            stockNumber: 'car-001',
            vinChassis: 'JTM-SUPRA-2024-001',
            make: 'Toyota',
            model: 'Supra XT GR',
            yearManufacture: 2024,
            yearRegistration: 2024,
            priceFob: 85000,
            status: VehicleStatus.AVAILABLE as VehicleStatus,
            featured: true,
            siteId: site.id,
            description: 'The legendary Toyota Supra GR returns with breathtaking performance and iconic design. This 2024 model features the powerful 3.0L twin-turbocharged engine producing 382hp, paired with a quick-shifting 8-speed automatic transmission. Finished in pristine white with black leather interior, this sports car is ready to deliver pure driving excitement.',
            spec: {
                engineCode: 'B58',
                engineCc: 3000,
                fuelType: 'Gasoline',
                transmission: 'Automatic',
                driveType: 'RWD',
                steering: 'Right',
                seats: 2,
                doors: 2,
                colorExterior: 'White',
                colorInterior: 'Black',
                trimGrade: 'XT GR',
                mileageKm: 2500,
                vehicleType: 'Sports Car',
                options: {
                    features: ['Adaptive Cruise Control', 'Wireless Apple CarPlay', 'Launch Control', 'Sport Exhaust', 'Carbon Fiber Trim', 'Heated Seats', 'Premium Sound System'],
                    badges: 'Hot'
                },
            },
            logistics: {
                originCountry: 'Japan',
                currentPortId: 'Tokyo',
                inspectionStatus: 'Passed',
                exportCertStatus: true,
            },
            images: [
                { url: '/static/vehicle_images/Honda_black/Honda_black_1.jpeg', isPrimary: true, order: 0 },
                { url: '/static/vehicle_images/Honda_black/Honda_black_2.jpeg', order: 1 },
                { url: '/static/vehicle_images/Honda_black/Honda_black_3.jpeg', order: 2 },
                { url: '/static/vehicle_images/Honda_black/Honda_black_4.jpeg', order: 3 },
                { url: '/static/vehicle_images/Honda_black/Honda_black_5.jpeg', order: 4 },
                { url: '/static/vehicle_images/Honda_black/Honda_black_6.jpeg', order: 5 },
                { url: '/static/vehicle_images/Honda_black/Honda_black_7.jpeg', order: 6 },
                { url: '/static/vehicle_images/Honda_black/Honda_black_8.jpeg', order: 7 },
                { url: '/static/vehicle_images/Honda_black/Honda_black_9.jpeg', order: 8 },
            ],
        },
        {
            stockNumber: 'car-002',
            vinChassis: 'JNK-GTR-2023-002',
            make: 'Nissan',
            model: 'GT-R Nismo',
            yearManufacture: 2023,
            yearRegistration: 2023,
            priceFob: 210000,
            status: VehicleStatus.AVAILABLE,
            featured: true,
            siteId: site.id,
            description: 'The ultimate expression of Japanese engineering - the Nissan GT-R Nismo. This 2023 model has been meticulously maintained with only 1,500km on the odometer. Hand-built 3.8L V6 producing 600hp, advanced ATTESA all-wheel drive system, and Nismo-exclusive carbon fiber components.',
            spec: {
                engineCode: 'VR38DETT',
                engineCc: 3800,
                fuelType: 'Gasoline',
                transmission: 'Automatic',
                driveType: 'AWD',
                steering: 'Right',
                seats: 4,
                doors: 2,
                colorExterior: 'Pearl White',
                colorInterior: 'Black/Red',
                trimGrade: 'Nismo',
                mileageKm: 1500,
                vehicleType: 'Sports Car',
                options: {
                    features: ['ATTESA AWD', 'Nismo Tuning', 'Carbon Ceramic Brakes', 'Recaro Seats', 'Carbon Fiber Body', 'Track Package', 'Launch Control'],
                    badges: 'Premium'
                },
            },
            logistics: {
                originCountry: 'Japan',
                currentPortId: 'Osaka',
                inspectionStatus: 'Passed',
                exportCertStatus: true,
            },
            images: [
                { url: '/static/vehicle_images/Honda_black_CVR/Honda_black_CVR_1.jpeg', isPrimary: true, order: 0 },
                { url: '/static/vehicle_images/Honda_black_CVR/Honda_black_CVR_2.jpeg', order: 1 },
                { url: '/static/vehicle_images/Honda_black_CVR/Honda_black_CVR_3.jpeg', order: 2 },
                { url: '/static/vehicle_images/Honda_black_CVR/Honda_black_CVR_4.jpeg', order: 3 },
                { url: '/static/vehicle_images/Honda_black_CVR/Honda_black_CVR_5.jpeg', order: 4 },
                { url: '/static/vehicle_images/Honda_black_CVR/Honda_black_CVR_6.jpeg', order: 5 },
                { url: '/static/vehicle_images/Honda_black_CVR/Honda_black_CVR_7.jpeg', order: 6 },
                { url: '/static/vehicle_images/Honda_black_CVR/Honda_black_CVR_8.jpeg', order: 7 },
                { url: '/static/vehicle_images/Honda_black_CVR/Honda_black_CVR_9.jpeg', order: 8 },
            ],
        },
        {
            stockNumber: 'car-003',
            vinChassis: 'JHM-CIVIC-2024-003',
            make: 'Honda',
            model: 'Civic Type R',
            yearManufacture: 2024,
            yearRegistration: 2024,
            priceFob: 45000,
            status: VehicleStatus.AVAILABLE,
            featured: true,
            siteId: site.id,
            description: 'The iconic Honda Civic Type R - front-wheel drive performance perfected. This 2024 model in Championship White features the legendary 2.0L turbocharged K20C1 engine producing 315hp, paired exclusively with a precise 6-speed manual transmission.',
            spec: {
                engineCode: 'K20C1',
                engineCc: 2000,
                fuelType: 'Gasoline',
                transmission: 'Manual',
                driveType: 'FWD',
                steering: 'Right',
                seats: 4,
                doors: 5,
                colorExterior: 'Championship White',
                colorInterior: 'Red/Black',
                trimGrade: 'Type R',
                mileageKm: 800,
                vehicleType: 'Hatchback',
                options: {
                    features: ['Limited Slip Differential', 'Adaptive Suspension', 'Sport Seats', 'Type R Aero Kit', 'Brembo Brakes', 'Touchscreen Display', 'Wireless Charging'],
                    badges: 'Limited'
                },
            },
            logistics: {
                originCountry: 'Japan',
                currentPortId: 'Nagoya',
                inspectionStatus: 'Passed',
                exportCertStatus: true,
            },
            images: [
                { url: '/static/vehicle_images/Honda_blue_fit/Honda_blue_fit_1.jpeg', isPrimary: true, order: 0 },
                { url: '/static/vehicle_images/Honda_blue_fit/Honda_blue_fit_2.jpeg', order: 1 },
                { url: '/static/vehicle_images/Honda_blue_fit/Honda_blue_fit_3.jpeg', order: 2 },
                { url: '/static/vehicle_images/Honda_blue_fit/Honda_blue_fit_4.jpeg', order: 3 },
                { url: '/static/vehicle_images/Honda_blue_fit/Honda_blue_fit_5.jpeg', order: 4 },
                { url: '/static/vehicle_images/Honda_blue_fit/Honda_blue_fit_6.jpeg', order: 5 },
                { url: '/static/vehicle_images/Honda_blue_fit/Honda_blue_fit_7.jpeg', order: 6 },
                { url: '/static/vehicle_images/Honda_blue_fit/Honda_blue_fit_8.jpeg', order: 7 },
                { url: '/static/vehicle_images/Honda_blue_fit/Honda_blue_fit_9.jpeg', order: 8 },
            ],
        },
        {
            stockNumber: 'car-004',
            vinChassis: 'JM1-RX7-2002-004',
            make: 'Mazda',
            model: 'RX-7 Spirit R',
            yearManufacture: 2002,
            yearRegistration: 2002,
            priceFob: 125000,
            status: VehicleStatus.AVAILABLE,
            featured: true,
            siteId: site.id,
            description: 'A true Japanese legend - the Mazda RX-7 Spirit R, the final and most desirable version of the iconic rotary sports car. This 2002 example has been enthusiast-owned and meticulously maintained. The legendary 13B-REW twin-rotor engine produces 276hp in stock form.',
            spec: {
                engineCode: '13B-REW',
                engineCc: 1300,
                fuelType: 'Gasoline',
                transmission: 'Manual',
                driveType: 'RWD',
                steering: 'Right',
                seats: 2,
                doors: 2,
                colorExterior: 'Vintage Red',
                colorInterior: 'Black',
                trimGrade: 'Spirit R',
                mileageKm: 45000,
                vehicleType: 'Sports Car',
                options: {
                    features: ['13B-REW Engine', 'Twin Turbo', 'BBS Wheels', 'Spirit R Package', 'Momo Steering Wheel', 'Limited Edition', 'Rotary Engine'],
                    badges: 'Rare'
                },
            },
            logistics: {
                originCountry: 'Japan',
                currentPortId: 'Hiroshima',
                inspectionStatus: 'Passed',
                exportCertStatus: true,
            },
            images: [
                { url: '/static/vehicle_images/Saberu_White/Saberu_White_1.jpeg', isPrimary: true, order: 0 },
                { url: '/static/vehicle_images/Saberu_White/Saberu_White_2.jpeg', order: 1 },
                { url: '/static/vehicle_images/Saberu_White/Saberu_White_3.jpeg', order: 2 },
                { url: '/static/vehicle_images/Saberu_White/Saberu_White_4.jpeg', order: 3 },
                { url: '/static/vehicle_images/Saberu_White/Saberu_White_5.jpeg', order: 4 },
                { url: '/static/vehicle_images/Saberu_White/Saberu_White_6.jpeg', order: 5 },
                { url: '/static/vehicle_images/Saberu_White/Saberu_White_7.jpeg', order: 6 },
                { url: '/static/vehicle_images/Saberu_White/Saberu_White_8.jpeg', order: 7 },
                { url: '/static/vehicle_images/Saberu_White/Saberu_White_9.jpeg', order: 8 },
            ],
        },
        {
            stockNumber: 'car-005',
            vinChassis: 'JF1-WRX-2019-005',
            make: 'Subaru',
            model: 'WRX STI S209',
            yearManufacture: 2019,
            yearRegistration: 2019,
            priceFob: 95000,
            status: VehicleStatus.AVAILABLE,
            featured: true,
            siteId: site.id,
            description: 'The ultimate Subaru WRX STI - the S209. Only 200 units produced for the US market, making this one of the rarest and most sought-after modern Subarus. The EJ25 turbocharged boxer engine has been tuned to produce 341hp with track-focused suspension and aerodynamics.',
            spec: {
                engineCode: 'EJ25',
                engineCc: 2500,
                fuelType: 'Gasoline',
                transmission: 'Manual',
                driveType: 'AWD',
                steering: 'Right',
                seats: 5,
                doors: 4,
                colorExterior: 'WR Blue Pearl',
                colorInterior: 'Black/Blue',
                trimGrade: 'S209',
                mileageKm: 3200,
                vehicleType: 'Sedan',
                options: {
                    features: ['Limited Edition', 'EJ25 Engine', 'Bilstein Dampers', 'Recaro Seats', 'Carbon Roof', 'Brembo Brakes', 'DCCD AWD'],
                    badges: 'Collectible'
                },
            },
            logistics: {
                originCountry: 'Japan',
                currentPortId: 'Sapporo',
                inspectionStatus: 'Passed',
                exportCertStatus: true,
            },
            images: [
                { url: '/static/vehicle_images/Saberu_white_XV/Saberu_white_XV_1.jpeg', isPrimary: true, order: 0 },
                { url: '/static/vehicle_images/Saberu_white_XV/Saberu_white_XV_2.jpeg', order: 1 },
                { url: '/static/vehicle_images/Saberu_white_XV/Saberu_white_XV_3.jpeg', order: 2 },
                { url: '/static/vehicle_images/Saberu_white_XV/Saberu_white_XV_4.jpeg', order: 3 },
                { url: '/static/vehicle_images/Saberu_white_XV/Saberu_white_XV_5.jpeg', order: 4 },
                { url: '/static/vehicle_images/Saberu_white_XV/Saberu_white_XV_6.jpeg', order: 5 },
                { url: '/static/vehicle_images/Saberu_white_XV/Saberu_white_XV_7.jpeg', order: 6 },
                { url: '/static/vehicle_images/Saberu_white_XV/Saberu_white_XV_8.jpeg', order: 7 },
                { url: '/static/vehicle_images/Saberu_white_XV/Saberu_white_XV_9.jpeg', order: 8 },
            ],
        },
        {
            stockNumber: 'car-006',
            vinChassis: 'JTH-LC500-2023-006',
            make: 'Lexus',
            model: 'LC 500 Convertible',
            yearManufacture: 2023,
            yearRegistration: 2023,
            priceFob: 105000,
            status: VehicleStatus.AVAILABLE,
            featured: true,
            siteId: site.id,
            description: 'The Lexus LC 500 Convertible represents the pinnacle of Japanese luxury and performance. The naturally aspirated 5.0L V8 produces 471hp with an intoxicating exhaust note. This 2023 model features the stunning Structural Blue paint and has only delivery miles.',
            spec: {
                engineCode: '2UR-GSE',
                engineCc: 5000,
                fuelType: 'Gasoline',
                transmission: 'Automatic',
                driveType: 'RWD',
                steering: 'Right',
                seats: 4,
                doors: 2,
                colorExterior: 'Structural Blue',
                colorInterior: 'White/Blue',
                trimGrade: 'Convertible',
                mileageKm: 1200,
                vehicleType: 'Convertible',
                options: {
                    features: ['V8 Engine', 'Convertible Top', 'Mark Levinson Audio', 'Lexus Safety System+', 'Heated/Cooled Seats', 'Premium Leather', 'Remote Touch'],
                    badges: 'Luxury'
                },
            },
            logistics: {
                originCountry: 'Japan',
                currentPortId: 'Tokyo',
                inspectionStatus: 'Passed',
                exportCertStatus: true,
            },
            images: [
                { url: '/static/vehicle_images/Toyota_skyblue_vitz/Toyota_skyblue_vitz_1.jpeg', isPrimary: true, order: 0 },
                { url: '/static/vehicle_images/Toyota_skyblue_vitz/Toyota_skyblue_vitz_2.jpeg', order: 1 },
                { url: '/static/vehicle_images/Toyota_skyblue_vitz/Toyota_skyblue_vitz_3.jpeg', order: 2 },
                { url: '/static/vehicle_images/Toyota_skyblue_vitz/Toyota_skyblue_vitz_4.jpeg', order: 3 },
                { url: '/static/vehicle_images/Toyota_skyblue_vitz/Toyota_skyblue_vitz_5.jpeg', order: 4 },
                { url: '/static/vehicle_images/Toyota_skyblue_vitz/Toyota_skyblue_vitz_6.jpeg', order: 5 },
                { url: '/static/vehicle_images/Toyota_skyblue_vitz/Toyota_skyblue_vitz_7.jpeg', order: 6 },
                { url: '/static/vehicle_images/Toyota_skyblue_vitz/Toyota_skyblue_vitz_8.jpeg', order: 7 },
                { url: '/static/vehicle_images/Toyota_skyblue_vitz/Toyota_skyblue_vitz_9.jpeg', order: 8 },
            ],
        },
        {
            stockNumber: 'car-007',
            vinChassis: 'JTM-LC300-2024-007',
            make: 'Toyota',
            model: 'Land Cruiser 300',
            yearManufacture: 2024,
            yearRegistration: 2024,
            priceFob: 78000,
            status: VehicleStatus.AVAILABLE,
            featured: false,
            siteId: site.id,
            description: 'The legendary Toyota Land Cruiser returns with the all-new 300 series. Featuring a modern 3.5L twin-turbo V6 producing 409hp, advanced off-road technologies, and a luxurious interior. This 2024 model is ready for any adventure.',
            spec: {
                engineCode: 'V35A-FTS',
                engineCc: 3500,
                fuelType: 'Gasoline',
                transmission: 'Automatic',
                driveType: '4WD',
                steering: 'Right',
                seats: 7,
                doors: 5,
                colorExterior: 'Silver Metallic',
                colorInterior: 'Black',
                trimGrade: 'ZX',
                mileageKm: 500,
                vehicleType: 'SUV',
                options: {
                    features: ['Full-Time 4WD', 'Multi-Terrain Select', 'Crawl Control', '3-Row Seating', 'Panoramic Roof', 'JBL Audio', 'Wireless CarPlay'],
                    badges: 'SUV'
                },
            },
            logistics: {
                originCountry: 'Japan',
                currentPortId: 'Osaka',
                inspectionStatus: 'Passed',
                exportCertStatus: true,
            },
            images: [
                { url: '/static/vehicle_images/Toyota_skyblue_vitz/Toyota_skyblue_vitz_1.jpeg', isPrimary: true, order: 0 },
                { url: '/static/vehicle_images/Toyota_skyblue_vitz/Toyota_skyblue_vitz_2.jpeg', order: 1 },
                { url: '/static/vehicle_images/Toyota_skyblue_vitz/Toyota_skyblue_vitz_3.jpeg', order: 2 },
                { url: '/static/vehicle_images/Toyota_skyblue_vitz/Toyota_skyblue_vitz_4.jpeg', order: 3 },
                { url: '/static/vehicle_images/Toyota_skyblue_vitz/Toyota_skyblue_vitz_5.jpeg', order: 4 },
                { url: '/static/vehicle_images/Toyota_skyblue_vitz/Toyota_skyblue_vitz_6.jpeg', order: 5 },
                { url: '/static/vehicle_images/Toyota_skyblue_vitz/Toyota_skyblue_vitz_7.jpeg', order: 6 },
                { url: '/static/vehicle_images/Toyota_skyblue_vitz/Toyota_skyblue_vitz_8.jpeg', order: 7 },
                { url: '/static/vehicle_images/Toyota_skyblue_vitz/Toyota_skyblue_vitz_9.jpeg', order: 8 },
            ],
        },
        {
            stockNumber: 'car-008',
            vinChassis: 'JNK-Z-2023-008',
            make: 'Nissan',
            model: 'Z Performance',
            yearManufacture: 2023,
            yearRegistration: 2023,
            priceFob: 52000,
            status: VehicleStatus.AVAILABLE,
            featured: true,
            siteId: site.id,
            description: 'The all-new Nissan Z combines modern performance with classic Z-car heritage. The twin-turbo V6 produces 400hp and can be paired with a satisfying 6-speed manual transmission. This Performance package model includes upgraded brakes, suspension, and wheels.',
            spec: {
                engineCode: 'VR30DDTT',
                engineCc: 3000,
                fuelType: 'Gasoline',
                transmission: 'Manual',
                driveType: 'RWD',
                steering: 'Right',
                seats: 2,
                doors: 2,
                colorExterior: 'Ikazuchi Yellow',
                colorInterior: 'Black',
                trimGrade: 'Performance',
                mileageKm: 2100,
                vehicleType: 'Sports Car',
                options: {
                    features: ['VR30DDTT Engine', '6-Speed Manual', 'Limited Slip Diff', 'Sport Suspension', 'Bose Audio', 'Performance Brakes', '19" Forged Wheels'],
                    badges: 'Sports'
                },
            },
            logistics: {
                originCountry: 'Japan',
                currentPortId: 'Yokohama',
                inspectionStatus: 'Passed',
                exportCertStatus: true,
            },
            images: [
                { url: '/static/vehicle_images/Nissan_red_juke/Nissan_red_juke_1.jpeg', isPrimary: true, order: 0 },
                { url: '/static/vehicle_images/Nissan_red_juke/Nissan_red_juke_2.jpeg', order: 1 },
                { url: '/static/vehicle_images/Nissan_red_juke/Nissan_red_juke_3.jpeg', order: 2 },
                { url: '/static/vehicle_images/Nissan_red_juke/Nissan_red_juke_4.jpeg', order: 3 },
                { url: '/static/vehicle_images/Nissan_red_juke/Nissan_red_juke_5.jpeg', order: 4 },
                { url: '/static/vehicle_images/Nissan_red_juke/Nissan_red_juke_6.jpeg', order: 5 },
                { url: '/static/vehicle_images/Nissan_red_juke/Nissan_red_juke_7.jpeg', order: 6 },
                { url: '/static/vehicle_images/Nissan_red_juke/Nissan_red_juke_8.jpeg', order: 7 },
                { url: '/static/vehicle_images/Nissan_red_juke/Nissan_red_juke_9.jpeg', order: 8 },
            ],
        },
    ];

    console.log(`\n📝 Creating ${vehiclesData.length} vehicles...\n`);

    let dealerIndex = 0;

    for (const vehicleData of vehiclesData) {
        // Distribute vehicles among dealers
        const currentDealer = dealers[dealerIndex % dealers.length];

        const existingVehicle = await prisma.vehicle.findFirst({
            where: { stockNumber: vehicleData.stockNumber }
        });

        if (existingVehicle) {
            console.log(`ℹ️ Vehicle already exists: ${vehicleData.stockNumber} - Skipping`);
            dealerIndex++;
            continue;
        }

        const vehicle = await prisma.vehicle.create({
            data: {
                stockNumber: vehicleData.stockNumber,
                vinChassis: vehicleData.vinChassis,
                make: vehicleData.make,
                model: vehicleData.model,
                yearManufacture: vehicleData.yearManufacture,
                yearRegistration: vehicleData.yearRegistration,
                priceFob: vehicleData.priceFob,
                status: vehicleData.status,
                featured: vehicleData.featured,
                siteId: vehicleData.siteId,
                specs: {
                    create: vehicleData.spec,
                },
                logistics: {
                    create: vehicleData.logistics,
                },
                images: {
                    create: vehicleData.images.map((img: { url: string; isPrimary?: boolean; order: number }) => ({
                        url: img.url,
                        altText: `${vehicleData.make} ${vehicleData.model} ${vehicleData.yearManufacture}`,
                        isPrimary: img.isPrimary || false,
                        sortOrder: img.order,
                    })),
                },
            },
            include: {
                specs: true,
                logistics: true,
                images: true,
            },
        });

        console.log(
            `✅ Created: ${vehicle.make} ${vehicle.model} ${vehicle.yearManufacture} - ${vehicle.stockNumber} (Dealer: ${currentDealer.name})`
        );
        console.log(`   📸 ${vehicle.images.length} images added`);
        console.log(`   💰 Price: ¥${vehicle.priceFob.toLocaleString()}`);
        console.log(`   📊 Status: ${vehicle.status}\n`);

        dealerIndex++;
    }

    console.log('\n✨ Vehicle seed completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`   Total vehicles: ${vehiclesData.length}`);
    console.log(`   Available: ${vehiclesData.filter((v) => v.status === 'AVAILABLE').length}`);
    console.log(`   Reserved: ${vehiclesData.filter((v) => v.status === 'RESERVED').length}`);
    console.log(`   Featured: ${vehiclesData.filter((v) => v.featured).length}`);
    console.log(`   Total images: ${vehiclesData.reduce((sum, v) => sum + v.images.length, 0)}`);
}

main()
    .catch((e) => {
        console.error('❌ Error during vehicle seeding:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
