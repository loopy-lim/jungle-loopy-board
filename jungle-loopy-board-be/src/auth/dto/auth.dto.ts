export class AuthResponseDto {
  readonly email: string;
  readonly password: string;
}

export class SignUpResponseDto {
  readonly email: string;
  readonly password: string;
  readonly name: string;
}

export class DeleteAccountResponseDto {
  readonly email: string;
  readonly password: string;
}

export class RefreshResponseDto {
  readonly email: string;
  readonly name: string;
}
