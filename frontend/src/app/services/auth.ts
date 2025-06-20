import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  TokenPayload,
  User,
} from '../models/auth.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // API 기본 URL
  private apiUrl = 'http://localhost:3000/users';

  // 현재 로그인된 사용자 정보를 저장하는 BehaviorSubject
  private currentUserSubject = new BehaviorSubject<User | null>(null);

  // 외부에서 구독할 수 있는 Observable
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    // 서비스 초기화 시 저장된 토큰이 있다면 사용자 정보 복원
    this.loadStoredUser();
  }

  // 회원가입 API 호출
  signup(signupData: SignupRequest): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/signup`, signupData);
  }

  // 로그인 API 호출
  login(loginData: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/login`, loginData)
      .pipe(
        tap((response) => {
          // 로그인 성공 시 토큰 자동 저장
          this.setToken(response.token);
          // 사용자 정보 자동 로드
          this.loadUserProfile();
        })
      );
  }

  // 사용자 프로필 정보 로드
  loadUserProfile(): void {
    this.http.get<User>(`${this.apiUrl}/profile`).subscribe({
      next: (user) => {
        // 사용자 정보를 BehaviorSubject에 저장
        this.currentUserSubject.next(user);
      },
      error: (error) => {
        console.error('프로필 로드 실패:', error);
        // 프로필 로드 실패 시 로그아웃 처리
        this.logout();
      },
    });
  }

  // 현재 사용자 정보 가져오기
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  // JWT 토큰 가져오기
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // JWT 토큰 저장
  private setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  // 로그아웃
  logout(): void {
    localStorage.removeItem('auth_token');
    // 사용자 정보 초기화
    this.currentUserSubject.next(null);
  }

  // 로그인 상태 확인
  isLoggedIn(): boolean {
    const token = this.getToken();
    if (!token) return false;

    // 토큰 만료 확인
    if (this.isTokenExpired()) {
      this.logout(); // 만료된 토큰 자동 제거
      return false;
    }

    return true;
  }

  // JWT 토큰에서 페이로드 추출
  getTokenPayload(): TokenPayload | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      // JWT 토큰은 3부분으로 구성: header(알고리즘 정보).payload(사용자 데이터).signature(서명)
      const payload = token.split('.')[1];
      // Base64 디코딩 후 JSON 파싱
      return JSON.parse(atob(payload));
    } catch (error) {
      console.error('토큰 파싱 실패:', error);
      return null;
    }
  }

  // 토큰 만료 확인
  isTokenExpired(): boolean {
    const payload = this.getTokenPayload();
    if (!payload) return true;

    // 현재 시간과 만료 시간 비교
    const currentTime = Date.now() / 1000;
    return payload.exp < currentTime;
  }

  // 저장된 사용자 정보 복원
  private loadStoredUser(): void {
    const token = this.getToken();
    if (token && !this.isTokenExpired()) {
      this.loadUserProfile();
    } else if (token) {
      // 만료된 토큰이 있다면 제거
      this.logout();
    }
  }
}
