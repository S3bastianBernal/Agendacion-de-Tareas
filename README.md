# Gestor de Tareas

Este proyecto es un **Gestor de Tareas** que permite a los usuarios crear, leer, actualizar, eliminar, importar y exportar tareas. El backend fue desarrollado con **FastAPI**, mientras que el frontend se desarrolló con HTML, CSS y JavaScript puro (Vanilla JS).

---

## Características Principales

### Backend:
- **Framework**: FastAPI
- **Endpoints**:
  - `GET /getTasks`: Obtiene todas las tareas.
  - `POST /createTask`: Crea una nueva tarea.
  - `DELETE /deleteTask/{id}`: Elimina una tarea por su ID.
  - `PUT /updateTask/{id}`: Actualiza una tarea por su ID.
- Manejo de errores y validaciones básicas.
- Configuración de CORS para permitir el acceso desde el frontend.

### Frontend:
- **HTML/CSS**:
  - Interfaz sencilla y funcional.
  - Estilo visual agradable con retroalimentación en colores:
    - Tarea pendiente: Rojo.
    - Tarea en progreso: Amarillo.
    - Tarea completada: Verde.
  - Formularios separados para nombre y descripción de las tareas.
- **JavaScript**:
  - Consumo de API usando `fetch`.
  - Renderizado dinámico de tareas.
  - Funcionalidades de:
    - Creación.
    - Eliminación (con confirmación).
    - Actualización.
    - Importación desde archivo JSON.
    - Exportación de tareas existentes a archivo JSON.

---

## Requisitos

- **Python 3.10+**
- **Node.js** (opcional, para extensiones futuras)

---

## Instalación

### Clonar el repositorio
```bash
$ git clone <URL_DEL_REPOSITORIO>
```

### Backend: FastAPI
1. Crear y activar un entorno virtual:
   ```bash
   $ python -m venv venv
   $ source venv/Scripts/activate  # En Windows
   $ source venv/bin/activate      # En Unix/Mac
   ```

2. Instalar dependencias:
   ```bash
   (venv) $ pip install -r requirements.txt
   ```

3. Ejecutar el servidor:
   ```bash
   (venv) $ uvicorn main:app --reload
   ```

   El backend estará disponible en `http://localhost:8000`

### Frontend
1. Abrir el archivo `index.html` en un navegador o utilizar una extensión de servidor local como **Live Server** en VS Code.

---

## Uso

### Crear una tarea
- Completar los campos **Nombre** y **Descripción**.
- Hacer clic en el botón **Agregar**.

### Actualizar una tarea
- Hacer clic en el botón **Actualizar** junto a la tarea correspondiente.
- Editar el estado o cualquier otra información en el backend.

### Eliminar una tarea
- Hacer clic en el botón **Eliminar**.
- Confirmar la acción cuando se muestre el aviso.

### Importar tareas
- Hacer clic en **Importar Tareas**.
- Seleccionar un archivo JSON con tareas en formato compatible.

### Exportar tareas
- Hacer clic en **Exportar Tareas**.
- Descargará un archivo `tareas.json` con todas las tareas existentes.

---

## Formato del archivo JSON para Importación

El archivo JSON debe tener el siguiente formato:
```json
[
    {
        "titulo": "Comprar leche",
        "descripcion": "Ir al supermercado",
        "estado": "pendiente"
    },
    {
        "titulo": "Estudiar JavaScript",
        "descripcion": "Completar el curso en línea",
        "estado": "en_progreso"
    }
]
```

---

## Estructura del Proyecto

```plaintext
|-- backend/
|   |-- main.py  # Archivo principal del servidor FastAPI
|   |-- models.py  # Definición de las estructuras de datos
|   |-- requirements.txt  # Dependencias del proyecto
|
|-- frontend/
|   |-- index.html  # Interfaz principal
|   |-- style.css  # Estilos de la aplicación
|   |-- app.js  # Lógica del frontend
```

---

## Dependencias

### Python
- **FastAPI**
- **Uvicorn**
- **Pydantic**

### Frontend
- HTML5 / CSS3
- JavaScript

---

## Futuras Mejoras

- Autenticación de usuarios.
- Filtros avanzados (por estado, fecha de creación, etc.).
- Paginación para manejar grandes cantidades de tareas.
- Mejoras en el diseño responsivo del frontend.

---

## Autor
- **Sebastian Daniel Bernal Forero**


