export default class Clock {
    constructor(hourMinElement, secElement) {
        this.hourMinElement = hourMinElement;
        this.secElement = secElement;
        this.mode = 24;
        this.update();
        this.display();
    }

    update() {
        const time = new Date();
        this.hour = time.getHours();
        if (this.mode === 24) this.hour = this.hour.toString().padStart(2, "0");
        else if (this.mode === 12 && this.hour > 12)
            this.hour = (this.hour - 12).toString().padStart(2, "0");
        else if (this.mode === 12 && this.hour === 0) this.hour = "12";
        this.minute = time.getMinutes().toString().padStart(2, "0");
        this.second = time.getSeconds().toString().padStart(2, "0");
    }

    display() {
        this.hourMinElement.innerText = `${this.hour}:${this.minute}`;
        this.secElement.innerText = `${this.second}`;
    }

    toggleMode() {
        this.mode = this.mode === 12 ? 24 : 12;
    }
}
