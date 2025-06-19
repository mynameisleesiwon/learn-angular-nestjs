import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('todo')
@UseGuards(AuthGuard) // 모든 Todo API에 인증 필요
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  // 모든 할 일 조회
  @Get()
  findAll(@Request() req) {
    const userId = req.user.sub;
    return this.todoService.findAllByUser(userId);
  }

  // 새로운 할 일 생성
  @Post()
  create(@Body() createTodoDto: CreateTodoDto, @Request() req) {
    const userId = req.user.sub;
    return this.todoService.create(createTodoDto, userId);
  }

  // 특정 할 일 조회
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    const userId = req.user.sub;
    return this.todoService.findOneByUser(+id, userId);
  }

  // 할 일 수정
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Request() req,
  ) {
    const userId = req.user.sub;
    return this.todoService.updateByUser(+id, updateTodoDto, userId);
  }

  // 할 일 삭제
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.sub;
    return this.todoService.removeByUser(+id, userId);
  }

  // 할 일 완료 상태 토글
  @Patch(':id/toggle')
  toggleComplete(@Param('id') id: string, @Request() req) {
    const userId = req.user.sub;
    return this.todoService.toggleCompleteByUser(+id, userId);
  }
}
