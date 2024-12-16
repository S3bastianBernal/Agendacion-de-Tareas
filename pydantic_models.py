from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class TareaBase(BaseModel):
    titulo: str
    descripcion: Optional[str] = None
    estado: Optional[str] = 'pendiente' 

class TareaCreate(TareaBase):
    pass

class TareaUpdate(BaseModel):
    titulo: str
    descripcion: str = None
    estado: str = 'pendiente'

class TareaResponse(TareaBase):
    id: int
    fecha_creacion: datetime

    class Config:
        orm_mode = True
