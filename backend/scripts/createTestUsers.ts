import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
    const password = await bcrypt.hash('password123', 10);

    // Create or Update Admin
    const adminEmail = 'admin@sweetshop.com';
    const admin = await prisma.user.upsert({
        where: { email: adminEmail },
        update: {
            password,
            isAdmin: true,
            name: 'Admin User'
        },
        create: {
            email: adminEmail,
            password,
            name: 'Admin User',
            isAdmin: true
        }
    });
    console.log(`Admin User: ${admin.email} / password123`);

    // Create or Update Regular User
    const userEmail = 'user@sweetshop.com';
    const user = await prisma.user.upsert({
        where: { email: userEmail },
        update: {
            password,
            isAdmin: false,
            name: 'Regular User'
        },
        create: {
            email: userEmail,
            password,
            name: 'Regular User',
            isAdmin: false
        }
    });
    console.log(`Regular User: ${user.email} / password123`);
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
