const toggleTheme = document.querySelector('#toggleTheme');
const fontScale = document.querySelector('#fontScale');
let dark = false;

toggleTheme.addEventListener('click', () => {
  dark = !dark;
  if (dark) {
    document.body.style.background = '#111827';
    document.body.style.color = '#f9fafb';
  } else {
    document.body.style.background = 'linear-gradient(180deg, #e5e7eb, #f3f4f6)';
    document.body.style.color = '#111827';
  }
});

fontScale.addEventListener('input', () => {
  document.documentElement.style.fontSize = `${fontScale.value}px`;
});
