import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Category } from '../models/category.model';

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private readonly api = `${environment.apiUrl}/categories`;

  constructor(private readonly http: HttpClient) {}

  findAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.api);
  }

  create(nombre: string): Observable<Category> {
    return this.http.post<Category>(this.api, { nombre });
  }

  update(id: number, nombre: string): Observable<Category> {
    return this.http.put<Category>(`${this.api}/${id}`, { id, nombre });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}