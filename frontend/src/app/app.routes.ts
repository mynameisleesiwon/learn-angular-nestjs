// Angular의 라우팅 기능을 사용하기 위한 import
import { Routes } from '@angular/router';
// Home 컴포넌트 import
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { Features } from './components/features/features';
import { TodoComponent } from './components/todo/todo';

// 라우팅 설정 정의
export const routes: Routes = [
  // 루트 경로('/')로 접속하면 Home 컴포넌트를 보여줌
  { path: '', component: Home },
  { path: 'about', component: About },
  { path: 'features', component: Features },
  { path: 'todo', component: TodoComponent },
  { path: '**', redirectTo: '' }, // 잘못된 경로로 접속시 홈으로 리다이렉트
];
