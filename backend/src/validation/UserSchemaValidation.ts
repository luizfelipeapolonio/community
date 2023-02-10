import { 
    IsString, 
    MinLength, 
    IsEmail, 
    IsNotEmpty, 
    Equals,
    ValidateIf
} from "class-validator";

export class UserSchemaValidation {

    @MinLength(5, { message: "O nome deve ter no mínimo 5 caracteres" })
    @IsString({ message: "O nome deve ser um texto" })
    name!: string;
    
    @IsNotEmpty({ message: "O e-mail é obrigatório" })
    @IsEmail()
    email!:string;

    @MinLength(5, { message: "A senha deve ter no mínimo 5 caracteres" })
    @IsString()
    password!: string;

    /**
     * VALIDAR A CONFIRMAÇÃO DE SENHA
     */

    // @Equals(, { message: "As senhas devem ser iguais" })
    @IsNotEmpty({ message: "A confirmação de senha é obrigatória" })
    @IsString()
    confirmPassword!: string;
}