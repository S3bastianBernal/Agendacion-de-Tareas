CREATE DATABASE TaksList2;

USE TaksList2;

CREATE TABLE tareas (
    id INT AUTO_INCREMENT PRIMARY KEY,    
    titulo VARCHAR(255) NOT NULL,          
    descripcion TEXT,
    estado ENUM('pendiente', 'en_progreso', 'completada') DEFAULT 'pendiente',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO tareas (titulo, descripcion, estado)
VALUES 
    ('Comprar leche', 'Leche descremada', 'pendiente'),
    ('Comprar pan', 'Pan integral', 'pendiente'),
    ('Preparar informe', 'Informe mensual de resultados', 'en_progreso'),
    ('Revisar correos', NULL, 'completada');