import Clock from "./modules/clock.js";
import Greet from "./modules/greeting.js";
import Todo from "./modules/todo.js";

const clock = new Clock(
    document.querySelector(".clock__hour-min"),
    document.querySelector(".clock__sec")
);

const greet = new Greet(
    document.querySelector(".greeting__ask-name"),
    document.querySelector(".greeting__time"),
    document.querySelector(".greeting__user-name")
);

const todo = new Todo(
    document.querySelector(".todo-new-title"),
    document.querySelector(".todo-new-content"),
    document.querySelector(".todo-pending"),
    document.querySelector(".todo-finished"),
    document.querySelector(".todo-toggle > input"),
    document.querySelector(".todo-new")
);

function init() {
    setInterval(() => {
        clock.update();
        clock.display();
        greet.updateTime();
    }, 1000);
    greet.sayHello();
    todo.load();
}

init();
