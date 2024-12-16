from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from database import get_db
from sqlalchemy.orm import Session
from model import Tarea
from pydantic_models import TareaCreate, TareaUpdate, TareaResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"], 
)

@app.get("/getTasks")
async def upload_file(db: Session = Depends(get_db)):
    try:
        tasks = db.query(Tarea).all()
        return tasks
    except Exception as e: 
        raise HTTPException(status_code=500, detail= str(e))


@app.post("/createTask", response_model=TareaResponse)
async def create_task(tarea: TareaCreate, db: Session = Depends(get_db)):
    try:
        db_task = Tarea(
            titulo=tarea.titulo,
            descripcion=tarea.descripcion,
            estado=tarea.estado
        )
        db.add(db_task)
        db.commit()
        db.refresh(db_task)
        return db_task
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    
@app.delete("/deleteTask/{task_id}", response_model=TareaResponse)
async def delete_task(task_id: int, db: Session = Depends(get_db)):
    try:
        task_to_delete = db.query(Tarea).filter(Tarea.id == task_id).first()

        if not task_to_delete:
            raise HTTPException(status_code=404, detail="Task not found")

        db.delete(task_to_delete)
        db.commit()

        return task_to_delete 

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    
@app.put("/updateTask/{task_id}", response_model=TareaResponse)
async def update_task(task_id: int, tarea_update: TareaUpdate, db: Session = Depends(get_db)):
    try:
        task_to_update = db.query(Tarea).filter(Tarea.id == task_id).first()

        if not task_to_update:
            raise HTTPException(status_code=404, detail="Task not found")

        task_to_update.titulo = tarea_update.titulo
        task_to_update.descripcion = tarea_update.descripcion
        task_to_update.estado = tarea_update.estado

        db.commit()
        db.refresh(task_to_update)

        return task_to_update

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))