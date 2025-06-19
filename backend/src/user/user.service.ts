import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

// User 서비스 : 회원가입/로그인 관련 비즈니스 로직을 담당합니다.
@Injectable()
export class UserService {
  // User 엔티티의 Repository를 주입받습니다.
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // 이메일로 사용자를 찾는 메서드
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  // 새로운 사용자를 생성하는 메서드
  async createUser(
    email: string,
    password: string,
    nickname: string,
  ): Promise<User> {
    // 비밀번호 암호화 (saltRounds = 10)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 새로운 사용자 생성
    const newUser = this.userRepository.create({
      email,
      password: hashedPassword, // 암호화된 비밀번호 저장
      nickname,
    });
    return this.userRepository.save(newUser);
  }

  // ID로 사용자를 찾는 메서드
  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({ where: { id } });
  }

  // 비밀번호 검증 메서드
  async validatePassword(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }

  // JWT 토큰 생성 메서드
  generateToken(user: User): string {
    // 토큰에 담을 정보 (payload)
    const payload = { email: user.email, sub: user.id };
    // - sign() 메서드: payload를 토큰으로 변환
    return this.jwtService.sign(payload);
  }
}
