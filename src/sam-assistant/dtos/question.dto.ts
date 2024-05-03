import { IsString } from "class-validator";


export class QuestionDto {
  @IsString()
  readonly threadID: string;

  @IsString()
  readonly question: string;
}