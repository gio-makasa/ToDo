import {v4 as uuidV4} from "../_snowpack/pkg/uuid.js";
const form = document.querySelector("#newTaskForm");
const input = document.querySelector("#newTask");
const list = document.querySelector("#list");
const tasks = loadTasks();
tasks.forEach(addListItem);
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input?.value == "" || input?.value == null)
    return;
  const newTask = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  };
  tasks.push(newTask);
  addListItem(newTask);
  input.value = "";
});
function addListItem(task) {
  const item = document.createElement("label");
  const checkbox = document.createElement("input");
  const checkmark = document.createElement("span");
  const deletemark = document.createElement("span");
  checkmark.classList.add("checkmark");
  deletemark.classList.add("deletemark");
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveTasks();
  });
  deletemark.addEventListener("click", (e) => {
    let element = e.target;
    let item2 = tasks.filter((task2) => {
      return task2.id == element.id;
    });
    let idx = tasks.indexOf(item2[0]);
    tasks.splice(idx, 1);
    if (list) {
      list.innerHTML = "";
    }
    tasks.forEach(addListItem);
    saveTasks();
  });
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  item.append(checkbox, task.title);
  item.append(checkmark);
  item.append(deletemark);
  deletemark.setAttribute("id", task.id);
  list?.append(item);
  saveTasks();
}
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks() {
  const taskJson = localStorage.getItem("tasks");
  if (taskJson == null)
    return [];
  return JSON.parse(taskJson);
}
