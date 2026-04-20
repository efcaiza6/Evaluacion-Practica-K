import { Category } from './category.model';

export interface Task {
  id: number;
  titulo: string;
  descripcion: string;
  completada: boolean;
  fecha: string;
  category: Category;
}

export interface TaskRequest {
  titulo: string;
  descripcion: string;
  completada: boolean;
  fecha: string;
  categoryId: number;
}

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number;
}