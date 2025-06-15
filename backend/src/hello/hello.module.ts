import { Module } from '@nestjs/common';
import { HelloService } from './hello.service';
import { HelloController } from './hello.controller';

// @Module 데코레이터: 이 클래스가 모듈임을 명시
@Module({
  // 이 모듈에서 사용할 컨트롤러들을 등록
  controllers: [HelloController],
  // 이 모듈에서 사용할 서비스들을 등록
  providers: [HelloService],
})
export class HelloModule {}
