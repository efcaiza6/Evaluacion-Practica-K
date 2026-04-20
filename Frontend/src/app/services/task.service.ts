import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { PageResponse, Task, TaskRequest } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly api = `${environment.apiUrl}/tasks`;

  constructor(private readonly http: HttpClient) {}

  findAll(categoryId?: number): Observable<PageResponse<Task>> {
    let params = new HttpParams().set('size', 20).set('sort', 'fecha,desc');
    if (categoryId) {
      params = params.set('categoryId', categoryId);
    }
    return this.http.get<PageResponse<Task>>(this.api, { params });
  }

  create(task: TaskRequest): Observable<Task> {
    return this.http.post<Task>(this.api, task);
  }

  update(id: number, task: TaskRequest): Observable<Task> {
    return this.http.put<Task>(`${this.api}/${id}`, task);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}

