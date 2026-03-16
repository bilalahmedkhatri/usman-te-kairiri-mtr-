# Database Migration Instructions

## Quick Start

Once your database is connected, run these commands:

```bash
cd d:\usman_app\frontend

# Generate and apply migration
npx prisma migrate dev --name add_role_based_features

# Generate Prisma Client
npx prisma generate

# Restart dev server
# Press Ctrl+C in the terminal running npm run dev, then:
npm run dev
```

## What Will Be Created

The migration will create **6 new tables**:

1. **dealer_profiles** - Public dealer information
2. **wishlists** - Buyer saved vehicles
3. **cart_items** - Shopping cart
4. **bookings** - Reserved vehicles
5. **inquiries** - Buyer-manager messages
6. **inquiry_responses** - Message threads

## Verification

After migration, verify in your database:

```sql
-- Check new tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN (
  'dealer_profiles', 
  'wishlists', 
  'cart_items', 
  'bookings', 
  'inquiries', 
  'inquiry_responses'
);
```

## Troubleshooting

### If migration fails:

1. **Check database connection**
   - Verify `.env` has correct `DATABASE_URL`
   - Test connection: `npx prisma db pull`

2. **Check for conflicts**
   - Existing tables with same names
   - Foreign key conflicts

3. **Reset if needed** (⚠️ DELETES ALL DATA)
   ```bash
   npx prisma migrate reset
   ```

## Next: Create Seed Data

After successful migration, create test users for each role:

```typescript
// prisma/seed.ts
import { PrismaClient, UserRole } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create test users for each role
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'admin@example.com',
        name: 'Admin User',
        password: hashedPassword,
        role: 'ADMIN',
      },
    }),
    // ... add manager, dealer, supplier, buyer
  ]);

  console.log('Seed data created successfully!');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
```

Run seed:
```bash
npx prisma db seed
```
