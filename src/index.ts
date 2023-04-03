import { v4 as uuidV4 } from 'uuid'

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
}

const form = document.querySelector<HTMLFormElement>("#newTaskForm");
const input = document.querySelector<HTMLInputElement>("#newTask");
const list = document.querySelector<HTMLDivElement>("#list");
const tasks: Task[] = loadTasks();

tasks.forEach(addListItem);

form?.addEventListener("submit", e => {
  e.preventDefault();
  if (input?.value == "" || input?.value == null) return

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }

  tasks.push(newTask);

  addListItem(newTask);
  input.value = '';
})

function addListItem(task: Task) {
  const item = document.createElement("label");
  const checkbox = document.createElement("input");
  const checkmark = document.createElement("span");
  const deletemark = document.createElement("span");
  checkmark.classList.add('checkmark');
  deletemark.classList.add('deletemark');

  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveTasks();
  });

  deletemark.addEventListener("click", (e) => {
    let element = e.target as Element;
    let item = tasks.filter(task => { return task.id == element.id });
    let idx = tasks.indexOf(item[0]);
    tasks.splice(idx, 1);
    if (list) {
      list.innerHTML = '';
    }
    tasks.forEach(addListItem);
    saveTasks();
  });

  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  item.append(checkbox, task.title);
  item.append(checkmark);
  item.append(deletemark);
  deletemark.setAttribute("id", task.id)
  list?.append(item);
  saveTasks();
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const taskJson = localStorage.getItem('tasks');
  if (taskJson == null) return []
  return JSON.parse(taskJson);
}