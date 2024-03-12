import { User } from '@prisma/client';
import { UsersService } from './user.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    getAll(): Promise<User[]>;
    getById(id: string): Promise<{
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    deleteById(id: string): Promise<{
        success: boolean;
    }>;
}
