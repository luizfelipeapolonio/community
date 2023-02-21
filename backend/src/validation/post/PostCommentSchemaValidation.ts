import { IsString, IsNotEmpty } from "class-validator";

export class PostCommentSchemaValidation {
    @IsNotEmpty({ message: "Escreva algum conteúdo no comentário" })
    @IsString({ message: "O comentário deve ser um texto" })
    content!: string;
}