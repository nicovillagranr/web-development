// 01 — Counter Pro
// TS: variables con tipos explícitos; Number() convierte string a number.
const value = document.querySelector("#value");
const inc = document.querySelector("#inc");
const dec = document.querySelector("#dec");
const reset = document.querySelector("#reset");
const step = document.querySelector("#step");
let count = 0;
function update() {
    value.textContent = String(count); // textContent es string, no number
}
inc.addEventListener("click", () => {
    count += Number(step.value || 1);
    update();
});
dec.addEventListener("click", () => {
    count -= Number(step.value || 1);
    update();
});
reset.addEventListener("click", () => {
    count = 0;
    update();
});
export {};
//# sourceMappingURL=index.js.map