import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';

@Injectable()
export class TodoService {
  // 임시로 메모리에 todos 배열을 저장
  private todos: { id: number; text: string; completed: boolean }[] = [];

  // 모든 할 일 조회
  findAll() {
    return this.todos;
  }

  // 새로운 할 일 생성
  create(createTodoDto: CreateTodoDto) {
    const todo = {
      id: Date.now(),
      text: createTodoDto.text,
      completed: false,
    };
    this.todos.push(todo);
    return todo;
  }

  // 할 일 완료 상태 토글
  toggle(id: number) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      return todo;
    }
    return null;
  }

  // 할 일 삭제
  remove(id: number) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      const todo = this.todos[index];
      this.todos.splice(index, 1);
      return todo;
    }
    return null;
  }
}
