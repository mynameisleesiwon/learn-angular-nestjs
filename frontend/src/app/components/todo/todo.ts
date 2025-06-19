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

  // 로딩 상태 관리
  loading: boolean = false;
  // 에러 메시지 관리
  errorMessage: string = '';

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
    this.loading = true;
    this.errorMessage = '';

    this.todoService.getTodos().subscribe({
      next: (todos) => {
        this.todos = todos;
        this.loading = false;
      },
      error: (error) => {
        console.error('할 일 목록을 불러오는데 실패했습니다:', error);
        this.errorMessage = error.message || '할 일 목록을 불러올 수 없습니다.';
        this.loading = false;
      },
    });
  }

  // 새로운 할 일을 추가
  addTodo() {
    if (this.newTodoTitle.trim()) {
      this.loading = true;
      this.errorMessage = '';

      this.todoService
        .createTodo(this.newTodoTitle, this.newTodoDescription)
        .subscribe({
          next: (todo) => {
            this.todos.push(todo);
            this.newTodoTitle = '';
            this.newTodoDescription = '';
            this.loading = false;
          },
          error: (error) => {
            console.error('할 일 추가에 실패했습니다:', error);
            this.errorMessage = error.message || '할 일을 추가할 수 없습니다.';
            this.loading = false;
          },
        });
    }
  }

  // 할 일의 완료 상태를 토글
  toggleTodo(id: number) {
    this.todoService.toggleTodo(id).subscribe({
      next: (updatedTodo) => {
        const index = this.todos.findIndex((todo) => todo.id === id);
        if (index !== -1) {
          this.todos[index] = updatedTodo;
        }
      },
      error: (error) => {
        console.error('할 일 상태 변경에 실패했습니다:', error);
        this.errorMessage = error.message || '할 일 상태를 변경할 수 없습니다.';
      },
    });
  }

  // 할 일을 삭제
  deleteTodo(id: number) {
    if (confirm('정말로 이 할 일을 삭제하시겠습니까?')) {
      this.todoService.deleteTodo(id).subscribe({
        next: () => {
          // 해당 id를 가진 할 일을 목록에서 제거
          this.todos = this.todos.filter((todo) => todo.id !== id);
        },
        error: (error) => {
          console.error('할 일 삭제에 실패했습니다:', error);
          this.errorMessage = error.message || '할 일을 삭제할 수 없습니다.';
        },
      });
    }
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
      this.loading = true;
      this.errorMessage = '';

      this.todoService
        .updateTodo(this.editingTodo.id, this.editTitle, this.editDescription)
        .subscribe({
          next: (updatedTodo) => {
            const index = this.todos.findIndex((t) => t.id === updatedTodo.id);
            if (index !== -1) {
              this.todos[index] = updatedTodo;
            }
            this.cancelEdit();
            this.loading = false;
          },
          error: (error) => {
            console.error('할 일 수정에 실패했습니다:', error);
            this.errorMessage = error.message || '할 일을 수정할 수 없습니다.';
            this.loading = false;
          },
        });
    }
  }

  // 에러 메시지 초기화
  clearError() {
    this.errorMessage = '';
  }
}
