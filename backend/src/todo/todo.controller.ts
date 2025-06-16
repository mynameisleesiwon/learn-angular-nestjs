import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // 모든 할 일 조회
  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  // 새로운 할 일 생성
  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  // 할 일 완료 상태 토글
  @Patch(':id/toggle')
  toggle(@Param('id') id: string) {
    return this.todoService.toggle(Number(id));
  }

  // 할 일 삭제
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(Number(id));
  }
}
