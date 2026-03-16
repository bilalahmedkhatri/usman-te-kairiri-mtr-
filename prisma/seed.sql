-- Seed Data for Car Export Platform
-- Run this AFTER running the migration script
-- This will populate the database with sample data

-- Insert Currencies
INSERT INTO
    "currencies" ("code", "symbol", "name")
VALUES ('USD', '$', 'US Dollar'),
    ('JPY', '¥', 'Japanese Yen'),
    ('EUR', '€', 'Euro'),
    ('GBP', '£', 'British Pound'),
    (
        'AUD',
        'A$',
        'Australian Dollar'
    ),
    (
        'CAD',
        'C$',
        'Canadian Dollar'
    ),
    ('AED', 'د.إ', 'UAE Dirham'),
    ('PKR', '₨', 'Pakistani Rupee');

-- Insert Ports
INSERT INTO
    "ports" (
        "name",
        "country",
        "region",
        "is_destination"
    )
VALUES
    -- Origin Ports (Japan)
    (
        'Yokohama',
        'Japan',
        'Kanto',
        false
    ),
    (
        'Nagoya',
        'Japan',
        'Chubu',
        false
    ),
    (
        'Osaka',
        'Japan',
        'Kansai',
        false
    ),
    (
        'Kobe',
        'Japan',
        'Kansai',
        false
    ),
    (
        'Tokyo',
        'Japan',
        'Kanto',
        false
    ),
    -- Destination Ports
    (
        'Karachi',
        'Pakistan',
        'Sindh',
        true
    ),
    (
        'Port Qasim',
        'Pakistan',
        'Sindh',
        true
    ),
    ('Dubai', 'UAE', 'Dubai', true),
    (
        'Jebel Ali',
        'UAE',
        'Dubai',
        true
    ),
    (
        'Mombasa',
        'Kenya',
        'Coast',
        true
    ),
    (
        'Dar es Salaam',
        'Tanzania',
        'Dar es Salaam',
        true
    ),
    (
        'Colombo',
        'Sri Lanka',
        'Western',
        true
    ),
    (
        'Sydney',
        'Australia',
        'New South Wales',
        true
    ),
    (
        'Melbourne',
        'Australia',
        'Victoria',
        true
    );

-- Insert Site
INSERT INTO
    "sites" (
        "domain",
        "name",
        "theme_config",
        "contact_info",
        "default_currency_id",
        "is_active"
    )
VALUES (
        'localhost:3000',
        'TE KAIRIRI MOTORS',
        '{"primaryColor": "#2563eb", "secondaryColor": "#1e40af", "theme": "light"}',
        '{"email": "info@tokyointernationaljp.com", "phone": "+8190-4026-8828", "address": "320-1 Kanno, Sodegaura-shi, Chiba, Japan 299-0257"}',
        'JPY',
        true
    );

-- Insert Users with different roles
-- Password for all users: "password123" (hashed with bcrypt)
INSERT INTO
    "users" (
        "email",
        "name",
        "password",
        "phone",
        "country",
        "department",
        "role",
        "status",
        "site_id"
    )
VALUES (
        'admin@example.com',
        'Admin User',
        '$2b$10$rKJ5YwZqZ8qZ8qZ8qZ8qZOqZ8qZ8qZ8qZ8qZ8qZ8qZ8qZ8qZ8qZ8q',
        '+81-90-1234-5678',
        'Japan',
        'Management',
        'ADMIN',
        'ACTIVE',
        1
    ),
    (
        'manager@example.com',
        'Manager User',
        '$2b$10$rKJ5YwZqZ8qZ8qZ8qZ8qZOqZ8qZ8qZ8qZ8qZ8qZ8qZ8qZ8qZ8qZ8q',
        '+81-90-2345-6789',
        'Japan',
        'Sales',
        'MANAGER',
        'ACTIVE',
        1
    ),
    (
        'dealer@example.com',
        'Dealer User',
        '$2b$10$rKJ5YwZqZ8qZ8qZ8qZ8qZOqZ8qZ8qZ8qZ8qZ8qZ8qZ8qZ8qZ8qZ8q',
        '+92-300-1234567',
        'Pakistan',
        'Sales',
        'DEALER',
        'ACTIVE',
        1
    ),
    (
        'supplier@example.com',
        'Supplier User',
        '$2b$10$rKJ5YwZqZ8qZ8qZ8qZ8qZOqZ8qZ8qZ8qZ8qZ8qZ8qZ8qZ8qZ8qZ8q',
        '+81-90-3456-7890',
        'Japan',
        'Procurement',
        'SUPPLIER',
        'ACTIVE',
        1
    ),
    (
        'buyer1@example.com',
        'John Buyer',
        '$2b$10$rKJ5YwZqZ8qZ8qZ8qZ8qZOqZ8qZ8qZ8qZ8qZ8qZ8qZ8qZ8qZ8qZ8q',
        '+92-300-2345678',
        'Pakistan',
        NULL,
        'BUYER',
        'ACTIVE',
        1
    ),
    (
        'buyer2@example.com',
        'Ahmed Ali',
        '$2b$10$rKJ5YwZqZ8qZ8qZ8qZ8qZOqZ8qZ8qZ8qZ8qZ8qZ8qZ8qZ8qZ8qZ8q',
        '+971-50-1234567',
        'UAE',
        NULL,
        'BUYER',
        'ACTIVE',
        1
    ),
    (
        'buyer3@example.com',
        'Sarah Johnson',
        '$2b$10$rKJ5YwZqZ8qZ8qZ8qZ8qZOqZ8qZ8qZ8qZ8qZ8qZ8qZ8qZ8qZ8qZ8q',
        '+61-400-123456',
        'Australia',
        NULL,
        'BUYER',
        'ACTIVE',
        1
    ),
    (
        'viewer@example.com',
        'Viewer User',
        '$2b$10$rKJ5YwZqZ8qZ8qZ8qZ8qZOqZ8qZ8qZ8qZ8qZ8qZ8qZ8qZ8qZ8qZ8q',
        '+81-90-4567-8901',
        'Japan',
        'Support',
        'VIEWER',
        'ACTIVE',
        1
    ),
    (
        'inactive@example.com',
        'Inactive User',
        '$2b$10$rKJ5YwZqZ8qZ8qZ8qZ8qZOqZ8qZ8qZ8qZ8qZ8qZ8qZ8qZ8qZ8qZ8q',
        '+81-90-5678-9012',
        'Japan',
        NULL,
        'USER',
        'INACTIVE',
        1
    );

-- Insert Vehicles
INSERT INTO
    "vehicles" (
        "site_id",
        "stock_number",
        "vin_chassis",
        "make",
        "model",
        "year_manufacture",
        "year_registration",
        "price_fob",
        "status",
        "featured"
    )
VALUES (
        1,
        'TK-2024-001',
        'JN1TANZ51U0123456',
        'NISSAN',
        'X-TRAIL',
        2020,
        2020,
        15000.00,
        'AVAILABLE',
        true
    ),
    (
        1,
        'TK-2024-002',
        'JF1GJ6LS0DG123456',
        'TOYOTA',
        'LAND CRUISER',
        2019,
        2019,
        45000.00,
        'AVAILABLE',
        true
    ),
    (
        1,
        'TK-2024-003',
        'JHMGE8H58DC123456',
        'HONDA',
        'FIT',
        2018,
        2018,
        8000.00,
        'AVAILABLE',
        true
    ),
    (
        1,
        'TK-2024-004',
        'JN1TBNT30U0123456',
        'NISSAN',
        'PATROL',
        2021,
        2021,
        38000.00,
        'AVAILABLE',
        false
    ),
    (
        1,
        'TK-2024-005',
        'JF1SJ5LC8DG123456',
        'MAZDA',
        'CX-5',
        2019,
        2019,
        18000.00,
        'AVAILABLE',
        false
    ),
    (
        1,
        'TK-2024-006',
        'JHMGE8H40DC123456',
        'TOYOTA',
        'HIACE',
        2020,
        2020,
        22000.00,
        'AVAILABLE',
        false
    ),
    (
        1,
        'TK-2024-007',
        'JN1TANZ51U0234567',
        'MITSUBISHI',
        'PAJERO',
        2018,
        2018,
        16000.00,
        'RESERVED',
        false
    ),
    (
        1,
        'TK-2024-008',
        'JF1GJ6LS0DG234567',
        'TOYOTA',
        'PRIUS',
        2021,
        2021,
        14000.00,
        'AVAILABLE',
        false
    ),
    (
        1,
        'TK-2024-009',
        'JHMGE8H58DC234567',
        'HONDA',
        'VEZEL',
        2020,
        2020,
        17000.00,
        'AVAILABLE',
        false
    ),
    (
        1,
        'TK-2024-010',
        'JN1TBNT30U0234567',
        'NISSAN',
        'SERENA',
        2019,
        2019,
        13000.00,
        'SOLD',
        false
    ),
    (
        1,
        'TK-2024-011',
        'JF1SJ5LC8DG234567',
        'TOYOTA',
        'VOXY',
        2020,
        2020,
        19000.00,
        'AVAILABLE',
        false
    ),
    (
        1,
        'TK-2024-012',
        'JHMGE8H40DC234567',
        'SUZUKI',
        'JIMNY',
        2021,
        2021,
        12000.00,
        'AVAILABLE',
        false
    );

-- Insert Vehicle Specs
INSERT INTO
    "vehicle_specs" (
        "vehicle_id",
        "engine_code",
        "engine_cc",
        "fuel_type",
        "transmission",
        "drive_type",
        "steering",
        "seats",
        "doors",
        "color_exterior",
        "color_interior",
        "trim_grade",
        "mileage_km",
        "vehicle_type"
    )
VALUES (
        1,
        'MR20DD',
        2000,
        'Petrol',
        'CVT',
        '4WD',
        'Right',
        5,
        5,
        'Pearl White',
        'Black',
        'X',
        45000,
        'SUV'
    ),
    (
        2,
        '1VD-FTV',
        4500,
        'Diesel',
        'Automatic',
        '4WD',
        'Right',
        8,
        5,
        'White',
        'Beige',
        'VX',
        78000,
        'SUV'
    ),
    (
        3,
        'L13B',
        1300,
        'Petrol',
        'CVT',
        'FWD',
        'Right',
        5,
        5,
        'Blue Metallic',
        'Gray',
        'Hybrid',
        32000,
        'Hatchback'
    ),
    (
        4,
        'TB48DE',
        4800,
        'Petrol',
        'Automatic',
        '4WD',
        'Right',
        8,
        5,
        'Silver',
        'Black',
        'Super Safari',
        55000,
        'SUV'
    ),
    (
        5,
        'SH-VPTS',
        2500,
        'Petrol',
        'Automatic',
        'AWD',
        'Right',
        5,
        5,
        'Soul Red',
        'Black',
        'XD',
        41000,
        'SUV'
    ),
    (
        6,
        '2TR-FE',
        2700,
        'Petrol',
        'Automatic',
        'RWD',
        'Right',
        15,
        5,
        'White',
        'Gray',
        'Super GL',
        62000,
        'Van'
    ),
    (
        7,
        '6G72',
        3000,
        'Petrol',
        'Automatic',
        '4WD',
        'Right',
        7,
        5,
        'Black',
        'Beige',
        'Exceed',
        89000,
        'SUV'
    ),
    (
        8,
        '2ZR-FXE',
        1800,
        'Hybrid',
        'CVT',
        'FWD',
        'Right',
        5,
        5,
        'Silver Metallic',
        'Black',
        'S',
        28000,
        'Sedan'
    ),
    (
        9,
        'L15B',
        1500,
        'Petrol',
        'CVT',
        'AWD',
        'Right',
        5,
        5,
        'Red',
        'Black',
        'X',
        35000,
        'SUV'
    ),
    (
        10,
        'MR20DD',
        2000,
        'Petrol',
        'CVT',
        'FWD',
        'Right',
        8,
        5,
        'White Pearl',
        'Gray',
        'Highway Star',
        52000,
        'Van'
    ),
    (
        11,
        '2ZR-FAE',
        2000,
        'Petrol',
        'CVT',
        'FWD',
        'Right',
        8,
        5,
        'Black',
        'Black',
        'ZS',
        38000,
        'Van'
    ),
    (
        12,
        'K6A',
        660,
        'Petrol',
        'Manual',
        '4WD',
        'Right',
        4,
        3,
        'Yellow',
        'Black',
        'XC',
        18000,
        'SUV'
    );

-- Insert Vehicle Logistics
INSERT INTO
    "vehicle_logistics" (
        "vehicle_id",
        "length_cm",
        "width_cm",
        "height_cm",
        "m3",
        "weight_kg",
        "current_port_id",
        "origin_country",
        "hs_code",
        "inspection_status",
        "export_cert_status"
    )
VALUES (
        1,
        465,
        185,
        170,
        14.6,
        1600,
        'Yokohama',
        'Japan',
        '8703.23',
        'Passed',
        true
    ),
    (
        2,
        495,
        198,
        189,
        18.5,
        2500,
        'Nagoya',
        'Japan',
        '8703.32',
        'Passed',
        true
    ),
    (
        3,
        395,
        169,
        152,
        10.1,
        1100,
        'Yokohama',
        'Japan',
        '8703.23',
        'Passed',
        true
    ),
    (
        4,
        510,
        198,
        195,
        19.7,
        2700,
        'Osaka',
        'Japan',
        '8703.32',
        'Passed',
        true
    ),
    (
        5,
        450,
        184,
        168,
        13.9,
        1600,
        'Yokohama',
        'Japan',
        '8703.23',
        'Passed',
        true
    ),
    (
        6,
        469,
        169,
        198,
        15.7,
        1900,
        'Kobe',
        'Japan',
        '8702.10',
        'Passed',
        true
    ),
    (
        7,
        475,
        188,
        178,
        15.9,
        2100,
        'Nagoya',
        'Japan',
        '8703.32',
        'Passed',
        true
    ),
    (
        8,
        445,
        174,
        147,
        11.4,
        1400,
        'Tokyo',
        'Japan',
        '8703.90',
        'Passed',
        true
    ),
    (
        9,
        430,
        177,
        160,
        12.2,
        1300,
        'Yokohama',
        'Japan',
        '8703.23',
        'Passed',
        true
    ),
    (
        10,
        470,
        173,
        186,
        15.1,
        1700,
        'Osaka',
        'Japan',
        '8702.10',
        'Passed',
        true
    ),
    (
        11,
        469,
        173,
        182,
        14.8,
        1650,
        'Kobe',
        'Japan',
        '8702.10',
        'Passed',
        true
    ),
    (
        12,
        339,
        147,
        172,
        8.6,
        1050,
        'Tokyo',
        'Japan',
        '8703.21',
        'Passed',
        true
    );

-- Insert Vehicle Images
INSERT INTO
    "vehicle_images" (
        "vehicle_id",
        "url",
        "alt_text",
        "order",
        "is_primary"
    )
VALUES
    -- Nissan X-Trail
    (
        1,
        'https://placehold.co/800x600/2563eb/ffffff?text=Nissan+X-Trail+Front',
        'Nissan X-Trail Front View',
        0,
        true
    ),
    (
        1,
        'https://placehold.co/800x600/1e40af/ffffff?text=Nissan+X-Trail+Side',
        'Nissan X-Trail Side View',
        1,
        false
    ),
    (
        1,
        'https://placehold.co/800x600/3b82f6/ffffff?text=Nissan+X-Trail+Interior',
        'Nissan X-Trail Interior',
        2,
        false
    ),
    -- Toyota Land Cruiser
    (
        2,
        'https://placehold.co/800x600/059669/ffffff?text=Land+Cruiser+Front',
        'Toyota Land Cruiser Front View',
        0,
        true
    ),
    (
        2,
        'https://placehold.co/800x600/047857/ffffff?text=Land+Cruiser+Side',
        'Toyota Land Cruiser Side View',
        1,
        false
    ),
    (
        2,
        'https://placehold.co/800x600/10b981/ffffff?text=Land+Cruiser+Interior',
        'Toyota Land Cruiser Interior',
        2,
        false
    ),
    -- Honda Fit
    (
        3,
        'https://placehold.co/800x600/dc2626/ffffff?text=Honda+Fit+Front',
        'Honda Fit Front View',
        0,
        true
    ),
    (
        3,
        'https://placehold.co/800x600/b91c1c/ffffff?text=Honda+Fit+Side',
        'Honda Fit Side View',
        1,
        false
    ),
    -- Nissan Patrol
    (
        4,
        'https://placehold.co/800x600/1f2937/ffffff?text=Nissan+Patrol+Front',
        'Nissan Patrol Front View',
        0,
        true
    ),
    (
        4,
        'https://placehold.co/800x600/111827/ffffff?text=Nissan+Patrol+Side',
        'Nissan Patrol Side View',
        1,
        false
    ),
    -- Mazda CX-5
    (
        5,
        'https://placehold.co/800x600/7c3aed/ffffff?text=Mazda+CX-5+Front',
        'Mazda CX-5 Front View',
        0,
        true
    ),
    (
        5,
        'https://placehold.co/800x600/6d28d9/ffffff?text=Mazda+CX-5+Side',
        'Mazda CX-5 Side View',
        1,
        false
    ),
    -- Toyota Hiace
    (
        6,
        'https://placehold.co/800x600/ea580c/ffffff?text=Toyota+Hiace+Front',
        'Toyota Hiace Front View',
        0,
        true
    ),
    (
        6,
        'https://placehold.co/800x600/c2410c/ffffff?text=Toyota+Hiace+Side',
        'Toyota Hiace Side View',
        1,
        false
    ),
    -- Mitsubishi Pajero
    (
        7,
        'https://placehold.co/800x600/0891b2/ffffff?text=Mitsubishi+Pajero',
        'Mitsubishi Pajero Front View',
        0,
        true
    ),
    -- Toyota Prius
    (
        8,
        'https://placehold.co/800x600/4f46e5/ffffff?text=Toyota+Prius+Front',
        'Toyota Prius Front View',
        0,
        true
    ),
    (
        8,
        'https://placehold.co/800x600/4338ca/ffffff?text=Toyota+Prius+Side',
        'Toyota Prius Side View',
        1,
        false
    ),
    -- Honda Vezel
    (
        9,
        'https://placehold.co/800x600/be123c/ffffff?text=Honda+Vezel+Front',
        'Honda Vezel Front View',
        0,
        true
    ),
    -- Nissan Serena
    (
        10,
        'https://placehold.co/800x600/0d9488/ffffff?text=Nissan+Serena+Front',
        'Nissan Serena Front View',
        0,
        true
    ),
    -- Toyota Voxy
    (
        11,
        'https://placehold.co/800x600/0284c7/ffffff?text=Toyota+Voxy+Front',
        'Toyota Voxy Front View',
        0,
        true
    ),
    -- Suzuki Jimny
    (
        12,
        'https://placehold.co/800x600/eab308/ffffff?text=Suzuki+Jimny+Front',
        'Suzuki Jimny Front View',
        0,
        true
    ),
    (
        12,
        'https://placehold.co/800x600/ca8a04/ffffff?text=Suzuki+Jimny+Side',
        'Suzuki Jimny Side View',
        1,
        false
    );

-- Insert Sample Invoices
INSERT INTO
    "invoices" (
        "site_id",
        "vehicle_id",
        "user_id",
        "invoice_number",
        "currency_code",
        "amount_fob",
        "amount_freight",
        "amount_insurance",
        "amount_inspection",
        "amount_total",
        "payment_status"
    )
VALUES (
        1,
        10,
        5,
        'INV-2024-001',
        'USD',
        13000.00,
        800.00,
        200.00,
        100.00,
        14100.00,
        'PAID'
    ),
    (
        1,
        7,
        6,
        'INV-2024-002',
        'USD',
        16000.00,
        900.00,
        250.00,
        100.00,
        17250.00,
        'PARTIAL'
    ),
    (
        1,
        1,
        5,
        'INV-2024-003',
        'USD',
        15000.00,
        850.00,
        220.00,
        100.00,
        16170.00,
        'PENDING'
    );

-- Update sequence values to start from the correct number
SELECT setval ( '"sites_id_seq"', ( SELECT MAX(id) FROM "sites" ) );

SELECT setval ( '"users_id_seq"', ( SELECT MAX(id) FROM "users" ) );

SELECT setval ( '"vehicles_id_seq"', ( SELECT MAX(id) FROM "vehicles" ) );

SELECT setval (
        '"vehicle_specs_id_seq"', (
            SELECT MAX(id)
            FROM "vehicle_specs"
        )
    );

SELECT setval (
        '"vehicle_logistics_id_seq"', (
            SELECT MAX(id)
            FROM "vehicle_logistics"
        )
    );

SELECT setval (
        '"vehicle_images_id_seq"', (
            SELECT MAX(id)
            FROM "vehicle_images"
        )
    );

SELECT setval ( '"invoices_id_seq"', ( SELECT MAX(id) FROM "invoices" ) );

SELECT setval (
        '"currencies_id_seq"', (
            SELECT MAX(id)
            FROM "currencies"
        )
    );

SELECT setval ( '"ports_id_seq"', ( SELECT MAX(id) FROM "ports" ) );