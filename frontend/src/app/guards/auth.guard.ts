import { inject } from '@angular/core';
import { AuthService } from '../services/auth';
import { Router } from '@angular/router';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // 로그인된 사용자는 접근 허용
  } else {
    // 만료된 토큰이 있다면 제거하고 로그인 페이지로 이동
    authService.logout();
    alert('세션이 만료되었습니다. 다시 로그인해주세요.');
    router.navigate(['/login']);
    return false;
  }
};
