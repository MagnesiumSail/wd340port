let todos = [];

function saveTodos(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
    todos = JSON.parse(localStorage.getItem('todos'));
}

function addTodo(todoList) {
    const newTodo = {
        value: todo,
        completed: false
    }
    todos.push(newTodo);
    saveTodos(todos);
    displayTodos();
}

function todoTemplates(todo) {
    return `<li>${todo.value}<span>${todo.completed? 'X' : '0'}</span></li>`;
}

function displayTodos(todoList) {
    const listEl = document.querySelector('#todoList');
    const html = todoList.map(todoTemplate);
    listEl.insertAdjacentHTML('afterbegin', html.join(''));
}

export default function toDo() {

}