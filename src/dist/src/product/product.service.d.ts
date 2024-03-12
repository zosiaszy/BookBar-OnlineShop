import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from '@prisma/client';
export declare class ProductService {
    private prismaService;
    constructor(prismaService: PrismaService);
    getAllProducts(): Promise<Product[]>;
    getProductById(id: string): Promise<Product | null>;
    searchProducts(searchPhrase: string): Promise<Product[]>;
    createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product>;
    updateProduct(id: string, productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product>;
    deleteProduct(id: string): Promise<Product>;
}
