import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const categoryImages: { [key: string]: string } = {
    'Bakery': 'http://localhost:5000/images/bakery.png',
    'Chocolates': 'http://localhost:5000/images/chocolate.png',
    'Snacks': 'http://localhost:5000/images/donuts.png',
    'Frozen Desserts': 'http://localhost:5000/images/ice-cream.png',
    'Indian Sweets': 'http://localhost:5000/images/indian.png',
    'Confectionery': 'http://localhost:5000/images/candy.png',
    'Desserts': 'http://localhost:5000/images/ice-cream.png',
    'Breakfast Sweets': 'http://localhost:5000/images/bakery.png',
};

async function main() {
    const sweets = await prisma.sweet.findMany();

    for (const sweet of sweets) {
        const imageUrl = categoryImages[sweet.category] || 'http://localhost:5000/images/bakery.png';
        // Only update if missing or if we want to force refresh (let's force refresh to ensure correctness)
        await prisma.sweet.update({
            where: { id: sweet.id },
            data: { imageUrl }
        });
        console.log(`Updated ${sweet.name} with ${imageUrl}`);
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
