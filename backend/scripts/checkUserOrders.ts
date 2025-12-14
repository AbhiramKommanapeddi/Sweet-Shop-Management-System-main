import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const allOrders = await prisma.order.findMany();
    console.log('Total orders in DB:', allOrders.length);

    const user2Orders = await prisma.order.findMany({ where: { userId: 2 } });
    console.log('Orders for User ID 2 (abi@gmail.com):', user2Orders.length);
    console.log(JSON.stringify(user2Orders, null, 2));
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
