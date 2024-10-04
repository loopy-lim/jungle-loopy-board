export class AuthResponseDto {
  readonly email: string;
  readonly password: string;
}

export class SignUpResponseDto {
  readonly email: string;
  readonly password: string;
  readonly name: string;
}