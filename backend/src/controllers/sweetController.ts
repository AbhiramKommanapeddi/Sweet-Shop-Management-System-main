import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest } from '../middleware/authMiddleware';

const prisma = new PrismaClient();

export const createSweet = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user || !req.user.isAdmin) {
            return res.status(403).json({ error: 'Access denied. Admins only.' });
        }

        const { name, category, price, quantity, imageUrl } = req.body;
        const sweet = await prisma.sweet.create({
            data: { name, category, price, quantity, imageUrl },
        });
        res.status(201).json(sweet);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getSweets = async (req: Request, res: Response) => {
    try {
        const sweets = await prisma.sweet.findMany();
        res.json(sweets);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getSweetById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const sweet = await prisma.sweet.findUnique({ where: { id: Number(id) } });
        if (!sweet) return res.status(404).json({ error: 'Sweet not found' });
        res.json(sweet);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const updateSweet = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user || !req.user.isAdmin) return res.status(403).json({ error: 'Access denied' });
        const { id } = req.params;
        const { name, category, price, quantity, imageUrl } = req.body;

        const sweet = await prisma.sweet.update({
            where: { id: Number(id) },
            data: { name, category, price, quantity, imageUrl }
        });
        res.json(sweet);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update sweet' });
    }
};

export const deleteSweet = async (req: AuthRequest, res: Response) => {
    try {
        if (!req.user || !req.user.isAdmin) return res.status(403).json({ error: 'Access denied' });
        const { id } = req.params;
        await prisma.sweet.delete({ where: { id: Number(id) } });
        res.json({ message: 'Sweet deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete sweet' });
    }
};

export const purchaseSweet = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user?.id;
        console.log(`Purchase attempt: User ${userId} buying Sweet ${id}`);

        if (!userId) {
            console.error('Purchase failed: User not found in token');
            return res.status(401).json({ error: 'User not found' });
        }

        // Transaction to ensure atomic update and order creation
        const result = await prisma.$transaction(async (tx) => {
            const sweet = await tx.sweet.findUnique({ where: { id: Number(id) } });
            if (!sweet || sweet.quantity < 1) throw new Error('Out of stock');

            const updatedSweet = await tx.sweet.update({
                where: { id: Number(id) },
                data: { quantity: { decrement: 1 } }
            });

            // Create Order Record
            const order = await tx.order.create({
                data: {
                    userId,
                    sweetId: Number(id),
                    sweetName: sweet.name,
                    price: sweet.price,
                    quantity: 1,
                    totalPrice: sweet.price
                }
            });
            console.log('Order created:', order);

            return updatedSweet;
        });
        res.json(result);
    } catch (error: any) {
        console.error('Purchase error:', error);
        res.status(400).json({ error: error.message || 'Purchase failed' });
    }
};

export const getMyOrders = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.id;
        console.log(`Fetching orders for User ${userId}`);
        const orders = await prisma.order.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            include: { sweet: true }
        });
        console.log(`Found ${orders.length} orders`);
        res.json(orders);
    } catch (error) {
        console.error('GetOrders error:', error);
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
};
