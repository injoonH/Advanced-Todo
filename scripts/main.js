import Clock from "./modules/clock.js";
import Greet from "./modules/greeting.js";
import Todo from "./modules/todo.js";
import Weather from "./modules/weather.js";

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

const weather = new Weather(
    document.querySelector(".weather-thermometer"),
    document.querySelector(".weather-temperature"),
    document.querySelector(".weather-location")
);

function init() {
    document.body.style.backgroundImage = `url(./images/landscape-${Math.floor(
        Math.random() * 9
    )}.jpg)`;

    weather.loadCoords();

    setInterval(() => {
        clock.update();
        clock.display();
        greet.updateTime();
    }, 1000);
    greet.sayHello();
    todo.load();
}

init();
