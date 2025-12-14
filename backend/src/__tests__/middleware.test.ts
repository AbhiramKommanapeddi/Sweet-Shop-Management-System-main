import request from 'supertest';
import express from 'express';
import jwt from 'jsonwebtoken';
import { authenticate } from '../middleware/authMiddleware';

const app = express();
app.use(express.json());
app.get('/protected', authenticate, (req: any, res) => {
    res.json({ message: 'Protected data', user: req.user });
});

describe('Auth Middleware', () => {
    it('should deny access without token', async () => {
        const res = await request(app).get('/protected');
        expect(res.statusCode).toEqual(401);
    });

    it('should deny access with invalid token', async () => {
        const res = await request(app).get('/protected').set('Authorization', 'Bearer invalidtoken');
        expect(res.statusCode).toEqual(400);
    });

    it('should allow access with valid token', async () => {
        const token = jwt.sign({ userId: 1 }, process.env.JWT_SECRET || 'secret');
        const res = await request(app).get('/protected').set('Authorization', `Bearer ${token}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body.user).toHaveProperty('userId', 1);
    });
});
