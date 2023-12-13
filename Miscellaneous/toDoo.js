import { addTodo } from "./toDo.mjs";

function buttonLog() {
    const buttonText = document.querySelector('#toDoText').value;
    addTodo
    console.log(buttonText);
}

const button = document.querySelector('#addButton');
button.addEventListener("click", buttonLog)