import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from 'src/auth/auth.guard';

// User 컨트롤러: 회원가입/로그인 API 엔드포인트를 제공합니다.
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 회원가입 API 엔드포인트
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<User> {
    // 이미 가입된 이메일인지 확인
    const existingUser = await this.userService.findByEmail(
      createUserDto.email,
    );
    if (existingUser) {
      throw new Error('이미 가입된 이메일입니다.');
    }

    // 새로운 사용자 생성
    return this.userService.createUser(
      createUserDto.email,
      createUserDto.password,
      createUserDto.nickname,
    );
  }

  // 로그인 API 엔드포인트
  @Post('login')
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    // 이메일로 사용자 찾기
    const user = await this.userService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 일치하지 않습니다.',
      );
    }

    // 비밀번호 검증
    const isPasswordValid = await this.userService.validatePassword(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException(
        '이메일 또는 비밀번호가 일치하지 않습니다.',
      );
    }

    // JWT 토큰 생성
    const token = this.userService.generateToken(user);
    return { token };
  }

  // 인증이 필요한 API 예시
  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    // JWT 토큰의 페이로드에서 사용자 ID 추출
    const userId = req.user.sub;

    // 실제 사용자 정보를 데이터베이스에서 조회
    const user = await this.userService.findById(userId);

    if (!user) {
      throw new UnauthorizedException('사용자를 찾을 수 없습니다.');
    }

    // 비밀번호는 제외하고 반환
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}
