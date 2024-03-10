import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  public getAllProducts(): Promise<Product[]> {
    return this.prismaService.product.findMany({
      include: {
        gallery: true,
      },
    });
  }

  public getProductById(id: string): Promise<Product | null> {
    return this.prismaService.product.findUnique({
      where: { id },
      include: {
        gallery: true,
      },
    });
  }

  public async createProduct(
    productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Product> {
    try {
      return await this.prismaService.product.create({
        data: productData,
      });
    } catch (error) {
      if (error.code === 'P2002') {
        throw new ConflictException(
          'Product with the same title already exists',
        );
      }
      throw error;
    }
  }

  public async updateProduct(
    id: string,
    productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Product> {
    try {
      return this.prismaService.product.update({
        where: { id },
        data: productData,
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Product not found');
      }
      if (error.code === 'P2002') {
        throw new ConflictException(
          'Product with the same title already exists',
        );
      }
      throw error;
    }
  }

  public async deleteProduct(id: string): Promise<Product> {
    return this.prismaService.product.delete({
      where: { id },
    });
  }
}
