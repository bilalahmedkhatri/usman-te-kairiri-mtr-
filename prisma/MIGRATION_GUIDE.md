# Database Migration and Seed Instructions

## Overview
This guide will help you apply the database migration to convert from UUID IDs to integer auto-increment IDs, and then populate the database with seed data.

> **⚠️ WARNING**: This migration will **DROP ALL EXISTING DATA**. Make sure to backup any important data before proceeding.

## Prerequisites
- Docker container with PostgreSQL running
- Database connection details from `.env` file

## Step 1: Find Your Database Container

First, find the name of your PostgreSQL container:

```powershell
docker ps
```

Look for the container running PostgreSQL (usually named something like `postgres`, `car_export_db`, or similar).

## Step 2: Apply the Migration

Run the migration script to drop existing tables and create new ones with integer IDs:

```powershell
# Replace <container-name> with your actual container name
docker exec -i <container-name> psql -U car_export_user -d car_export_db < prisma/migrations/convert_to_integer_ids.sql
```

**Example:**
```powershell
docker exec -i postgres psql -U car_export_user -d car_export_db < prisma/migrations/convert_to_integer_ids.sql
```

## Step 3: Apply Seed Data

After the migration completes successfully, run the seed script:

```powershell
# Replace <container-name> with your actual container name
docker exec -i <container-name> psql -U car_export_user -d car_export_db < prisma/seed.sql
```

**Example:**
```powershell
docker exec -i postgres psql -U car_export_user -d car_export_db < prisma/seed.sql
```

## Step 4: Verify the Changes

Check that the data was inserted correctly:

```powershell
# Check users count
docker exec -it <container-name> psql -U car_export_user -d car_export_db -c "SELECT id, email, role FROM users;"

# Check vehicles count
docker exec -it <container-name> psql -U car_export_user -d car_export_db -c "SELECT id, make, model, year_manufacture FROM vehicles LIMIT 5;"

# Verify ID types (should show integer)
docker exec -it <container-name> psql -U car_export_user -d car_export_db -c "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'users' AND column_name = 'id';"
```

## Step 5: Restart Your Application

After applying the migration and seed data, restart your Next.js application:

```powershell
cd d:\usman_app\frontend
npm run dev
```

## Seed Data Summary

The seed script includes:

### Users (9 total)
- **admin@example.com** - Admin role
- **manager@example.com** - Manager role
- **dealer@example.com** - Dealer role
- **supplier@example.com** - Supplier role
- **buyer1@example.com** - Buyer role (Pakistan)
- **buyer2@example.com** - Buyer role (UAE)
- **buyer3@example.com** - Buyer role (Australia)
- **viewer@example.com** - Viewer role
- **inactive@example.com** - Inactive user

**Password for all users:** `password123`

### Vehicles (12 total)
- 3 featured vehicles (Nissan X-Trail, Toyota Land Cruiser, Honda Fit)
- Various makes: Nissan, Toyota, Honda, Mazda, Mitsubishi, Suzuki
- Complete with specs, logistics info, and images
- Different statuses: Available, Reserved, Sold

### Other Data
- **8 Currencies** (USD, JPY, EUR, GBP, AUD, CAD, AED, PKR)
- **14 Ports** (Japan origin ports + international destination ports)
- **1 Site** (TE KAIRIRI MOTORS)
- **3 Sample Invoices**

## Troubleshooting

### Error: "relation already exists"
This means tables weren't dropped properly. Try running:
```powershell
docker exec -it <container-name> psql -U car_export_user -d car_export_db -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
```
Then re-run the migration.

### Error: "database does not exist"
Create the database first:
```powershell
docker exec -it <container-name> psql -U car_export_user -c "CREATE DATABASE car_export_db;"
```

### TypeScript Errors
If you see TypeScript errors about ID types, make sure you've regenerated the Prisma client:
```powershell
npx prisma generate
```

## Verification Checklist

- [ ] Migration script executed without errors
- [ ] Seed script executed without errors
- [ ] Users table has 9 records
- [ ] Vehicles table has 12 records
- [ ] ID fields are integers (1, 2, 3, etc.)
- [ ] Application starts without errors
- [ ] Can login with seeded user credentials
- [ ] Vehicle list displays correctly
