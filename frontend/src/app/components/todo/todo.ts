import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // ngIf, ngFor 등의 기본 디렉티브 사용을 위해 필요
import { FormsModule } from '@angular/forms'; // 양방향 바인딩([(ngModel)])을 사용하기 위해 필요
import { TodoService } from '../../services/todo';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo.html',
  styleUrl: './todo.scss',
})
// OnInit 인터페이스 구현 (컴포넌트 초기화 시 실행될 코드 정의)
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  newTodoTitle: string = '';
  newTodoDescription: string = '';

  // 수정 모드 관련 변수들
  editingTodo: Todo | null = null;
  editTitle: string = '';
  editDescription: string = '';

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    // 컴포넌트 초기화 시 할 일 목록 로드
    this.loadTodos();
  }

  // 할 일 목록 로드
  loadTodos() {
    this.todoService.getTodos().subscribe({
      next: (todos) => (this.todos = todos),
      error: (error) =>
        console.error('할 일 목록을 불러오는데 실패했습니다:', error),
    });
  }

  // 새로운 할 일을 추가
  addTodo() {
    // 입력된 텍스트가 비어있지 않은 경우에만 추가
    if (this.newTodoTitle.trim()) {
      this.todoService
        .createTodo(this.newTodoTitle, this.newTodoDescription)
        .subscribe({
          next: (todo) => {
            this.todos.push(todo);
            this.newTodoTitle = '';
            this.newTodoDescription = '';
          },
          error: (error) => console.error('할 일 추가에 실패했습니다:', error),
        });
    }
  }

  // 할 일의 완료 상태를 토글
  toggleTodo(id: number) {
    this.todoService.toggleTodo(id).subscribe({
      next: (updatedTodo) => {
        // 해당 id를 가진 할 일을 찾아서 상태 업데이트
        const index = this.todos.findIndex((todo) => todo.id === id);
        if (index !== -1) {
          this.todos[index] = updatedTodo;
        }
      },
      error: (error) => console.error('할 일 상태 변경에 실패했습니다:', error),
    });
  }

  // 할 일을 삭제
  deleteTodo(id: number) {
    this.todoService.deleteTodo(id).subscribe({
      next: () => {
        // 해당 id를 가진 할 일을 목록에서 제거
        this.todos = this.todos.filter((todo) => todo.id !== id);
      },
      error: (error) => console.error('할 일 삭제에 실패했습니다:', error),
    });
  }

  // 수정 모드 시작
  startEdit(todo: Todo) {
    this.editingTodo = todo;
    this.editTitle = todo.title;
    this.editDescription = todo.description;
  }

  // 수정 취소
  cancelEdit() {
    this.editingTodo = null;
    this.editTitle = '';
    this.editDescription = '';
  }

  // 수정 저장
  saveEdit() {
    if (this.editingTodo && this.editTitle.trim()) {
      this.todoService
        .updateTodo(this.editingTodo.id, this.editTitle, this.editDescription)
        .subscribe((updatedTodo) => {
          const index = this.todos.findIndex((t) => t.id === updatedTodo.id);
          if (index !== -1) {
            this.todos[index] = updatedTodo;
          }
          this.cancelEdit();
        });
    }
  }
}
