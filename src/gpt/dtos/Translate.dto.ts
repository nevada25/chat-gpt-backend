import { IsString } from "class-validator";

export class TranslateDto {
    @IsString()
    prompt: string; // Obligatoria
    @IsString()
    lang: string; // Obligatoria
}