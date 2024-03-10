import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { User, Password } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  public async getAll(): Promise<User[]> {
    return this.prismaService.user.findMany({});
  }

  public async getById(id: User['id']): Promise<User | null> {
    return this.prismaService.user.findUnique({
      where: { id },
    });
  }

  public async getByEmail(
    email: User['email'],
  ): Promise<(User & { password: Password }) | null> {
    return this.prismaService.user.findUnique({
      where: { email },
      include: {
        password: true,
      },
    });
  }

  public async create(
    userData: Omit<User, 'id' | 'role'>,
    password: Password['hashedPassword'],
  ): Promise<User> {
    try {
      return await this.prismaService.user.create({
        data: {
          ...userData,
          password: {
            create: {
              hashedPassword: password,
            },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2002')
        throw new ConflictException('Email is already taken');
      throw error;
    }
  }
  public async updateById(
    userId: User['id'],
    userData: Omit<User, 'id' | 'role'>,
    password?: Password['hashedPassword'],
  ): Promise<User> {
    if (password) {
      return await this.prismaService.user.update({
        where: { id: userId },
        data: {
          ...userData,
          password: {
            update: {
              hashedPassword: password,
            },
          },
        },
      });
    } else {
      return await this.prismaService.user.update({
        where: { id: userId },
        data: userData,
      });
    }
  }

  public async deleteById(userId: User['id']): Promise<void> {
    const user = await this.prismaService.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    await this.prismaService.user.delete({ where: { id: userId } });
  }
}
