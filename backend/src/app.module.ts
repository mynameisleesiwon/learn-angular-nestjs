import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HelloModule } from './hello/hello.module';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HelloModule,
    TodoModule,
    // TypeORM 설정
    TypeOrmModule.forRoot({
      // PostgreSQL 데이터베이스 설정
      type: 'postgres', // 데이터베이스 타입
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      // 엔티티 파일 위치 설정
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // 모든 .entity.ts/js 파일을 엔티티로 인식
      // 개발 환경에서만 true로 설정
      // true일 경우: 엔티티 변경사항을 자동으로 데이터베이스에 반영
      // false일 경우: 수동으로 마이그레이션을 실행해야 함
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
