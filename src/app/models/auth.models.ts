export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
}

export interface UserDecoded {
  sub: string;
  role: 'ADMIN' | 'USER'; 
  exp: number;
}