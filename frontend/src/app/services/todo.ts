import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Todo } from '../models/todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  // API 기본 URL
  private apiUrl = 'http://localhost:3000/todo';

  constructor(private http: HttpClient) {}

  // 모든 할 일 조회
  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('할 일 목록 조회 실패:', error);
        return throwError(() => new Error('할 일 목록을 불러올 수 없습니다.'));
      })
    );
  }

  // 새로운 할 일 생성
  createTodo(title: string, description: string): Observable<Todo> {
    return this.http.post<Todo>(this.apiUrl, { title, description }).pipe(
      catchError((error) => {
        console.error('할 일 생성 실패:', error);
        return throwError(() => new Error('할 일을 생성할 수 없습니다.'));
      })
    );
  }

  // 할 일 수정
  updateTodo(id: number, title: string, description: string): Observable<Todo> {
    return this.http
      .patch<Todo>(`${this.apiUrl}/${id}`, {
        title,
        description,
      })
      .pipe(
        catchError((error) => {
          console.error('할 일 수정 실패:', error);
          return throwError(() => new Error('할 일을 수정할 수 없습니다.'));
        })
      );
  }

  // 할 일 완료 상태 토글
  toggleTodo(id: number): Observable<Todo> {
    return this.http.patch<Todo>(`${this.apiUrl}/${id}/toggle`, {}).pipe(
      catchError((error) => {
        console.error('할 일 상태 변경 실패:', error);
        return throwError(() => new Error('할 일 상태를 변경할 수 없습니다.'));
      })
    );
  }

  // 할 일 삭제
  deleteTodo(id: number): Observable<Todo> {
    return this.http.delete<Todo>(`${this.apiUrl}/${id}`).pipe(
      catchError((error) => {
        console.error('할 일 삭제 실패:', error);
        return throwError(() => new Error('할 일을 삭제할 수 없습니다.'));
      })
    );
  }
}
