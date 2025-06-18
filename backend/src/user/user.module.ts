import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

// User 모듈 : 회원가입/로그인 관련 기능을 모아둔 모듈
@Module({
  // TypeORM에 User 엔티티를 등록합니다.
  // JWT 모듈을 설정합니다.
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'), // 환경 변수에서 secret 가져오기
        signOptions: { expiresIn: '1h' }, // 토큰 만료 시간: 1시간
      }),
      inject: [ConfigService],
    }),
  ],
  // UserService를 다른 컴포넌트에서 주입받을 수 있도록 등록합니다.
  providers: [UserService],
  // UserController를 통해 API 엔드포인트를 제공합니다.
  controllers: [UserController],
  // UserService를 다른 모듈에서도 사용할 수 있도록 내보냅니다.
  exports: [UserService],
})
export class UserModule {}
