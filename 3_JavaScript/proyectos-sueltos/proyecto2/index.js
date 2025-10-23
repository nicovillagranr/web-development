window.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('.main__input');
    const textoElement = document.querySelector('.main__text');
    
    input.addEventListener('keydown' , (e) => {
        let search = input.value
        if(search.trim() !== "" && e.code == "Enter"){
            let regExp = new RegExp(search, 'gi');
            textoElement.innerHTML = textoElement.textContent.replace(regExp , "<span class='text__search'>$&</span>")
        }
    })
});