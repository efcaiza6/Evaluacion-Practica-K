# Gestión de tareas

Aplicación práctica full stack para gestionar tareas por categoría.

## Tecnologías

- Backend: Java 21, Spring Boot 4.0.5, Spring Data JPA, H2, Swagger/OpenAPI.
- Frontend: Angular 17, Reactive Forms, HttpClient e interceptor HTTP.

## Estructura

```text
Backend/ms-gestion-tareas   API REST Spring Boot
Frontend                    Aplicación Angular
```

> Nota: en el sistema de archivos la carpeta del backend puede aparecer con tilde en la palabra gestión.

## Ejecutar backend

El backend requiere Java 21 y Maven 3.6.3 o superior. Antes de ejecutar Maven, verifica que `JAVA_HOME` apunte a un JDK 21.

Se puede usar el JDK que viene con IntelliJ:

```powershell
$env:JAVA_HOME='C:\Program Files\JetBrains\IntelliJ IDEA 2025.1.3\jbr'
$env:Path="$env:JAVA_HOME\bin;$env:Path"
```

Luego ejecuta:

```powershell
cd Backend
cd .\ms-*tareas
mvn spring-boot:run
```

La API queda disponible en:

- `http://localhost:8080/api/tasks`
- `http://localhost:8080/api/categories`
- Swagger: `http://localhost:8080/swagger-ui.html`
- Consola H2: `http://localhost:8080/h2-console`

Datos H2:

- JDBC URL: `jdbc:h2:mem:tareasdb`
- Usuario: `sa`
- Contraseña: vacía

## Ejecutar frontend

```bash
cd Frontend
npm install
npm start
```

La aplicación queda disponible en `http://localhost:4200`.

## Funcionalidades

- CRUD de tareas.
- CRUD de categorías.
- Relación de una categoría a muchas tareas.
- Filtro de tareas por categoría.
- Paginación en el endpoint de tareas mediante parámetros `page`, `size` y `sort`.
- Validaciones con `@Valid`.
- Manejo global de errores con `@RestControllerAdvice`.
- Documentación Swagger/OpenAPI.
- Interceptor Angular que agrega `X-App-Client: angular-app`.
- Login básico local que guarda un token ficticio y lo envía como `Authorization`.
- Cambio de modo oscuro.

## Endpoints principales

Categorías:

- `GET /api/categories`
- `GET /api/categories/{id}`
- `POST /api/categories`
- `PUT /api/categories/{id}`
- `DELETE /api/categories/{id}`

Tareas:

- `GET /api/tasks?page=0&size=20`
- `GET /api/tasks?categoryId=1`
- `GET /api/tasks/category/{categoryId}`
- `GET /api/tasks/{id}`
- `POST /api/tasks`
- `PUT /api/tasks/{id}`
- `DELETE /api/tasks/{id}`

Ejemplo para crear tarea:

```json
{
  "titulo": "Preparar entrevista",
  "descripcion": "Repasar el flujo end-to-end",
  "completada": false,
  "fecha": "2026-04-17",
  "categoryId": 1
}
```

## Decisiones de diseño

- Se usa H2 en memoria para facilitar la revisión del ejercicio sin requerir una base de datos externa. Para un ambiente real se podría cambiar `application.properties` a MySQL o PostgreSQL manteniendo las mismas entidades JPA.
- El backend mantiene capas simples: controller, service, repository, model y dto.
- Las tareas se crean con un DTO para recibir `categoryId` sin acoplar el formulario al modelo JPA completo.
- Spring Boot 4 usa paquetes `jakarta.*`, por eso las entidades y validaciones están en `jakarta.persistence` y `jakarta.validation`.
- El login JWT es ficticio porque el enunciado lo marca como bonus; el token se agrega a las peticiones desde el interceptor.

## Verificación realizada

Backend:

```powershell
$env:JAVA_HOME='C:\Program Files\JetBrains\IntelliJ IDEA 2025.1.3\jbr'
$env:Path="$env:JAVA_HOME\bin;$env:Path"
cd Backend
cd .\ms-*tareas
mvn clean compile
mvn test
```

Frontend:

```bash
cd Frontend
npm run build
npm start
```
