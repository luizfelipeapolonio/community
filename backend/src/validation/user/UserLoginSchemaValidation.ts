import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserLoginSchemaValidation {
    @IsNotEmpty({ message: "O e-mail é obrigatório!" })
    @IsEmail()
    email!: string;

    @IsNotEmpty({ message: "A senha é obrigatória!" })
    @IsString()
    password!: string;
}