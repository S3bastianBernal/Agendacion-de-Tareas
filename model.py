from sqlalchemy import Column, Integer, String, Text, Enum, TIMESTAMP
from datetime import datetime
from database import Base


class Tarea(Base):
    __tablename__ = 'tareas'  

    id = Column(Integer, primary_key=True, autoincrement=True)  
    titulo = Column(String(255), nullable=False)  
    descripcion = Column(Text, nullable=True)  
    estado = Column(Enum('pendiente', 'en_progreso', 'completada'), default='pendiente')  
    fecha_creacion = Column(TIMESTAMP, default=datetime.now)  
