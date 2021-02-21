import Clock from "./modules/clock.js";
import Greet from "./modules/greeting.js";
import Todo from "./modules/todo.js";
import Weather from "./modules/weather.js";
import ThemeToggle from "./modules/theme.js";

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

const themeToggle = new ThemeToggle(
    document.querySelector(".theme-toggle > input")
);

const showBackgroundBtn = document.querySelector(".show-background > input");
showBackgroundBtn.addEventListener("change", () => {
    document.body.classList.toggle("background-only");
    const children = document.body.children;
    for (let i = 1; i < children.length - 2; i++) {
        if (showBackgroundBtn.checked) {
            children[i].classList.add("become-transparent");
            setTimeout(() => {
                children[i].classList.add("hide");
            }, 400);
        } else {
            children[i].classList.remove("hide");
            setTimeout(() => {
                children[i].classList.remove("become-transparent");
            }, 400);
        }
    }
});

const todoBtn = document.querySelector(".controls__todo-btn");
todoBtn.addEventListener("click", () => {
    document.querySelector(".todo").classList.toggle("invisible");
});

function init() {
    const IMAGE_NUM = 11;
    const backgroundImage = new Image();
    backgroundImage.onload = () => {
        document.body.style.backgroundImage = `url(${backgroundImage.src})`;
    };
    backgroundImage.src = `./images/landscape-${Math.floor(
        Math.random() * IMAGE_NUM
    )}.jpg`;

    weather.loadCoords();

    const time = new Date();
    setTimeout(() => {
        setInterval(() => {
            clock.update();
            clock.display();
            greet.updateTime();
        }, 1000);
    }, 1000 - time.getMilliseconds());

    setInterval(() => {
        weather.update();
    }, 60000);

    greet.sayHello();
    todo.load();
    themeToggle.loadTheme();
}

init();
