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
  async findAll(): Promise<Todo[]> {
    return this.todoRepository.find();
  }

  // 특정 할 일 조회
  async findOne(id: number): Promise<Todo> {
    const todo = await this.todoRepository.findOne({ where: { id } });
    if (!todo) {
      throw new NotFoundException('할 일을 찾을 수 없습니다.');
    }
    return todo;
  }

  // 새로운 할 일 생성
  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = this.todoRepository.create(createTodoDto);
    return this.todoRepository.save(todo);
  }

  // 할 일 수정
  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    // 할 일이 존재하는지 확인
    const todo = await this.findOne(id);
    // 할 일 정보 업데이트
    Object.assign(todo, updateTodoDto);
    // 업데이트된 할 일 저장
    return this.todoRepository.save(todo);
  }

  // 할 일 삭제
  async remove(id: number): Promise<void> {
    const result = await this.todoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('할 일을 찾을 수 없습니다.');
    }
  }

  // 할 일 완료 상태 변경
  async toggleComplete(id: number): Promise<Todo> {
    const todo = await this.findOne(id);
    todo.completed = !todo.completed;
    return this.todoRepository.save(todo);
  }
}
