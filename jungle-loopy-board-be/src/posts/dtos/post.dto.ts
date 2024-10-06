import { IsNotEmpty } from "class-validator";

export class PostCreateRequestDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;
}