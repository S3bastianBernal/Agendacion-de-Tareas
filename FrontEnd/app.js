const url = "http://localhost:8000";

window.addEventListener('load', getTasks);
document.getElementById("addTask").addEventListener("click", addTask);
const importInput = document.getElementById("importTasks");
const exportButton = document.getElementById("exportTasks");
async function getTasks() {
    try {
        const response = await fetch(`${url}/getTasks`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener las tareas');
        }

        const tasks = await response.json();
        renderTasks(tasks);

    } catch (error) {
        console.error('Error:', error);
    }
}

function renderTasks(tasks) {

    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach(task => {
        const taskItem = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.estado === 'completada';

        const title = document.createElement("span");
        title.textContent = `${task.titulo} / ${task.descripcion}`;

        const status = document.createElement("span");
        status.textContent = ` (${task.estado})`;
        status.classList.add("status", task.estado);

        const updateButton = document.createElement("button");
        updateButton.textContent = "Actualizar";
        updateButton.classList.add("btn", "btn-update");
        updateButton.onclick = () => updateTask(task);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Eliminar";
        deleteButton.classList.add("btn", "btn-delete");
        deleteButton.onclick = () => deleteTask(task.id);

        taskItem.appendChild(checkbox);
        taskItem.appendChild(title);
        taskItem.appendChild(status);
        taskItem.appendChild(updateButton);
        taskItem.appendChild(deleteButton);

        if (task.estado === 'completada') {
            taskItem.classList.add("completed");
        }

        taskList.appendChild(taskItem);
    });
}

async function addTask() {
    const title = document.getElementById("taskTitle").value.trim();
    const description = document.getElementById("taskDescription").value.trim();

    if (!title) {
        alert("El nombre de la tarea es obligatorio.");
        return;
    }

    const taskData = {
        titulo: title,
        descripcion: description,
        estado: "pendiente" 
    };

    try {
        const response = await fetch(`${url}/createTask`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskData),
        });

        if (!response.ok) {
            throw new Error("Error al agregar la tarea.");
        }

        document.getElementById("taskTitle").value = "";
        document.getElementById("taskDescription").value = "";

        await getTasks();
        alert("Tarea agregada correctamente.");
    } catch (error) {
        console.error("Error:", error);
        alert("Hubo un problema al agregar la tarea.");
    }
}

async function deleteTask(taskId) {
    const confirmation = confirm("¿Estás seguro de que deseas eliminar esta tarea?");
    if (!confirmation) {
        return; 
    }
    try {
        const response = await fetch(`${url}/deleteTask/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al eliminar la tarea');
        }

        // Actualizar la lista de tareas después de eliminar
        await getTasks();
    } catch (error) {
        console.error('Error:', error);
    }
}

async function updateTask(task) {
    const newTitle = prompt("Ingrese el nuevo título:", task.titulo);
    const newDescription = prompt("Ingrese la nueva descripción:", task.descripcion);
    const newStatus = prompt("Ingrese el nuevo estado (pendiente, en_progreso, completada):", task.estado);

    if (!newTitle || !newStatus) {
        alert("El título y el estado son obligatorios.");
        return;
    }

    try {
        const response = await fetch(`${url}/updateTask/${task.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                titulo: newTitle,
                descripcion: newDescription || task.descripcion,
                estado: newStatus
            })
        });

        if (!response.ok) {
            throw new Error('Error al actualizar la tarea');
        }

        alert("Tarea actualizada con éxito.");
        getTasks();
    } catch (error) {
        console.error("Error:", error);
        alert("Error al actualizar la tarea.");
    }
}
importInput.addEventListener("change", async (event) => {
    const file = event.target.files[0];
    
    if (!file) {
        alert("Por favor selecciona un archivo JSON.");
        return;
    }

    try {
        const fileContent = await file.text();
        const importedTasks = JSON.parse(fileContent);

        if (!Array.isArray(importedTasks)) {
            throw new Error("El archivo no contiene un array de tareas.");
        }

        for (const task of importedTasks) {
            if (!task.titulo || !task.estado) {
                throw new Error("El archivo contiene tareas con formato incorrecto.");
            }
        }

        for (const task of importedTasks) {
            await fetch(`${url}/createTask`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    titulo: task.titulo,
                    descripcion: task.descripcion || "",
                    estado: task.estado || "pendiente",
                }),
            });
        }

        alert("Tareas importadas correctamente.");
        await getTasks();

    } catch (error) {
        console.error("Error:", error);
        alert("Hubo un problema al importar las tareas: " + error.message);
    }
});

exportButton.addEventListener("click", async () => {
    try {
        const response = await fetch(`${url}/getTasks`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Error al obtener las tareas.");
        }

        const tasks = await response.json();

        const jsonBlob = new Blob([JSON.stringify(tasks, null, 2)], {
            type: "application/json",
        });
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(jsonBlob);
        downloadLink.download = "tareas.json";
        downloadLink.click();

        alert("Tareas exportadas correctamente.");
    } catch (error) {
        console.error("Error:", error);
        alert("Hubo un problema al exportar las tareas.");
    }
});



