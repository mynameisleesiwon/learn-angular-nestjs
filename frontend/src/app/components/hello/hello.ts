// Angular의 핵심 기능인 Component를 가져옵니다
import { Component } from '@angular/core';

// @Component 데코레이터: 이 클래스가 Angular 컴포넌트임을 선언합니다
@Component({
  // selector: HTML에서 이 컴포넌트를 사용할 때의 태그 이름
  // <app-hello></app-hello> 형태로 사용됩니다
  selector: 'app-hello',

  // templateUrl: 이 컴포넌트의 HTML 템플릿 파일 위치
  // hello.html 파일의 내용이 이 컴포넌트의 화면을 구성합니다
  templateUrl: './hello.html',

  // styleUrl: 이 컴포넌트의 스타일 파일 위치
  // hello.scss 파일의 스타일이 이 컴포넌트에만 적용됩니다
  styleUrl: './hello.scss',

  // standalone: true - 이 컴포넌트가 독립적으로 동작함을 선언
  // Angular 14 버전부터 도입된 새로운 기능입니다
  standalone: true,
})
export class HelloComponent {
  // 컴포넌트에서 사용할 변수를 선언합니다
  // 이 변수는 hello.html에서 {{ message }}로 사용됩니다
  message: string = 'Hello, Angular!';
}
