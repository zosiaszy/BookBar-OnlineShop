import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  NotFoundException,
  ConflictException,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDTO } from './create-order.dto';
import { CartProduct } from '@prisma/client';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  public getAllOrders() {
    return this.orderService.getAllOrders();
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getOrderById(@Param('id', new ParseUUIDPipe()) id: string) {
    const order = await this.orderService.getOrderById(id);
    if (!order) throw new NotFoundException('Order not found');
    return order;
  }

  @Post('/')
  async createOrder(@Body() orderData: OrderDTO) {
    console.log(orderData);
    try {
      const cartProducts: Omit<CartProduct, 'id'>[] = orderData.cartProducts;
      return this.orderService.createOrder(orderData, cartProducts);
    } catch (error) {
      throw error;
    }
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminAuthGuard)
  async updateOrder(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() orderData: OrderDTO,
  ) {
    if (!(await this.orderService.getOrderById(id)))
      throw new NotFoundException('Order not found');
    try {
      return this.orderService.updateOrder(id, orderData);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException('Order not found');
      }
      if (error instanceof ConflictException) {
        throw new ConflictException('Order with the same ID already exists');
      }
      throw error;
    }
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @UseGuards(AdminAuthGuard)
  async deleteOrder(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.orderService.getOrderById(id)))
      throw new NotFoundException('Order not found');
    return this.orderService.deleteOrder(id);
  }
}
