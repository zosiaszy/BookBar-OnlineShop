import { ProductService } from './product.service';
import { CreateProductDTO } from './create-product.dto';
import { UpdateProductDTO } from './update-product.dto';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getAll(): Promise<{
        id: string;
        title: string;
        author: string;
        rating: number;
        price: number;
        description: string;
        image: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getById(id: string): Promise<{
        id: string;
        title: string;
        author: string;
        rating: number;
        price: number;
        description: string;
        image: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    createProduct(productData: CreateProductDTO): Promise<{
        id: string;
        title: string;
        author: string;
        rating: number;
        price: number;
        description: string;
        image: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateProduct(id: string, productData: UpdateProductDTO): Promise<{
        id: string;
        title: string;
        author: string;
        rating: number;
        price: number;
        description: string;
        image: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    deleteProduct(id: string): Promise<{
        success: boolean;
    }>;
}
