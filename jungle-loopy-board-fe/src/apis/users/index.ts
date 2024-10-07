import { https } from "@/lib/https";
import {
  DeleteUserResponseDto,
  LoginRequestUserDto,
  LoginResponseUserDto,
  LogoutResponseUserDto,
  SignupRequestUserDto,
  SignupResponseUserDto,
  UpdateUserRequestDto,
  UpdateUserResponseDto,
  UserInfoResponseDto
} from "./dtos";

export const postLogin = async (data: LoginRequestUserDto) => {
  const response = await https.post('/auth/signin', data);
  return new LoginResponseUserDto(response);
}

export const postSignup = async (data: SignupRequestUserDto) => {
  const response = await https.post('/auth/signup', data);
  return new SignupResponseUserDto(response);
}

export const postLogout = async () => {
  const response = await https.post('/auth/logout', {});
  return new LogoutResponseUserDto(response);
}

export const getUserInfo = async () => {
  const response = await https.get('/users');
  return new UserInfoResponseDto(response);
}

export const deleteUser = async () => {
  const response = await https.delete('/auth');
  return new DeleteUserResponseDto(response);
}

export const updateUser = async (data: UpdateUserRequestDto) => {
  const resonse = await https.put('/auth', data);
  return new UpdateUserResponseDto(resonse);
}

export const postRefreshToken = async () => {
  const response = await https.post('/auth/refresh', {});
  return new LoginResponseUserDto(response);
}