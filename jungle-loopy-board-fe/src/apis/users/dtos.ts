export class LoginRequestUserDto {
  email: string;
  password: string;
  constructor({ email, password }: LoginRequestUserDto) {
    this.email = email;
    this.password = password;
  }
}

export class LoginResponseUserDto {
  message: string;
  constructor({ message }: LoginResponseUserDto) {
    this.message = message;
  }
}

export class SignupRequestUserDto {
  email: string;
  password: string;
  name: string;
  constructor({ email, password, name }: SignupRequestUserDto) {
    this.email = email;
    this.password = password;
    this.name = name;
  }
}

export class SignupResponseUserDto {
  message: string;
  constructor({ message }: SignupResponseUserDto) {
    this.message = message;
  }
}

export class UpdateUserRequestDto {
  email: string;
  password: string;
  name: string;
  constructor({ email, password, name }: UpdateUserRequestDto) {
    this.email = email;
    this.password = password;
    this.name = name;
  }
}

export class UpdateUserResponseDto {
  message: string;
  constructor({ message }: UpdateUserResponseDto) {
    this.message = message;
  }
}

export class LogoutResponseUserDto {
  message: string;
  constructor({ message }: LogoutResponseUserDto) {
    this.message = message;
  }
}

export class UserInfoResponseDto {
  email: string;
  name: string;
  constructor({ email, name }: UserInfoResponseDto) {
    this.email = email;
    this.name = name;
  }
}

export class DeleteUserResponseDto {
  message: string;
  constructor({ message }: DeleteUserResponseDto) {
    this.message = message;
  }
}
