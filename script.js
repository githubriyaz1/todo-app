document.addEventListener("DOMContentLoaded", () => {
  loadTasks();
  const themeSwitch = document.getElementById("themeSwitcher");
  themeSwitch.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
  });

  // Load theme preference
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeSwitch.checked = true;
  }
});

function addTask() {
  const input = document.getElementById("taskInput");
  const dueInput = document.getElementById("dueTime");
  const taskText = input.value.trim();
  const dueTime = dueInput.value;

  if (taskText === "") return;

  const task = {
    text: taskText,
    due: dueTime,
    completed: false
  };

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTasks();
  input.value = "";
  dueInput.value = "";
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");
    li.innerHTML = `
      <span onclick="toggleComplete(${index})">${task.text}</span>
      <div style="width: 100%">
        ${task.due ? `<span class="due-time">🕒 ${new Date(task.due).toLocaleString()}</span>` : ""}
      </div>
      <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

function toggleComplete(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function deleteTask(index) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function loadTasks() {
  renderTasks();
}
