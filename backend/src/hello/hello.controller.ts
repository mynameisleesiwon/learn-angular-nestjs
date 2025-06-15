import { Controller, Get } from '@nestjs/common';
import { HelloService } from './hello.service';

// @Controller 데코레이터: 이 클래스가 컨트롤러임을 명시
// 'hello'는 이 컨트롤러의 기본 경로가 됩니다 (예: /hello)
@Controller('hello')
export class HelloController {
  // 생성자를 통해 HelloService를 주입받습니다 (의존성 주입)
  constructor(private readonly helloService: HelloService) {}

  // @Get 데코레이터: GET 요청을 처리하는 엔드포인트
  // /hello로 GET 요청이 오면 이 메서드가 실행됩니다
  @Get()
  getHello(): string {
    return this.helloService.getHello();
  }
}
