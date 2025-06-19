// Angular의 라우팅 기능을 사용하기 위한 import
import { Routes } from '@angular/router';
// Home 컴포넌트 import
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { TodoComponent } from './components/todo/todo';
import { LoginComponent } from './components/auth/login/login';
import { SignupComponent } from './components/auth/signup/signup';
import { authGuard } from './guards/auth.guard';

// 라우팅 설정 정의
export const routes: Routes = [
  // 루트 경로('/')로 접속하면 Home 컴포넌트를 보여줌
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'todo', component: TodoComponent, canActivate: [authGuard] }, // 보호된 라우트
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '**', redirectTo: '' }, // 잘못된 경로로 접속시 홈으로 리다이렉트
];
