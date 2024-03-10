import { User } from '@prisma/client';
import { UsersService } from './user.service';
import {
  Controller,
  Get,
  Delete,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/')
  public async getAll(): Promise<User[]> {
    return this.usersService.getAll();
  }

  @Get('/:id')
  public async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.usersService.getById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
  @Delete('/:id')
  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  public async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.usersService.getById(id)))
      throw new NotFoundException('User not found');
    await this.usersService.deleteById(id);
    return { success: true };
  }
}