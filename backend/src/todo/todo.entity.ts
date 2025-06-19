import { User } from 'src/user/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Todo {
  // 자동 증가하는 기본 키
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: false })
  completed: boolean;

  @Column()
  userId: number; // 외래키 : 어떤 사용자의 할 일인지 저장

  // TypeORM 관계 설정: Todo는 User에 속한다 (다대일 관계)
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' }) // userId 컬럼과 연결
  user: User; // User 객체 참조 (실제 사용할 때는 userId만 사용)

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
