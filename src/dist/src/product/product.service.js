"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductService = class ProductService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    getAllProducts() {
        return this.prismaService.product.findMany();
    }
    getProductById(id) {
        return this.prismaService.product.findUnique({
            where: { id },
            include: {
                gallery: true,
            }
        });
    }
    async searchProducts(searchPhrase) {
        return this.prismaService.product.findMany({
            where: {
                title: {
                    contains: searchPhrase,
                },
            },
        });
    }
    async createProduct(productData) {
        try {
            return await this.prismaService.product.create({
                data: productData,
            });
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.ConflictException('Product with the same title already exists');
            }
            throw error;
        }
    }
    async updateProduct(id, productData) {
        try {
            return this.prismaService.product.update({
                where: { id },
                data: productData,
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException('Product not found');
            }
            if (error.code === 'P2002') {
                throw new common_1.ConflictException('Product with the same title already exists');
            }
            throw error;
        }
    }
    async deleteProduct(id) {
        return this.prismaService.product.delete({
            where: { id },
        });
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductService);
//# sourceMappingURL=product.service.js.map