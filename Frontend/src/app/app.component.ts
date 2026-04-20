import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from './models/category.model';
import { Task, TaskRequest } from './models/task.model';
import { CategoryService } from './services/category.service';
import { TaskService } from './services/task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  categories: Category[] = [];
  tasks: Task[] = [];
  selectedCategoryId = 0;
  editingTaskId?: number;
  editingCategoryId?: number;
  message = '';
  error = '';
  darkMode = false;

  readonly taskForm = this.fb.nonNullable.group({
    titulo: ['', [Validators.required, Validators.minLength(3)]],
    descripcion: [''],
    completada: [false],
    fecha: [new Date().toISOString().slice(0, 10), Validators.required],
    categoryId: [0, [Validators.required, Validators.min(1)]]
  });

  readonly categoryForm = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]]
  });

  readonly loginForm = this.fb.nonNullable.group({
    usuario: ['candidato', Validators.required],
    password: ['123456', Validators.required]
  });

  private readonly errorListener = (event: Event) => {
    this.error = (event as CustomEvent<string>).detail;
  };

  constructor(
    private readonly fb: FormBuilder,
    private readonly taskService: TaskService,
    private readonly categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.darkMode = localStorage.getItem('darkMode') === 'true';
    window.addEventListener('api-error', this.errorListener);
    this.loadCategories();
    this.loadTasks();
  }

  ngOnDestroy(): void {
    window.removeEventListener('api-error', this.errorListener);
  }

  get hasToken(): boolean {
    return Boolean(localStorage.getItem('token'));
  }

  login(): void {
    if (this.loginForm.invalid) {
      this.error = 'Ingresa usuario y contrasena';
      return;
    }
    localStorage.setItem('token', `demo-token-${this.loginForm.value.usuario}`);
    this.showMessage('Sesion iniciada');
  }

  logout(): void {
    localStorage.removeItem('token');
    this.showMessage('Sesion cerrada');
  }

  toggleDarkMode(): void {
    this.darkMode = !this.darkMode;
    localStorage.setItem('darkMode', String(this.darkMode));
  }

  loadCategories(): void {
    this.categoryService.findAll().subscribe(categories => {
      this.categories = categories;
      if (!this.taskForm.value.categoryId && categories.length) {
        this.taskForm.patchValue({ categoryId: categories[0].id });
      }
    });
  }

  loadTasks(): void {
    const categoryId = this.selectedCategoryId || undefined;
    this.taskService.findAll(categoryId).subscribe(page => {
      this.tasks = page.content;
    });
  }

  saveTask(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      this.error = 'Completa los campos obligatorios de la tarea';
      return;
    }

    const request = this.taskForm.getRawValue() as TaskRequest;
    const action = this.editingTaskId
      ? this.taskService.update(this.editingTaskId, request)
      : this.taskService.create(request);

    action.subscribe(() => {
      this.cancelTaskEdit();
      this.loadTasks();
      this.showMessage('Tarea guardada');
    });
  }

  editTask(task: Task): void {
    this.editingTaskId = task.id;
    this.taskForm.setValue({
      titulo: task.titulo,
      descripcion: task.descripcion || '',
      completada: task.completada,
      fecha: task.fecha,
      categoryId: task.category.id
    });
  }

  deleteTask(id: number): void {
    if (!confirm('Eliminar esta tarea?')) {
      return;
    }
    this.taskService.delete(id).subscribe(() => {
      this.loadTasks();
      this.showMessage('Tarea eliminada');
    });
  }

  cancelTaskEdit(): void {
    this.editingTaskId = undefined;
    this.taskForm.reset({
      titulo: '',
      descripcion: '',
      completada: false,
      fecha: new Date().toISOString().slice(0, 10),
      categoryId: this.categories[0]?.id || 0
    });
  }

  saveCategory(): void {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      this.error = 'Ingresa el nombre de la categoria';
      return;
    }

    const nombre = this.categoryForm.getRawValue().nombre;
    const action = this.editingCategoryId
      ? this.categoryService.update(this.editingCategoryId, nombre)
      : this.categoryService.create(nombre);

    action.subscribe(() => {
      this.cancelCategoryEdit();
      this.loadCategories();
      this.showMessage('Categoria guardada');
    });
  }

  editCategory(category: Category): void {
    this.editingCategoryId = category.id;
    this.categoryForm.setValue({ nombre: category.nombre });
  }

  deleteCategory(id: number): void {
    if (!confirm('Eliminar esta categoria y sus tareas?')) {
      return;
    }
    this.categoryService.delete(id).subscribe(() => {
      this.selectedCategoryId = 0;
      this.loadCategories();
      this.loadTasks();
      this.showMessage('Categoria eliminada');
    });
  }

  cancelCategoryEdit(): void {
    this.editingCategoryId = undefined;
    this.categoryForm.reset({ nombre: '' });
  }

  private showMessage(message: string): void {
    this.error = '';
    this.message = message;
    setTimeout(() => (this.message = ''), 2500);
  }
}

