package com.krugercorporation.evaluacionpractica.gestiontareas.service;

import com.krugercorporation.evaluacionpractica.gestiontareas.exception.ResourceNotFoundException;
import com.krugercorporation.evaluacionpractica.gestiontareas.model.Category;
import com.krugercorporation.evaluacionpractica.gestiontareas.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    public Category findById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria no encontrada"));
    }

    public Category create(Category category) {
        return categoryRepository.save(category);
    }

    public Category update(Long id, Category data) {
        Category category = findById(id);
        category.setNombre(data.getNombre());
        return categoryRepository.save(category);
    }

    public void delete(Long id) {
        Category category = findById(id);
        categoryRepository.delete(category);
    }
    
}
