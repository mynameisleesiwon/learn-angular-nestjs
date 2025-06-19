# 🚀 Angular + NestJS 학습 프로젝트

Angular 20과 NestJS를 활용한 학습 프로젝트입니다.

## 📋 프로젝트 개요

- **프론트엔드**: Angular 20 (Standalone Components, 함수형 인터셉터)
- **백엔드**: NestJS 11 (TypeORM, JWT 인증, PostgreSQL)
- **주요 기능**: 사용자 인증, 사용자별 Todo 관리, JWT 토큰 기반 보안

## 🛠 기술 스택

### Frontend (Angular 20)

- **Framework**: Angular 20
- **Architecture**: Standalone Components
- **State Management**: RxJS BehaviorSubject
- **HTTP**: Angular HttpClient + 함수형 인터셉터
- **Routing**: Angular Router with Guards
- **Styling**: SCSS

### Backend (NestJS 11)

- **Framework**: NestJS 11
- **Database**: PostgreSQL + TypeORM
- **Authentication**: JWT + bcrypt
- **Validation**: Class-validator
- **Configuration**: @nestjs/config

## 📚 학습 내용

### Angular 20 학습 포인트

- ✅ **Standalone Components**: 독립적인 컴포넌트 아키텍처
- ✅ **함수형 인터셉터**: HTTP 요청/응답 가로채기
- ✅ **라우트 가드**: 보호된 페이지 접근 제어
- ✅ **RxJS 활용**: 상태 관리 및 비동기 처리
- ✅ **양방향 데이터 바인딩**: FormsModule 활용

### NestJS 11 학습 포인트

- ✅ **모듈 기반 아키텍처**: 기능별 모듈 분리
- ✅ **데코레이터 패턴**: 컨트롤러, 서비스, 가드
- ✅ **TypeORM**: 데이터베이스 ORM 활용
- ✅ **JWT 인증**: 토큰 기반 인증 시스템
- ✅ **환경 변수 관리**: ConfigModule 활용

## 🔐 주요 기능

### 인증 시스템

- 회원가입/로그인
- JWT 토큰 발급 및 검증
- 보호된 라우트 접근 제어
- 자동 로그아웃 (토큰 만료 시)

### Todo 관리

- 사용자별 Todo
- CRUD 작업 (생성, 조회, 수정, 삭제)
- 완료 상태 토글
- 실시간 UI 업데이트
