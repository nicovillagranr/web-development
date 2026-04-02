// 04 — Unit Converter
// TS: HTMLSelectElement para el dropdown; literal union type para las conversiones.
const valueEl = document.querySelector("#value");
const typeEl = document.querySelector("#type");
const convert = document.querySelector("#convert");
const output = document.querySelector("#output");
function convertValue(amount, type) {
    switch (type) {
        case "km-mi":
            return { value: amount * 0.621371, label: "mi" };
        case "c-f":
            return { value: amount * 1.8 + 32, label: "°F" };
        case "kg-lb":
            return { value: amount * 2.20462, label: "lb" };
    }
}
convert.addEventListener("click", () => {
    const amount = Number(valueEl.value);
    if (Number.isNaN(amount))
        return;
    const type = typeEl.value;
    const { value, label } = convertValue(amount, type);
    output.textContent = `Resultado: ${value.toFixed(2)} ${label}`;
});
export {};
//# sourceMappingURL=index.js.map