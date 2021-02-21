export default class Greet {
    constructor(formElement, timeElement, nameElement) {
        this.formElement = formElement;
        this.timeElement = timeElement;
        this.nameElement = nameElement;

        this.formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            const userName = this.formElement.querySelector("input").value;
            if (userName === "") return;
            localStorage.setItem("userName", userName);
            this.showGreeting(userName);
        });
    }

    updateTime() {
        const time = new Date();
        if (time.getHours() >= 5 && time.getHours() < 12)
            this.timeElement.innerText = "Good Morning";
        else if (time.getHours() >= 12 && time.getHours() < 18)
            this.timeElement.innerText = "Good Afternoon";
        else if (time.getHours() >= 18 && time.getHours() < 22)
            this.timeElement.innerText = "Good Evening";
        else this.timeElement.innerText = "Good Night";
    }

    showGreeting(userName) {
        this.updateTime();
        this.timeElement.classList.remove("invisible");

        this.nameElement.innerText = userName;
        this.nameElement.classList.remove("invisible");

        this.formElement.classList.add("invisible");
    }

    sayHello() {
        const userName = localStorage.getItem("userName");
        if (userName === null) {
            this.timeElement.classList.add("invisible");
            this.nameElement.classList.add("invisible");
            this.formElement.classList.remove("invisible");
        } else this.showGreeting(userName);
    }
}
