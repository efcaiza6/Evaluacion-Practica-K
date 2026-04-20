INSERT INTO category (nombre) VALUES ('Trabajo');
INSERT INTO category (nombre) VALUES ('Personal');
INSERT INTO category (nombre) VALUES ('Estudio');

INSERT INTO task (titulo, descripcion, completada, fecha, category_id)
VALUES ('Preparar entrevista', 'Repasar puntos principales del ejercicio', false, '2026-04-17', 1);

INSERT INTO task (titulo, descripcion, completada, fecha, category_id)
VALUES ('Comprar cuaderno', 'Pendiente para la semana', true, '2026-04-18', 2);
