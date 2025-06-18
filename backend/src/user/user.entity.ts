import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// User 엔티티 : 데이터베이스의 users 테이블과 매핑됩니다.
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  nickname: string;
}
