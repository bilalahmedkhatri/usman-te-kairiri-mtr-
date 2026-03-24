-- Seed data for Car Export Platform
-- Clean up existing data to ensure clean IDs
TRUNCATE TABLE "users",
"sites",
"currencies",
"ports"
RESTART IDENTITY CASCADE;

-- Insert Currencies
INSERT INTO
    "currencies" (
        "code",
        "symbol",
        "name",
        "created_at",
        "updated_at"
    )
VALUES (
        'USD',
        '$',
        'US Dollar',
        NOW(),
        NOW()
    ),
    (
        'JPY',
        '¥',
        'Japanese Yen',
        NOW(),
        NOW()
    ),
    (
        'EUR',
        '€',
        'Euro',
        NOW(),
        NOW()
    ),
    (
        'GBP',
        '£',
        'British Pound',
        NOW(),
        NOW()
    ),
    (
        'AUD',
        'A$',
        'Australian Dollar',
        NOW(),
        NOW()
    ),
    (
        'CAD',
        'C$',
        'Canadian Dollar',
        NOW(),
        NOW()
    ),
    (
        'AED',
        'د.إ',
        'UAE Dirham',
        NOW(),
        NOW()
    ),
    (
        'PKR',
        '₨',
        'Pakistani Rupee',
        NOW(),
        NOW()
    );

-- Insert Ports
INSERT INTO
    "ports" (
        "name",
        "country",
        "region",
        "is_destination",
        "created_at",
        "updated_at"
    )
VALUES
    -- Origin Ports (Japan)
    (
        'Yokohama',
        'Japan',
        'Kanto',
        false,
        NOW(),
        NOW()
    ),
    (
        'Nagoya',
        'Japan',
        'Chubu',
        false,
        NOW(),
        NOW()
    ),
    (
        'Osaka',
        'Japan',
        'Kansai',
        false,
        NOW(),
        NOW()
    ),
    (
        'Kobe',
        'Japan',
        'Kansai',
        false,
        NOW(),
        NOW()
    ),
    (
        'Tokyo',
        'Japan',
        'Kanto',
        false,
        NOW(),
        NOW()
    ),
    -- Destination Ports
    (
        'Karachi',
        'Pakistan',
        'Sindh',
        true,
        NOW(),
        NOW()
    ),
    (
        'Port Qasim',
        'Pakistan',
        'Sindh',
        true,
        NOW(),
        NOW()
    ),
    (
        'Dubai',
        'UAE',
        'Dubai',
        true,
        NOW(),
        NOW()
    ),
    (
        'Jebel Ali',
        'UAE',
        'Dubai',
        true,
        NOW(),
        NOW()
    ),
    (
        'Mombasa',
        'Kenya',
        'Coast',
        true,
        NOW(),
        NOW()
    ),
    (
        'Dar es Salaam',
        'Tanzania',
        'Dar es Salaam',
        true,
        NOW(),
        NOW()
    ),
    (
        'Colombo',
        'Sri Lanka',
        'Western',
        true,
        NOW(),
        NOW()
    ),
    (
        'Sydney',
        'Australia',
        'New South Wales',
        true,
        NOW(),
        NOW()
    ),
    (
        'Melbourne',
        'Australia',
        'Victoria',
        true,
        NOW(),
        NOW()
    );

-- Insert Site
INSERT INTO
    "sites" (
        "domain",
        "name",
        "theme_config",
        "contact_info",
        "default_currency_id",
        "is_active",
        "created_at",
        "updated_at"
    )
VALUES (
        'localhost',
        'TE KAIRIRI MOTORS',
        '{"primaryColor": "#2563eb", "secondaryColor": "#1e40af", "theme": "light"}',
        '{"email": "info@tokyointernationaljp.com", "phone": "+8190-4026-8828", "address": "320-1 Kanno, Sodegaura-shi, Chiba, Japan 299-0257"}',
        'JPY',
        true,
        NOW(),
        NOW()
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
        "site_id",
        "created_at",
        "updated_at"
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
        1,
        NOW(),
        NOW()
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
        1,
        NOW(),
        NOW()
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
        1,
        NOW(),
        NOW()
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
        1,
        NOW(),
        NOW()
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
        1,
        NOW(),
        NOW()
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
        1,
        NOW(),
        NOW()
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
        1,
        NOW(),
        NOW()
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
        1,
        NOW(),
        NOW()
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
        1,
        NOW(),
        NOW()
    );