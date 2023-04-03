var form = document.querySelector('form');
var newItem = document.querySelector('#newItem');
var clear = document.querySelector('#clear');
var ul = document.querySelector('ul');
var list = [];
if (localStorage.getItem('ToDo')) {
    JSON.parse(localStorage.getItem('ToDo')).forEach(function (item) {
        list.push(item);
    });
    showList();
}
form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (newItem.value.trim() != '') {
        list.push({ checked: false, value: newItem.value });
    }
    newItem.value = '';
    showList();
});
clear.addEventListener('click', function () {
    list.splice(0);
    showList();
});
function checkItem(e) {
    list[e.parentElement.id]["checked"] = true;
    saveLS();
}
function deleteItem(e) {
    list.splice(e.parentElement.id, 1);
    showList();
}
function showList() {
    ul.innerHTML = '';
    list.forEach(function (item, idx) {
        ul.innerHTML += "\n        <li id=\"".concat(idx, "\">\n            <input type=\"checkbox\" onclick=\"checkItem(this)\" ").concat(item["checked"] ? 'checked' : '', ">\n            <p>").concat(item["value"], "</p>\n            <button onclick=\"deleteItem(this)\">delete</button>\n        </li>\n        ");
    });
    saveLS();
}
function saveLS() {
    localStorage.setItem('ToDo', JSON.stringify(list));
}
