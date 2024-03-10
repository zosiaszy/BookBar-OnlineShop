import { IsString, Length, IsNotEmpty, IsEmail } from 'class-validator';


export class RegisterDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(5, 40)
  password: string;
}
