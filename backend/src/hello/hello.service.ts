import { Injectable } from '@nestjs/common';

// @Injectable 데코레이터: 이 클래스가 서비스임을 명시
// NestJS의 의존성 주입 시스템에서 사용됩니다
@Injectable()
export class HelloService {
  // "Hello from NestJS!" 메시지를 반환하는 메서드
  getHello(): string {
    return 'Hello from NestJS!';
  }
}
