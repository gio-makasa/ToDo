const form = document.querySelector<HTMLFormElement>('form');
const newItem = document.querySelector<HTMLInputElement>('#newItem');
const clear = document.querySelector<HTMLButtonElement>('#clear');
const ul = document.querySelector<HTMLUListElement>('ul');

const list: Object[] = [];

if (localStorage.getItem('ToDo')) {
    JSON.parse(localStorage.getItem('ToDo')).forEach(item => {
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
    list[e.parentElement.id]["checked"] = true;
    saveLS();
}

function deleteItem(e: any) {
    list.splice(e.parentElement.id, 1)
    showList();
}

function showList(): void {
    ul.innerHTML = '';
    list.forEach((item, idx) => {
        ul.innerHTML += `
        <li id="${idx}">
            <input type="checkbox" onclick="checkItem(this)" ${item["checked"] ? 'checked' : ''}>
            <p>${item["value"]}</p>
            <button onclick="deleteItem(this)">delete</button>
        </li>
        `;
    });
    saveLS();
}

function saveLS() {
    localStorage.setItem('ToDo', JSON.stringify(list));
}