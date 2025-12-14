import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const sweets = [
    { name: 'Cakes', category: 'Bakery', price: 20.0, imageUrl: 'http://localhost:5000/images/bakery.png' },
    { name: 'Chocolate Bar', category: 'Chocolates', price: 5.0, imageUrl: 'http://localhost:5000/images/chocolate.png' },
    { name: 'Donuts', category: 'Snacks', price: 3.0, imageUrl: 'http://localhost:5000/images/donuts.png' },
    { name: 'Ice Cream', category: 'Frozen Desserts', price: 7.0, imageUrl: 'http://localhost:5000/images/ice-cream.png' },
    { name: 'Gulab Jamun', category: 'Indian Sweets', price: 10.0, imageUrl: 'http://localhost:5000/images/indian.png' },
    { name: 'Cookies', category: 'Bakery', price: 4.0, imageUrl: 'http://localhost:5000/images/bakery.png' },
    { name: 'Candy', category: 'Confectionery', price: 2.0, imageUrl: 'http://localhost:5000/images/candy.png' },
    { name: 'Pastry', category: 'Bakery', price: 4.0, imageUrl: 'http://localhost:5000/images/bakery.png' },
    { name: 'Muffins', category: 'Bakery', price: 3.0, imageUrl: 'http://localhost:5000/images/bakery.png' },
    { name: 'Ladoo', category: 'Indian Sweets', price: 8.0, imageUrl: 'http://localhost:5000/images/indian.png' },
    { name: 'Honey Cake', category: 'Bakery', price: 6.0, imageUrl: 'http://localhost:5000/images/bakery.png' },
    { name: 'Lollipop', category: 'Confectionery', price: 1.0, imageUrl: 'http://localhost:5000/images/candy.png' },
    { name: 'Pancakes', category: 'Breakfast Sweets', price: 8.0, imageUrl: 'http://localhost:5000/images/bakery.png' },
    { name: 'Kulfi', category: 'Indian Sweets', price: 5.0, imageUrl: 'http://localhost:5000/images/indian.png' },
    { name: 'Brownie', category: 'Bakery', price: 6.0, imageUrl: 'http://localhost:5000/images/bakery.png' },
    { name: 'Caramel Pudding', category: 'Desserts', price: 9.0, imageUrl: 'http://localhost:5000/images/ice-cream.png' },
    { name: 'Waffles', category: 'Bakery', price: 7.0, imageUrl: 'http://localhost:5000/images/bakery.png' },
    { name: 'Toffee', category: 'Confectionery', price: 2.0, imageUrl: 'http://localhost:5000/images/candy.png' },
    { name: 'Coconut Barfi', category: 'Indian Sweets', price: 8.0, imageUrl: 'http://localhost:5000/images/indian.png' },
    { name: 'Rasgulla', category: 'Indian Sweets', price: 9.0, imageUrl: 'http://localhost:5000/images/indian.png' },
    { name: 'Strawberry Tart', category: 'Bakery', price: 12.0, imageUrl: 'http://localhost:5000/images/bakery.png' },
    { name: 'Peanut Chikki', category: 'Indian Sweets', price: 4.0, imageUrl: 'http://localhost:5000/images/indian.png' },
    { name: 'Fudge', category: 'Chocolates', price: 6.0, imageUrl: 'http://localhost:5000/images/chocolate.png' },
    { name: 'Milk Cake', category: 'Indian Sweets', price: 10.0, imageUrl: 'http://localhost:5000/images/indian.png' },
    { name: 'Cupcake', category: 'Bakery', price: 4.0, imageUrl: 'http://localhost:5000/images/bakery.png' },
];

async function main() {
    console.log('Seeding sweets...');
    // Optional: Clear existing sweets?
    // await prisma.sweet.deleteMany(); 

    for (const sweet of sweets) {
        await prisma.sweet.create({
            data: {
                ...sweet,
                quantity: 100, // Default quantity
            },
        });
    }
    console.log('Seeding completed.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
