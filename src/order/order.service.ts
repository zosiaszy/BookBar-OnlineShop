import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Order, CartProduct } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private prismaService: PrismaService) {}

  public async getAllOrders(): Promise<Order[]> {
    return this.prismaService.order.findMany({
      include: {
        cartProducts: true,
      },
    });
  }

  public async getOrderById(id: string): Promise<Order | null> {
    return this.prismaService.order.findUnique({
      where: { id },
      include: {
        cartProducts: true,
      },
    });
  }

  public async createOrder(
    orderData: Omit<Order, 'id' | 'dateOfCreation'>,
    cartProducts: Omit<CartProduct, 'id'>[],
  ): Promise<Order> {
    try {
      return await this.prismaService.order.create({
        data: {
          ...orderData,
          cartProducts: {
            create: cartProducts.map((cartProduct) => ({
              ...cartProduct,
              productId: cartProduct.productId,
            })),
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException('Order with the same ID already exists');
      }
      throw error;
    }
  }

  public async updateOrder(
    id: string,
    orderData: Omit<Order, 'id' | 'dateOfCreation'>,
  ): Promise<Order> {
    try {
      return await this.prismaService.order.update({
        where: { id },
        data: orderData,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Order not found');
      }
      if (error.code === 'P2002') {
        throw new ConflictException('Order with the same ID already exists');
      }
      throw error;
    }
  }

  public async deleteOrder(id: string): Promise<Order> {
    return this.prismaService.order.delete({
      where: { id },
    });
  }
}