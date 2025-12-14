import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const checkOrders = async () => {
    try {
        const orders = await prisma.order.findMany();
        console.log('Total orders:', orders.length);
        console.log('Orders:', JSON.stringify(orders, null, 2));
    } catch (error) {
        console.error('Error fetching orders:', error);
    } finally {
        await prisma.$disconnect();
    }
};

checkOrders();
