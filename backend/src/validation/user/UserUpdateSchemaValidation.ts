import { IsOptional, MinLength, IsString } from "class-validator";

export class UserUpdateSchemaValidation {
    
    @MinLength(5, { message: "O nome precisa ter no mínimo 5 caracteres" })
    @IsString()
    @IsOptional()
    name!: string;

    @MinLength(5, { message: "A senha deve ter no mínimo 5 caracteres" })
    @IsString()
    @IsOptional()
    password!: string;
    
}