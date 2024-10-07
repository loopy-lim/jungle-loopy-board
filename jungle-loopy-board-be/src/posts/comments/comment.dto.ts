import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateCommentResponseDto {
  @IsNumber()
  @Type(() => Number)
  @IsNotEmpty()
  readonly post_id: number;

  @IsNotEmpty()
  readonly content: string;

  @IsNumber()
  @IsOptional()
  readonly parent_comment_id?: number;
}
export class UpdateCommentResponseDto {
  @IsNotEmpty()
  readonly content: string;
}