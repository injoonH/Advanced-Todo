import Clock from "./modules/clock.js";

const clock = new Clock(
    document.querySelector(".clock__hour-min"),
    document.querySelector(".clock__sec")
);

const greetingTime = document.querySelector(".greeting__time");
const greetingName = document.querySelector(".greeting__user-name");
const greetingForm = document.querySelector(".greeting__ask-name");

greetingForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const userName = greetingForm.querySelector("input").value;
    if (userName === "") return;
    localStorage.setItem("userName", userName);
    showGreeting(userName);
});

function showGreeting(userName) {
    const time = new Date();
    if (time.getHours() >= 5 && time.getHours() < 12)
        greetingTime.innerText = "Good Morning";
    else if (time.getHours() >= 12 && time.getHours() < 18)
        greetingTime.innerText = "Good Afternoon";
    else if (time.getHours() >= 18 && time.getHours() < 22)
        greetingTime.innerText = "Good Evening";
    else greetingTime.innerText = "Good Night";
    greetingTime.classList.remove("invisible");
    greetingName.innerText = userName;
    greetingName.classList.remove("invisible");
    greetingForm.classList.add("invisible");
}

function sayHello() {
    const userName = localStorage.getItem("userName");
    if (userName === null) {
        greetingTime.classList.add("invisible");
        greetingName.classList.add("invisible");
        greetingForm.classList.remove("invisible");
    } else showGreeting(userName);
}

function init() {
    setInterval(() => {
        clock.update();
        clock.display();
    }, 1000);
    sayHello();
}

init();
