export default class ThemeToggle {
    constructor(toggleElement) {
        this.toggleElement = toggleElement;

        this.toggleElement.addEventListener("change", () => {
            document.body.classList.toggle("darkmode");
            localStorage.setItem(
                "theme",
                JSON.stringify(this.toggleElement.checked)
            );
        });
    }

    loadTheme() {
        const isDark = JSON.parse(localStorage.getItem("theme"));
        if (isDark) {
            this.toggleElement.checked = true;
            document.body.classList.toggle("darkmode");
        }
    }
}
