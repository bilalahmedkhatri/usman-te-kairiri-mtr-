-- Migration: Convert UUID IDs to Integer Auto-Increment
-- WARNING: This will DROP all existing tables and data!
-- Run this script to reset the database with integer IDs

-- Drop all tables in reverse dependency order
DROP TABLE IF EXISTS "invoices" CASCADE;

DROP TABLE IF EXISTS "vehicle_images" CASCADE;

DROP TABLE IF EXISTS "vehicle_logistics" CASCADE;

DROP TABLE IF EXISTS "vehicle_specs" CASCADE;

DROP TABLE IF EXISTS "vehicles" CASCADE;

DROP TABLE IF EXISTS "sessions" CASCADE;

DROP TABLE IF EXISTS "accounts" CASCADE;

DROP TABLE IF EXISTS "users" CASCADE;

DROP TABLE IF EXISTS "sites" CASCADE;

DROP TABLE IF EXISTS "ports" CASCADE;

DROP TABLE IF EXISTS "currencies" CASCADE;

DROP TABLE IF EXISTS "verification_tokens" CASCADE;

-- Create tables with integer auto-increment IDs
-- Sites Table
CREATE TABLE "sites" (
    "id" SERIAL PRIMARY KEY,
    "domain" VARCHAR(255) UNIQUE NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "theme_config" JSONB,
    "contact_info" JSONB,
    "default_currency_id" VARCHAR(10),
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users Table
CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR(255) UNIQUE NOT NULL,
    "name" VARCHAR(255),
    "password" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(50),
    "country" VARCHAR(100),
    "department" VARCHAR(100),
    "role" VARCHAR(20) DEFAULT 'USER',
    "status" VARCHAR(20) DEFAULT 'ACTIVE',
    "email_verified" TIMESTAMP,
    "image" TEXT,
    "site_id" INTEGER REFERENCES "sites" ("id") ON DELETE SET NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Accounts Table (for OAuth)
CREATE TABLE "accounts" (
    "id" SERIAL PRIMARY KEY,
    "user_id" INTEGER NOT NULL REFERENCES "users" ("id") ON DELETE CASCADE,
    "type" VARCHAR(50) NOT NULL,
    "provider" VARCHAR(50) NOT NULL,
    "provider_account_id" VARCHAR(255) NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" VARCHAR(50),
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    UNIQUE (
        "provider",
        "provider_account_id"
    )
);

-- Sessions Table
CREATE TABLE "sessions" (
    "id" SERIAL PRIMARY KEY,
    "session_token" VARCHAR(255) UNIQUE NOT NULL,
    "user_id" INTEGER NOT NULL REFERENCES "users" ("id") ON DELETE CASCADE,
    "expires" TIMESTAMP NOT NULL
);

-- Verification Tokens Table
CREATE TABLE "verification_tokens" (
    "identifier" VARCHAR(255) NOT NULL,
    "token" VARCHAR(255) UNIQUE NOT NULL,
    "expires" TIMESTAMP NOT NULL,
    UNIQUE ("identifier", "token")
);

-- Vehicles Table
CREATE TABLE "vehicles" (
    "id" SERIAL PRIMARY KEY,
    "site_id" INTEGER NOT NULL REFERENCES "sites" ("id") ON DELETE CASCADE,
    "stock_number" VARCHAR(100) NOT NULL,
    "vin_chassis" VARCHAR(100),
    "make" VARCHAR(100) NOT NULL,
    "model" VARCHAR(100) NOT NULL,
    "year_manufacture" INTEGER NOT NULL,
    "year_registration" INTEGER,
    "price_fob" DECIMAL(12, 2) NOT NULL,
    "status" VARCHAR(20) DEFAULT 'AVAILABLE',
    "featured" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vehicle Specs Table
CREATE TABLE "vehicle_specs" (
    "id" SERIAL PRIMARY KEY,
    "vehicle_id" INTEGER UNIQUE NOT NULL REFERENCES "vehicles" ("id") ON DELETE CASCADE,
    "engine_code" VARCHAR(50),
    "engine_cc" INTEGER,
    "fuel_type" VARCHAR(20),
    "transmission" VARCHAR(50),
    "drive_type" VARCHAR(20),
    "steering" VARCHAR(20),
    "seats" INTEGER,
    "doors" INTEGER,
    "color_exterior" VARCHAR(50),
    "color_interior" VARCHAR(50),
    "trim_grade" VARCHAR(50),
    "mileage_km" INTEGER,
    "vehicle_type" VARCHAR(50),
    "options" JSONB,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vehicle Logistics Table
CREATE TABLE "vehicle_logistics" (
    "id" SERIAL PRIMARY KEY,
    "vehicle_id" INTEGER UNIQUE NOT NULL REFERENCES "vehicles" ("id") ON DELETE CASCADE,
    "length_cm" INTEGER,
    "width_cm" INTEGER,
    "height_cm" INTEGER,
    "m3" DECIMAL(5, 2),
    "weight_kg" INTEGER,
    "current_port_id" VARCHAR(50),
    "origin_country" VARCHAR(100),
    "hs_code" VARCHAR(50),
    "inspection_status" VARCHAR(50),
    "export_cert_status" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vehicle Images Table
CREATE TABLE "vehicle_images" (
    "id" SERIAL PRIMARY KEY,
    "vehicle_id" INTEGER NOT NULL REFERENCES "vehicles" ("id") ON DELETE CASCADE,
    "url" TEXT NOT NULL,
    "alt_text" VARCHAR(255),
    "order" INTEGER DEFAULT 0,
    "is_primary" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Invoices Table
CREATE TABLE "invoices" (
    "id" SERIAL PRIMARY KEY,
    "site_id" INTEGER NOT NULL REFERENCES "sites" ("id") ON DELETE CASCADE,
    "vehicle_id" INTEGER NOT NULL REFERENCES "vehicles" ("id") ON DELETE RESTRICT,
    "user_id" INTEGER NOT NULL REFERENCES "users" ("id") ON DELETE RESTRICT,
    "invoice_number" VARCHAR(100) UNIQUE NOT NULL,
    "currency_code" VARCHAR(10) NOT NULL,
    "amount_fob" DECIMAL(12, 2) NOT NULL,
    "amount_freight" DECIMAL(12, 2) NOT NULL,
    "amount_insurance" DECIMAL(12, 2) NOT NULL,
    "amount_inspection" DECIMAL(12, 2) NOT NULL,
    "amount_total" DECIMAL(12, 2) NOT NULL,
    "payment_status" VARCHAR(20) DEFAULT 'PENDING',
    "consignee_details" JSONB,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Currencies Table
CREATE TABLE "currencies" (
    "id" SERIAL PRIMARY KEY,
    "code" VARCHAR(10) UNIQUE NOT NULL,
    "symbol" VARCHAR(10) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Ports Table
CREATE TABLE "ports" (
    "id" SERIAL PRIMARY KEY,
    "name" VARCHAR(255) NOT NULL,
    "country" VARCHAR(100) NOT NULL,
    "region" VARCHAR(100),
    "is_destination" BOOLEAN DEFAULT false,
    "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Indexes
CREATE INDEX "idx_users_email" ON "users" ("email");

CREATE INDEX "idx_users_site_id" ON "users" ("site_id");

CREATE INDEX "idx_users_role" ON "users" ("role");

CREATE INDEX "idx_users_status" ON "users" ("status");

CREATE INDEX "idx_vehicles_site_id" ON "vehicles" ("site_id");

CREATE INDEX "idx_vehicles_make" ON "vehicles" ("make");

CREATE INDEX "idx_vehicles_status" ON "vehicles" ("status");

CREATE INDEX "idx_vehicles_featured" ON "vehicles" ("featured");

CREATE INDEX "idx_vehicle_images_vehicle_id" ON "vehicle_images" ("vehicle_id");

CREATE INDEX "idx_invoices_site_id" ON "invoices" ("site_id");

CREATE INDEX "idx_invoices_user_id" ON "invoices" ("user_id");

-- Create trigger function for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
CREATE TRIGGER update_sites_updated_at BEFORE UPDATE ON "sites"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON "users"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vehicles_updated_at BEFORE UPDATE ON "vehicles"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vehicle_specs_updated_at BEFORE UPDATE ON "vehicle_specs"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_vehicle_logistics_updated_at BEFORE UPDATE ON "vehicle_logistics"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON "invoices"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_currencies_updated_at BEFORE UPDATE ON "currencies"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ports_updated_at BEFORE UPDATE ON "ports"
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();