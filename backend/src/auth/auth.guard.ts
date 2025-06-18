import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // HTTP 요청 객체 가져오기
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    // 토큰이 없으면 401 에러
    if (!token) {
      throw new UnauthorizedException('토큰이 없습니다.');
    }

    try {
      // 토큰 검증 및 페이로드 추출
      const payload = await this.jwtService.verifyAsync(token);
      // 요청 객체에 사용자 정보 추가
      request['user'] = payload;
    } catch {
      // 토큰 검증 실패 시 401 에러
      throw new UnauthorizedException('유효하지 않은 토큰입니다.');
    }

    return true;
  }

  // private 키워드 제거
  extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
