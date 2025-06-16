import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Todo 인터페이스 정의
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  // API 기본 URL
  private apiUrl = 'http://localhost:3000/todo';

  constructor(private http: HttpClient) {}

  // 모든 할 일 조회
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl);
  }

  // 새로운 할 일 생성
  createTodo(text: string): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, { text });
  }

  // 할 일 완료 상태 토글
  toggleTodo(id: number): Observable<Todo> {
    return this.http.patch<Todo>(`${this.apiUrl}/${id}/toggle`, {});
  }

  // 할 일 삭제
  deleteTodo(id: number): Observable<Todo> {
    return this.http.delete<Todo>(`${this.apiUrl}/${id}`);
  }
}
