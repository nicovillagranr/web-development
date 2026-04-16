window.addEventListener("load" , () => {
    const h1 = document.getElementById("title");
    const player = document.getElementById("player");

    // Cuando se haga play, conectar el audio a Tone.js
    player.addEventListener("play", async () => {
    await Tone.start(); // necesario en navegadores modernos
    const audioContext = Tone.getContext().rawContext;
    const source = audioContext.createMediaElementSource(player);

      // Crear un analizador de frecuencias
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    source.connect(analyser);
    analyser.connect(audioContext.destination);

    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    function animate() {
        analyser.getByteFrequencyData(dataArray);

        // Tomar la energía promedio (bajo + medio)
        const avg = dataArray.slice(0, 64).reduce((a, b) => a + b) / 64;

        // Aplicar efecto al h1 según la intensidad
        const scale = 1 + avg / 200;
        const hue = avg * 3;

        h1.style.transform = `scale(${scale})`;
        h1.style.color = `hsl(${hue}, 100%, 60%)`;

        requestAnimationFrame(animate);
    }

    animate();
    });
})