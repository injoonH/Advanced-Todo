import ID from "./id.js";

export default class Todo {
    constructor(
        titleElement,
        contentElement,
        pendingElement,
        finishedElement,
        toggleElement,
        formElement
    ) {
        this.titleElement = titleElement;
        this.contentElement = contentElement;
        this.pendingElement = pendingElement;
        this.finishedElement = finishedElement;
        this.toggleElement = toggleElement;
        this.formElement = formElement;

        this.toggleElement.addEventListener("change", () => {
            this.pendingElement.classList.toggle("invisible");
            this.finishedElement.classList.toggle("invisible");
        });

        this.formElement.addEventListener("submit", (evt) => {
            evt.preventDefault();
            const todo = {
                id: ID.timeID(),
                title: this.titleElement.value,
                content: this.contentElement.value,
            };
            this.saveLocal("pending", todo);
            this.appendTodo("pending", todo);
            this.titleElement.value = "";
            this.contentElement.value = "";
        });
    }

    type() {
        return this.toggleElement.checked ? "finished" : "pending";
    }

    getFromLocal(type = null) {
        if (type === null) type = this.type();
        return localStorage.getItem(type) === null
            ? []
            : JSON.parse(localStorage.getItem(type));
    }

    saveLocal(type, todo) {
        const container = this.getFromLocal();
        container.push(todo);
        localStorage.setItem(type, JSON.stringify(container));
    }

    removeLocal(id) {
        const container = this.getFromLocal();
        const index = container.findIndex((e) => e.id === id);
        container.splice(index, 1);
        localStorage.setItem(this.type(), JSON.stringify(container));
    }

    appendTodo(type, todo) {
        const li = document.createElement("li");
        li.classList.add("todo-item");
        li.id = todo.id;

        const title = document.createElement("span");
        title.classList.add("todo-item__title");
        title.innerText = todo.title;

        const content = document.createElement("p");
        content.classList.add("todo-item__content");
        content.innerText = todo.content;

        const div = document.createElement("div");
        div.appendChild(title);
        div.appendChild(content);
        li.appendChild(div);

        const shiftBtn = document.createElement("button");
        shiftBtn.classList.add("todo-item__shift-btn");
        if (type === "pending")
            shiftBtn.innerHTML = `<i class="fas fa-check"></i>`;
        else shiftBtn.innerHTML = `<i class="fas fa-undo-alt"></i>`;
        shiftBtn.addEventListener("click", (evt) => {
            const todo = evt.target.parentElement;
            const title = todo.querySelector(".todo-item__title").innerText;
            const content = todo.querySelector(".todo-item__content").innerText;
            const obj = { id: todo.id, title: title, content: content };
            if (this.toggleElement.checked) {
                this.removeLocal(todo.id);
                this.saveLocal("pending", obj);
                this.appendTodo("pending", obj);
            } else {
                this.removeLocal(todo.id);
                this.saveLocal("finished", obj);
                this.appendTodo("finished", obj);
            }
            todo.remove();
        });
        li.appendChild(shiftBtn);

        const removeBtn = document.createElement("button");
        removeBtn.classList.add("todo-item__remove-btn");
        removeBtn.innerHTML = `<i class="fas fa-minus"></i>`;
        removeBtn.addEventListener("click", (evt) => {
            const todo = evt.target.parentElement;
            this.removeLocal(todo.id);
            todo.remove();
        });
        li.appendChild(removeBtn);

        if (type === "pending") this.pendingElement.appendChild(li);
        else this.finishedElement.appendChild(li);
    }

    load() {
        this.getFromLocal("pending").forEach((todo) => {
            this.appendTodo("pending", todo);
        });
        this.getFromLocal("finished").forEach((todo) => {
            this.appendTodo("finished", todo);
        });
    }
}
