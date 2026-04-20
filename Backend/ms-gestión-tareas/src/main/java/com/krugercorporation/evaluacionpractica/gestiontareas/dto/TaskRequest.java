package com.krugercorporation.evaluacionpractica.gestiontareas.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TaskRequest {

    @NotBlank(message = "El titulo es obligatorio")
    private String titulo;

    private String descripcion;

    private boolean completada;

    @NotNull(message = "La fecha es obligatoria")
    private LocalDate fecha;

    @NotNull(message = "La categoria es obligatoria")
    private Long categoryId;
}
