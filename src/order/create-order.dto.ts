import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  Min,
  IsUUID,
  IsArray,
} from 'class-validator';

class CartProductDTO {
  @IsNotEmpty()
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @IsNumber()
  count: number;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsString()
  comment: string;

  @IsNotEmpty()
  @IsUUID()
  orderId: string;
}

export class OrderDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  paymentMethod: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  totalPrice: number;

  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsArray()
  cartProducts: CartProductDTO[];
}
