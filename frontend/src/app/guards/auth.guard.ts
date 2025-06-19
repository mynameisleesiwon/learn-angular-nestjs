import { inject } from '@angular/core';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // 로그인된 사용자는 접근 허용
  } else {
    // 로그인되지 않은 사용자는 로그인 페이지로 리다이렉트
    router.navigate(['/login']);
    return false;
  }
};
