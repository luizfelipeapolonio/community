import { 
    IsString, 
    IsOptional, 
    IsNotEmpty, 
    ArrayNotEmpty, 
    IsArray 
} from "class-validator";

export class PostUpdateSchemaValidation {
    
    @IsNotEmpty({ message: "O conteúdo do post não deve estar vazio!" })
    @IsString({ message: "O conteúdo do post deve ser um texto" })
    @IsOptional()
    content!: string;

    @IsArray()
    @ArrayNotEmpty({ message: "As tags devem ser inseridas" })
    @IsString({ each: true, message: "As tags devem ser um texto" })
    @IsNotEmpty({ each: true, message: "Deve haver pelo menos uma tag" })
    @IsOptional()
    tags!: string[];
}