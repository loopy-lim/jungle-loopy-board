import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateCommentResponseDto {
  @IsNumber()
  @IsNotEmpty()
  readonly post_pk: number;

  @IsNotEmpty()
  readonly content: string;

  @IsNumber()
  readonly parent_comment_pk?: number;
}
export class UpdateCommentResponseDto {
  @IsNotEmpty()
  readonly content: string;

  @IsNotEmpty()
  @IsNumber()
  readonly comment_pk: number;
}