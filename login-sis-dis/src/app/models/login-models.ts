export interface LoginResponse {
  success: boolean;
  data: {
    accessToken: string;
    refreshToken: string;
    role: string;
  }
}

export interface decodeLoginResponse {
  email: string;
  exp: number;
  iat: number;
  role: string;
  username: string;
}
