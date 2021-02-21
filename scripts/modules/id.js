export default class ID {
    static timeID() {
        const time = new Date();
        const year = time.getFullYear();
        const month = time.getMonth().toString().padStart(2, "0");
        const date = time.getDate().toString().padStart(2, "0");
        const hour = time.getHours().toString().padStart(2, "0");
        const minute = time.getMinutes().toString().padStart(2, "0");
        const second = time.getSeconds().toString().padStart(2, "0");
        const millisecond = time.getMilliseconds().toString().padStart(3, "0");
        return `${year}${month}${date}${hour}${minute}${second}${millisecond}`;
    }
}
