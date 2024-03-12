import { OrderService } from './order.service';
import { OrderDTO } from './create-order.dto';
export declare class OrderController {
    private orderService;
    constructor(orderService: OrderService);
    getAllOrders(): Promise<{
        id: string;
        userId: string;
        dateOfCreation: Date;
        name: string;
        email: string;
        address: string;
        paymentMethod: string;
        totalPrice: number;
    }[]>;
    getOrderById(id: string): Promise<{
        id: string;
        userId: string;
        dateOfCreation: Date;
        name: string;
        email: string;
        address: string;
        paymentMethod: string;
        totalPrice: number;
    }>;
    createOrder(orderData: OrderDTO): Promise<{
        id: string;
        userId: string;
        dateOfCreation: Date;
        name: string;
        email: string;
        address: string;
        paymentMethod: string;
        totalPrice: number;
    }>;
    updateOrder(id: string, orderData: OrderDTO): Promise<{
        id: string;
        userId: string;
        dateOfCreation: Date;
        name: string;
        email: string;
        address: string;
        paymentMethod: string;
        totalPrice: number;
    }>;
    deleteOrder(id: string): Promise<{
        id: string;
        userId: string;
        dateOfCreation: Date;
        name: string;
        email: string;
        address: string;
        paymentMethod: string;
        totalPrice: number;
    }>;
}
