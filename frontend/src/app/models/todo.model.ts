// Todo 인터페이스 정의
export interface Todo {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  userId: number;
  user?: {
    id: number;
    email: string;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
