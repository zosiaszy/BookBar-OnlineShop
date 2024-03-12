import { AuthService } from './auth.service';
import { RegisterDTO } from './register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(registerData: RegisterDTO): Promise<{
        id: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    login(req: any, res: any): Promise<void>;
    getUser(req: any): any;
    logout(res: any): Promise<void>;
}
