
document.addEventListener("DOMContentLoaded", () => {
// select document object model

const taskInput = document.getElementById("taskInput");

const taskList = document.getElementById("taskList");

const addTaskButton = document.getElementById("addTaskButton");

//add new task

function addTask(text, copmpleted = false) {
    
    if (text.trim() === "") return;

    const li = document.createElement("li");

    li.textContent = text;

    if (copmpleted) li.classList.add("completed");


    li.addEventListener("click", () => {

        li.classList.toggle("completed");

        saveTasks();

    });

    const removeBtn = document.createElement("button");

    removeBtn.textContent = "x";

    removeBtn.addEventListener("click", () => {

        li.remove();

        saveTasks();               
        
    });

    li.appendChild(removeBtn);

    taskList.appendChild(li);

    saveTasks();
}

//save task in local storage

function saveTasks() {

    const tasks = [];

    document.querySelectorAll("#taskList li").forEach(li => {

        tasks.push(
            {
                text: li.textContent.replace("x", "").trim(),
                copmpleted: li.classList.contains("completed")
            }
        );
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
    
}

// add new task with botton

addTaskButton.addEventListener("click", () => {

    console.log("Botton add click");

    addTask(taskInput.value);

    taskInput.value = "";

});

// add new task with enter

taskInput.addEventListener("keypress", (e) => {

    if(e.key === "Enter") {

        addTask(taskInput.value);

        taskInput.value = "";
    }

});

// load all task

function loadTask() {

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => addTask(task.text, task.completed));

}

loadTask();

});