const form = document.querySelector<HTMLFormElement>('form')!;
const newItem = document.querySelector<HTMLInputElement>('#newItem')!;
const clear = document.querySelector<HTMLButtonElement>('#clear')!;
const ul = document.querySelector<HTMLUListElement>('ul')!;

interface Item {
  checked: boolean;
  value: string;
}

const list: Item[] = [];

if (localStorage.getItem('ToDo')) {
  JSON.parse(localStorage.getItem('ToDo') || "").forEach((item: any) => {
    list.push(item);
  });

  showList();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (newItem.value.trim() != '') {
    list.push({ checked: false, value: newItem.value });
  }
  newItem.value = '';
  showList();
});

clear.addEventListener('click', () => {
  list.splice(0);
  showList();
})

function checkItem(e: any): void {
  list[e.target.parentElement.id]["checked"] = true;
  saveLS();
}

function deleteItem(e: any): void {
  list.splice(e.target.parentElement.id, 1)
  showList();
}

function showList(): void {
  ul.innerHTML = '';
  list.forEach((item, idx) => {
    ul.innerHTML += `
        <li id="${idx}">
            <input type="checkbox" class="checks" ${item["checked"] ? 'checked' : ''}>
            <p>${item["value"]}</p>
            <button class="deletes"">delete</button>
        </li>
        `;
  });
  document.querySelectorAll(".checks").forEach(element => {
    element.addEventListener('click', checkItem)
  });
  document.querySelectorAll(".deletes").forEach(element => {
    element.addEventListener('click', deleteItem)
  });
  saveLS();
}

function saveLS() {
  localStorage.setItem('ToDo', JSON.stringify(list));
}