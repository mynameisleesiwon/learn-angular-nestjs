// 사용자 인터페이스 정의 (백엔드 User 엔티티와 매칭)
export interface User {
  id: number;
  email: string;
  nickname: string;
}

// 회원가입 요청 데이터 인터페이스
export interface SignupRequest {
  email: string;
  nickname: string;
  password: string;
}

// 로그인 요청 데이터 인터페이스
export interface LoginRequest {
  email: string;
  password: string;
}

// 로그인 응답 데이터 인터페이스
export interface LoginResponse {
  token: string;
}

// JWT 토큰 페이로드 인터페이스
export interface TokenPayload {
  email: string;
  sub: number; // 사용자 ID
  iat: number; // 토큰 발급 시간
  exp: number; // 토큰 만료 시간
}
