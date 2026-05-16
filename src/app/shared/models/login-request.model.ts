export interface LoginRequest {
  identifier: string;
  otp?: string;
  password?: string;
}