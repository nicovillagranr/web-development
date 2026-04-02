// 04 — Theme Toggle + Font Scale
// TS: HTMLInputElement.value es siempre string; convertimos a number para el CSS.
const toggleTheme = document.querySelector("#toggleTheme");
const fontScale = document.querySelector("#fontScale");
let dark = false;
toggleTheme.addEventListener("click", () => {
    dark = !dark;
    if (dark) {
        document.body.style.background = "#111827";
        document.body.style.color = "#f9fafb";
    }
    else {
        document.body.style.background = "linear-gradient(180deg, #e5e7eb, #f3f4f6)";
        document.body.style.color = "#111827";
    }
});
fontScale.addEventListener("input", () => {
    // TS: fontScale.value es string — agregamos 'px' directamente
    document.documentElement.style.fontSize = `${fontScale.value}px`;
});
export {};
//# sourceMappingURL=index.js.map