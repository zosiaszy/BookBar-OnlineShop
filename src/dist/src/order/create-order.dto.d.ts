declare class CartProductDTO {
    productId: string;
    count: number;
    price: number;
    comment: string;
    orderId: string;
}
export declare class OrderDTO {
    name: string;
    email: string;
    address: string;
    paymentMethod: string;
    totalPrice: number;
    userId: string;
    cartProducts: CartProductDTO[];
}
export {};
