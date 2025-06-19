import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  menuItems = [
    { label: '홈', path: '/' },
    { label: '소개', path: '/about' },
    { label: '할 일', path: '/todo' },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  // 초기화 순서 문제 해결을 위해 getter 사용
  get currentUser$() {
    return this.authService.currentUser$;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
