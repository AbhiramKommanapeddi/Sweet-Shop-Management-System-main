import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const setAdmin = async () => {
    const email = process.argv[2];
    if (!email) {
        console.error('Please provide an email address');
        process.exit(1);
    }

    try {
        const user = await prisma.user.update({
            where: { email },
            data: { isAdmin: true },
        });
        console.log(`User ${user.email} is now an Admin!`);
    } catch (error) {
        console.error('Failed to update user:', error);
    } finally {
        await prisma.$disconnect();
    }
};

setAdmin();
