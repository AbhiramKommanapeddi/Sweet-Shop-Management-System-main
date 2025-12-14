import request from 'supertest';
import app from '../app';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

describe('Sweets Endpoints', () => {
    let token: string;

    beforeAll(async () => {
        await prisma.sweet.deleteMany();
        await prisma.user.deleteMany();

        // Create admin user
        const hashedPassword = await import('bcryptjs').then(b => b.hash('password123', 10));
        const user = await prisma.user.create({
            data: {
                email: 'admin@example.com',
                password: hashedPassword,
                isAdmin: true
            }
        });

        token = jwt.sign(
            { userId: user.id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET || 'secret'
        );
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it('should create a new sweet (Admin)', async () => {
        const res = await request(app)
            .post('/api/sweets')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: 'Chocolate Bar',
                category: 'Chocolate',
                price: 2.50,
                quantity: 100
            });

        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('id');
        expect(res.body.name).toEqual('Chocolate Bar');
    });

    it('should list all sweets', async () => {
        const res = await request(app).get('/api/sweets');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
        expect(res.body.length).toBeGreaterThan(0);
    });
});
