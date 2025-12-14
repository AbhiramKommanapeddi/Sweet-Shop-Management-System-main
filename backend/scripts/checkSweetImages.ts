import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const sweets = await prisma.sweet.findMany();
    console.log('Total sweets:', sweets.length);
    sweets.forEach(s => {
        console.log(`${s.name} (${s.category}): ${s.imageUrl}`);
    });
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
