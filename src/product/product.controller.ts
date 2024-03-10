import {
  Controller,
  Get,
  Param,
  Body,
  Delete,
  Put,
  UseGuards,
  Post,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { NotFoundException } from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CreateProductDTO } from './create-product.dto'
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';
import { UpdateProductDTO } from './update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('/')
  async getAll() {
    return this.productService.getAllProducts();
  }

  @Get(':id')
  async getById(@Param('id') id: string) {
    return this.productService.getProductById(id);
  }

  @Post('/')
  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  async createProduct(@Body() productData: CreateProductDTO) {
    return this.productService.createProduct(productData);
  }

  @Put('/:id')
  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  async updateProduct(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() productData: UpdateProductDTO,
  ) {
    if (!(await this.productService.getProductById(id)))
      throw new NotFoundException('Product not found');
    return this.productService.updateProduct(id, productData);
  }

  @Delete('/:id')
  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  async deleteProduct(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.productService.getProductById(id)))
      throw new NotFoundException('Product not found');
    await this.productService.deleteProduct(id);
    return { success: true };
  }
}
