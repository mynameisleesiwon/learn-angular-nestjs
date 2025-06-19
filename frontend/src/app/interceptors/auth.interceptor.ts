import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 토큰 가져오기
  const token = localStorage.getItem('auth_token');

  // 토큰이 있으면 헤더에 추가
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  // 요청 전송
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // 401 에러 (인증 실패) 처리
      if (error.status === 401) {
        localStorage.removeItem('auth_token');
        window.location.reload();
      }
      return throwError(() => error);
    })
  );
};
