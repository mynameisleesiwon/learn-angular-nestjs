import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { Repository } from 'typeorm';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  // 모든 할 일 조회
  async findAllByUser(userId: number): Promise<Todo[]> {
    return this.todoRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  // 새로운 할 일 생성
  async create(createTodoDto: CreateTodoDto, userId: number): Promise<Todo> {
    const todo = this.todoRepository.create({
      ...createTodoDto, // 🔑 title, description
      userId, // 🔑 사용자 ID 추가
    });
    return this.todoRepository.save(todo);
  }

  // 할 일 조회
  async findOneByUser(id: number, userId: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne({
      where: { id, userId },
    });

    if (!todo) {
      throw new NotFoundException('할 일을 찾을 수 없습니다.');
    }

    return todo;
  }

  // 할 일 수정
  async updateByUser(
    id: number,
    updateTodoDto: UpdateTodoDto,
    userId: number,
  ): Promise<Todo> {
    const todo = await this.findOneByUser(id, userId);

    Object.assign(todo, updateTodoDto);
    return this.todoRepository.save(todo);
  }

  // 할 일 삭제
  async removeByUser(id: number, userId: number): Promise<void> {
    const todo = await this.findOneByUser(id, userId);
    await this.todoRepository.remove(todo);
  }

  // 할 일 완료 상태 변경
  async toggleCompleteByUser(id: number, userId: number): Promise<Todo> {
    const todo = await this.findOneByUser(id, userId);
    todo.completed = !todo.completed;
    return this.todoRepository.save(todo);
  }
}
