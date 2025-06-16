import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// 페이지 이동 라우팅을 위한 RouterLink, RouterLinkActive import
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  // 네비게이션 메뉴 아이템들
  menuItems = [
    { label: '홈', path: '/' },
    { label: '소개', path: '/about' },
    { label: '기능', path: '/features' },
  ];
}
