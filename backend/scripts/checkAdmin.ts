import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const checkUser = async () => {
    try {
        const email = 'abi@gmail.com';
        const user = await prisma.user.findUnique({
            where: { email }
        });
        console.log('User Details:', user);
    } catch (error) {
        console.error('Error fetching user:', error);
    } finally {
        await prisma.$disconnect();
    }
};

checkUser();
