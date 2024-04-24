import { IsInt, IsOptional, IsString, MaxLength } from "class-validator";

export class OrthographyDto {
    @IsString({ message: 'El promp debe ser un texto' })
    readonly prompt: string;
    @IsInt({ message: 'El maxtokens debe ser un numero entero' })
    @IsOptional()
    readonly maxTokens?: number;
}