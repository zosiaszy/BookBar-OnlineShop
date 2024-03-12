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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let OrderService = class OrderService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getAllOrders() {
        return this.prismaService.order.findMany({
            include: {
                cartProducts: true,
            },
        });
    }
    async getOrderById(id) {
        return this.prismaService.order.findUnique({
            where: { id },
            include: {
                cartProducts: true,
            },
        });
    }
    async createOrder(orderData, cartProducts, userId) {
        try {
            return await this.prismaService.order.create({
                data: {
                    ...orderData,
                    userId: userId,
                    cartProducts: {
                        create: cartProducts.map((cartProduct) => ({
                            ...cartProduct,
                            productId: cartProduct.productId,
                        })),
                    },
                },
            });
        }
        catch (error) {
            if (error.code === 'P2002') {
                throw new common_1.ConflictException('Order with the same ID already exists');
            }
            throw error;
        }
    }
    async updateOrder(id, orderData) {
        try {
            return await this.prismaService.order.update({
                where: { id },
                data: orderData,
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException('Order not found');
            }
            if (error.code === 'P2002') {
                throw new common_1.ConflictException('Order with the same ID already exists');
            }
            throw error;
        }
    }
    async deleteOrder(id) {
        return this.prismaService.order.delete({
            where: { id },
        });
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderService);
//# sourceMappingURL=order.service.js.map