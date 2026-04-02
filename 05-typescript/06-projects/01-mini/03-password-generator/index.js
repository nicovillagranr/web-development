// 03 — Password Generator
// TS: HTMLInputElement para checkboxes (.checked) y text inputs (.value).
const len = document.querySelector("#len");
const upper = document.querySelector("#upper");
const numbers = document.querySelector("#numbers");
const symbols = document.querySelector("#symbols");
const result = document.querySelector("#result");
const generate = document.querySelector("#generate");
const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+-=[]{}";
generate.addEventListener("click", () => {
    let pool = lowerChars;
    if (upper.checked)
        pool += upperChars; // .checked es boolean (HTMLInputElement)
    if (numbers.checked)
        pool += numberChars;
    if (symbols.checked)
        pool += symbolChars;
    const size = Math.max(6, Math.min(32, Number(len.value || 12)));
    let pwd = "";
    for (let i = 0; i < size; i++) {
        pwd += pool[Math.floor(Math.random() * pool.length)];
    }
    result.value = pwd;
});
export {};
//# sourceMappingURL=index.js.map