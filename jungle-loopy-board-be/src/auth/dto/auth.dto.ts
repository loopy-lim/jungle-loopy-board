export class AuthResponseDto {
  readonly email: string;
  readonly password: string;
}

export class SignUpResponseDto {
  readonly email: string;
  readonly password: string;
  readonly name: string;
}

export class UserMeRequestDto {
  readonly email: string;
  readonly name: string;
  constructor({ email, name }) {
    this.email = email;
    this.name = name;
  }
}
