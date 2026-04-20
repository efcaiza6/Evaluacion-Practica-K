package com.krugercorporation.evaluacionpractica.gestiontareas.repository;

import com.krugercorporation.evaluacionpractica.gestiontareas.model.Task;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {

    Page<Task> findByCategoryId(Long categoryId, Pageable pageable);
}
