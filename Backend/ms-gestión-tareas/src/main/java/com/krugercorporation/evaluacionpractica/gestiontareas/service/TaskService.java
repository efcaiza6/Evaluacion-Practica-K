package com.krugercorporation.evaluacionpractica.gestiontareas.service;

import com.krugercorporation.evaluacionpractica.gestiontareas.dto.TaskRequest;
import com.krugercorporation.evaluacionpractica.gestiontareas.exception.ResourceNotFoundException;
import com.krugercorporation.evaluacionpractica.gestiontareas.model.Category;
import com.krugercorporation.evaluacionpractica.gestiontareas.model.Task;
import com.krugercorporation.evaluacionpractica.gestiontareas.repository.CategoryRepository;
import com.krugercorporation.evaluacionpractica.gestiontareas.repository.TaskRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final CategoryRepository categoryRepository;

    public TaskService(TaskRepository taskRepository, CategoryRepository categoryRepository) {
        this.taskRepository = taskRepository;
        this.categoryRepository = categoryRepository;
    }

    public Page<Task> findAll(Long categoryId, Pageable pageable) {
        if (categoryId != null) {
            return taskRepository.findByCategoryId(categoryId, pageable);
        }
        return taskRepository.findAll(pageable);
    }

    public Task findById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tarea no encontrada"));
    }

    public Task create(TaskRequest request) {
        Task task = new Task();
        fillTask(task, request);
        return taskRepository.save(task);
    }

    public Task update(Long id, TaskRequest request) {
        Task task = findById(id);
        fillTask(task, request);
        return taskRepository.save(task);
    }

    public void delete(Long id) {
        Task task = findById(id);
        taskRepository.delete(task);
    }

    private void fillTask(Task task, TaskRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Categoria no encontrada"));

        task.setTitulo(request.getTitulo());
        task.setDescripcion(request.getDescripcion());
        task.setCompletada(request.isCompletada());
        task.setFecha(request.getFecha());
        task.setCategory(category);
    }
    
}
