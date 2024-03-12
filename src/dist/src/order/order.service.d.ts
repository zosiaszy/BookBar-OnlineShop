import { PrismaService } from 'src/prisma/prisma.service';
import { Order, CartProduct } from '@prisma/client';
export declare class OrderService {
    private prismaService;
    constructor(prismaService: PrismaService);
    getAllOrders(): Promise<Order[]>;
    getOrderById(id: string): Promise<Order | null>;
    createOrder(orderData: Omit<Order, 'id' | 'dateOfCreation'>, cartProducts: Omit<CartProduct, 'id'>[], userId: string): Promise<Order>;
    updateOrder(id: string, orderData: Omit<Order, 'id' | 'dateOfCreation'>): Promise<Order>;
    deleteOrder(id: string): Promise<Order>;
}
