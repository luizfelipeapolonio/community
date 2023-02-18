import { IsString, IsNotEmpty, IsArray, MinLength, ArrayNotEmpty } from "class-validator";

export class PostCreateSchemaValidation {

    @MinLength(3, { message: "O título deve ter no mínimo 3 caracteres" })
    @IsString({ message: "O título deve ser um texto" })
    title!: string;

    @IsNotEmpty({ message: "O conteúdo do post é obrigatório" })
    @IsString({ message: "O conteúdo do post deve ser um texto" })
    content!: string;

    @IsArray()
    @ArrayNotEmpty({ message: "As tags são obrigatórias!" })
    @IsString({ each: true, message: "As tags devem ser um texto" })
    @IsNotEmpty({ each: true, message: "Insira pelo menos uma tag" })
    tags!: string[];
}