import { HttpInterceptorFn } from '@angular/common/http';

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

  return next(req); // 요청 전송
};
