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
  await executeSeedSql();

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

    // Vehicle data based on the image directories
    const vehiclesData = [
        // Honda Black (folder: Honda_black) - 14 images
        {
            stockNumber: 'HND-BLK-2020-001',
            vinChassis: 'JHMGE8H59CC123456',
            make: 'Honda',
            model: 'Vezel',
            yearManufacture: 2020,
            yearRegistration: 2020,
            priceFob: 1850000,
            status: VehicleStatus.AVAILABLE,
            featured: true,
            siteId: site.id,
            spec: {
                engineCode: 'L15B',
                engineCc: 1500,
                fuelType: 'Hybrid',
                transmission: 'CVT',
                driveType: '4WD',
                steering: 'Right',
                seats: 5,
                doors: 5,
                colorExterior: 'Black',
                colorInterior: 'Black',
                trimGrade: 'Z',
                mileageKm: 45000,
                vehicleType: 'SUV',
                options: {
                    features: ['LED Headlights', 'Push Start', 'Reverse Camera', 'Navigation', 'Leather Seats'],
                },
            },
            logistics: {
                originCountry: 'Japan',
                currentPortId: 'Yokohama',
                inspectionStatus: 'Passed',
                exportCertStatus: true,
            },
            images: [
                { url: '/static/vehicle_images/Honda_black/WhatsApp Image 2026-01-28 at 12.52.01 PM.jpeg', isPrimary: true, order: 0 },
                { url: '/static/vehicle_images/Honda_black/WhatsApp Image 2026-01-28 at 12.52.01 PM (1).jpeg', order: 1 },
                { url: '/static/vehicle_images/Honda_black/WhatsApp Image 2026-01-28 at 12.52.01 PM (2).jpeg', order: 2 },
                { url: '/static/vehicle_images/Honda_black/WhatsApp Image 2026-01-28 at 12.52.02 PM.jpeg', order: 3 },
                { url: '/static/vehicle_images/Honda_black/WhatsApp Image 2026-01-28 at 12.52.02 PM (1).jpeg', order: 4 },
                { url: '/static/vehicle_images/Honda_black/WhatsApp Image 2026-01-28 at 12.52.02 PM (2).jpeg', order: 5 },
                { url: '/static/vehicle_images/Honda_black/WhatsApp Image 2026-01-28 at 12.52.02 PM (3).jpeg', order: 6 },
                { url: '/static/vehicle_images/Honda_black/WhatsApp Image 2026-01-28 at 12.52.03 PM.jpeg', order: 7 },
            ],
        },

        // Subaru White (folder: Saberu_White) - 13 images
        {
            stockNumber: 'SBR-WHT-2021-002',
            vinChassis: 'JF2GPAAC5MH234567',
            make: 'Subaru',
            model: 'Impreza Sport',
            yearManufacture: 2021,
            yearRegistration: 2021,
            priceFob: 2150000,
            status: VehicleStatus.AVAILABLE,
            featured: true,
            siteId: site.id,
            spec: {
                engineCode: 'FB20',
                engineCc: 2000,
                fuelType: 'Petrol',
                transmission: 'CVT',
                driveType: 'AWD',
                steering: 'Right',
                seats: 5,
                doors: 5,
                colorExterior: 'White Pearl',
                colorInterior: 'Black',
                trimGrade: '2.0i-S EyeSight',
                mileageKm: 32000,
                vehicleType: 'Sedan',
                options: {
                    features: ['EyeSight Safety', 'Sunroof', 'Leather Seats', 'Harman Kardon Audio', 'LED Lights'],
                },
            },
            logistics: {
                originCountry: 'Japan',
                currentPortId: 'Tokyo',
                inspectionStatus: 'Passed',
                exportCertStatus: true,
            },
            images: [
                { url: '/static/vehicle_images/Saberu_White/WhatsApp Image 2026-01-28 at 12.49.10 PM.jpeg', isPrimary: true, order: 0 },
                { url: '/static/vehicle_images/Saberu_White/WhatsApp Image 2026-01-28 at 12.49.11 PM.jpeg', order: 1 },
                { url: '/static/vehicle_images/Saberu_White/WhatsApp Image 2026-01-28 at 12.49.11 PM (1).jpeg', order: 2 },
                { url: '/static/vehicle_images/Saberu_White/WhatsApp Image 2026-01-28 at 12.49.12 PM.jpeg', order: 3 },
                { url: '/static/vehicle_images/Saberu_White/WhatsApp Image 2026-01-28 at 12.49.12 PM (1).jpeg', order: 4 },
                { url: '/static/vehicle_images/Saberu_White/WhatsApp Image 2026-01-28 at 12.49.12 PM (2).jpeg', order: 5 },
                { url: '/static/vehicle_images/Saberu_White/WhatsApp Image 2026-01-28 at 12.49.12 PM (3).jpeg', order: 6 },
                { url: '/static/vehicle_images/Saberu_White/WhatsApp Image 2026-01-28 at 12.49.13 PM.jpeg', order: 7 },
            ],
        },

        // Honda Black CR-V (folder: Honda_black_CVR) - 14 images
        {
            stockNumber: 'HND-CRV-2019-003',
            vinChassis: 'JHLRE48759C345678',
            make: 'Honda',
            model: 'CR-V',
            yearManufacture: 2019,
            yearRegistration: 2019,
            priceFob: 2450000,
            status: VehicleStatus.AVAILABLE,
            featured: false,
            siteId: site.id,
            spec: {
                engineCode: 'L15B',
                engineCc: 1500,
                fuelType: 'Petrol Turbo',
                transmission: 'CVT',
                driveType: '4WD',
                steering: 'Right',
                seats: 7,
                doors: 5,
                colorExterior: 'Black',
                colorInterior: 'Beige',
                trimGrade: 'EX Masterpiece',
                mileageKm: 58000,
                vehicleType: 'SUV',
                options: {
                    features: ['Honda Sensing', '3rd Row Seats', 'Power Tailgate', 'Sunroof', 'Heated Seats'],
                },
            },
            logistics: {
                originCountry: 'Japan',
                currentPortId: 'Osaka',
                inspectionStatus: 'Passed',
                exportCertStatus: true,
            },
            images: [
                { url: '/static/vehicle_images/Honda_black_CVR/WhatsApp Image 2026-01-28 at 12.47.36 PM.jpeg', isPrimary: true, order: 0 },
                { url: '/static/vehicle_images/Honda_black_CVR/WhatsApp Image 2026-01-28 at 12.47.36 PM (1).jpeg', order: 1 },
                { url: '/static/vehicle_images/Honda_black_CVR/WhatsApp Image 2026-01-28 at 12.47.36 PM (2).jpeg', order: 2 },
                { url: '/static/vehicle_images/Honda_black_CVR/WhatsApp Image 2026-01-28 at 12.47.37 PM.jpeg', order: 3 },
                { url: '/static/vehicle_images/Honda_black_CVR/WhatsApp Image 2026-01-28 at 12.47.37 PM (1).jpeg', order: 4 },
                { url: '/static/vehicle_images/Honda_black_CVR/WhatsApp Image 2026-01-28 at 12.47.37 PM (2).jpeg', order: 5 },
                { url: '/static/vehicle_images/Honda_black_CVR/WhatsApp Image 2026-01-28 at 12.47.38 PM.jpeg', order: 6 },
                { url: '/static/vehicle_images/Honda_black_CVR/WhatsApp Image 2026-01-28 at 12.47.38 PM (1).jpeg', order: 7 },
            ],
        },

        // Honda Blue Fit (folder: Honda_blue_fit) - 13 images
        {
            stockNumber: 'HND-FIT-2020-004',
            vinChassis: 'JHMGK5H76LC456789',
            make: 'Honda',
            model: 'Fit',
            yearManufacture: 2020,
            yearRegistration: 2020,
            priceFob: 1350000,
            status: VehicleStatus.AVAILABLE,
            featured: false,
            siteId: site.id,
            spec: {
                engineCode: 'L13B',
                engineCc: 1300,
                fuelType: 'Hybrid',
                transmission: 'e-CVT',
                driveType: 'FF',
                steering: 'Right',
                seats: 5,
                doors: 5,
                colorExterior: 'Blue',
                colorInterior: 'Black',
                trimGrade: 'Home',
                mileageKm: 28000,
                vehicleType: 'Hatchback',
                options: {
                    features: ['Honda Sensing', 'Push Start', 'LED Lights', 'Cruise Control', 'USB Charging'],
                },
            },
            logistics: {
                originCountry: 'Japan',
                currentPortId: 'Nagoya',
                inspectionStatus: 'Passed',
                exportCertStatus: true,
            },
            images: [
                { url: '/static/vehicle_images/Honda_blue_fit/WhatsApp Image 2026-01-28 at 12.09.23 PM.jpeg', isPrimary: true, order: 0 },
                { url: '/static/vehicle_images/Honda_blue_fit/WhatsApp Image 2026-01-28 at 12.09.24 PM.jpeg', order: 1 },
                { url: '/static/vehicle_images/Honda_blue_fit/WhatsApp Image 2026-01-28 at 12.09.24 PM (1).jpeg', order: 2 },
                { url: '/static/vehicle_images/Honda_blue_fit/WhatsApp Image 2026-01-28 at 12.09.24 PM (2).jpeg', order: 3 },
                { url: '/static/vehicle_images/Honda_blue_fit/WhatsApp Image 2026-01-28 at 12.09.24 PM (3).jpeg', order: 4 },
                { url: '/static/vehicle_images/Honda_blue_fit/WhatsApp Image 2026-01-28 at 12.09.25 PM.jpeg', order: 5 },
                { url: '/static/vehicle_images/Honda_blue_fit/WhatsApp Image 2026-01-28 at 12.09.25 PM (1).jpeg', order: 6 },
                { url: '/static/vehicle_images/Honda_blue_fit/WhatsApp Image 2026-01-28 at 12.09.25 PM (2).jpeg', order: 7 },
            ],
        },

        // Nissan Red Juke (folder: Nissan_red_juke) - 12 images
        {
            stockNumber: 'NSN-JUK-2018-005',
            vinChassis: 'SJNFAAE11U1567890',
            make: 'Nissan',
            model: 'Juke',
            yearManufacture: 2018,
            yearRegistration: 2018,
            priceFob: 1580000,
            status: VehicleStatus.AVAILABLE,
            featured: true,
            siteId: site.id,
            spec: {
                engineCode: 'HR15DE',
                engineCc: 1500,
                fuelType: 'Petrol',
                transmission: 'CVT',
                driveType: 'FF',
                steering: 'Right',
                seats: 5,
                doors: 5,
                colorExterior: 'Red',
                colorInterior: 'Black/Red',
                trimGrade: '15RX V Selection',
                mileageKm: 62000,
                vehicleType: 'SUV',
                options: {
                    features: ['Sport Mode', 'Alloy Wheels', 'Fog Lights', 'Climate Control', 'Bluetooth'],
                },
            },
            logistics: {
                originCountry: 'Japan',
                currentPortId: 'Yokohama',
                inspectionStatus: 'Passed',
                exportCertStatus: true,
            },
            images: [
                { url: '/static/vehicle_images/Nissan_red_juke/WhatsApp Image 2026-01-28 at 12.10.35 PM.jpeg', isPrimary: true, order: 0 },
                { url: '/static/vehicle_images/Nissan_red_juke/WhatsApp Image 2026-01-28 at 12.10.35 PM (1).jpeg', order: 1 },
                { url: '/static/vehicle_images/Nissan_red_juke/WhatsApp Image 2026-01-28 at 12.10.36 PM.jpeg', order: 2 },
                { url: '/static/vehicle_images/Nissan_red_juke/WhatsApp Image 2026-01-28 at 12.10.36 PM (1).jpeg', order: 3 },
                { url: '/static/vehicle_images/Nissan_red_juke/WhatsApp Image 2026-01-28 at 12.10.36 PM (2).jpeg', order: 4 },
                { url: '/static/vehicle_images/Nissan_red_juke/WhatsApp Image 2026-01-28 at 12.10.36 PM (3).jpeg', order: 5 },
                { url: '/static/vehicle_images/Nissan_red_juke/WhatsApp Image 2026-01-28 at 12.10.37 PM.jpeg', order: 6 },
                { url: '/static/vehicle_images/Nissan_red_juke/WhatsApp Image 2026-01-28 at 12.10.37 PM (1).jpeg', order: 7 },
            ],
        },

        // Nissan Red X-Trail (folder: Nissan_red_xtrail) - 13 images
        {
            stockNumber: 'NSN-XTR-2019-006',
            vinChassis: 'SJNFBAN32U1678901',
            make: 'Nissan',
            model: 'X-Trail',
            yearManufacture: 2019,
            yearRegistration: 2019,
            priceFob: 2650000,
            status: VehicleStatus.RESERVED,
            featured: true,
            siteId: site.id,
            spec: {
                engineCode: 'MR20DD',
                engineCc: 2000,
                fuelType: 'Petrol',
                transmission: 'CVT',
                driveType: '4WD',
                steering: 'Right',
                seats: 7,
                doors: 5,
                colorExterior: 'Red',
                colorInterior: 'Black',
                trimGrade: '20Xi',
                mileageKm: 48000,
                vehicleType: 'SUV',
                options: {
                    features: ['ProPILOT', '3rd Row Seats', 'Around View Monitor', 'Power Seats', 'Intelligent Key'],
                },
            },
            logistics: {
                originCountry: 'Japan',
                currentPortId: 'Kobe',
                inspectionStatus: 'Passed',
                exportCertStatus: true,
            },
            images: [
                { url: '/static/vehicle_images/Nissan_red_xtrail/WhatsApp Image 2026-01-28 at 12.05.01 PM.jpeg', isPrimary: true, order: 0 },
                { url: '/static/vehicle_images/Nissan_red_xtrail/WhatsApp Image 2026-01-28 at 12.05.02 PM.jpeg', order: 1 },
                { url: '/static/vehicle_images/Nissan_red_xtrail/WhatsApp Image 2026-01-28 at 12.05.02 PM (1).jpeg', order: 2 },
                { url: '/static/vehicle_images/Nissan_red_xtrail/WhatsApp Image 2026-01-28 at 12.05.02 PM (2).jpeg', order: 3 },
                { url: '/static/vehicle_images/Nissan_red_xtrail/WhatsApp Image 2026-01-28 at 12.05.03 PM.jpeg', order: 4 },
                { url: '/static/vehicle_images/Nissan_red_xtrail/WhatsApp Image 2026-01-28 at 12.05.03 PM (1).jpeg', order: 5 },
                { url: '/static/vehicle_images/Nissan_red_xtrail/WhatsApp Image 2026-01-28 at 12.05.03 PM (2).jpeg', order: 6 },
                { url: '/static/vehicle_images/Nissan_red_xtrail/WhatsApp Image 2026-01-28 at 12.05.04 PM.jpeg', order: 7 },
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
                    create: vehicleData.images.map((img) => ({
                        url: img.url,
                        altText: `${vehicleData.make} ${vehicleData.model} ${vehicleData.yearManufacture}`,
                        isPrimary: img.isPrimary || false,
                        order: img.order,
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
