// ============================================================================
// COFLA 3 — TypeScript
// ============================================================================
// Problema: Phone, IPhone, App — clases con herencia
// TS agrega tipos a propiedades, parámetros y métodos
// Clase App definida antes de Phone (Phone la usa)
class App {
    constructor(nombre, descargas, puntuacion, peso) {
        this.nombre = nombre;
        this.descargas = descargas;
        this.puntuacion = puntuacion;
        this.peso = peso;
    }
    infoApp() {
        document.writeln(`
      --------------------------------<br>
      Nombre App: ${this.nombre}.<br>
      Cantidad de descargas: ${this.descargas}.<br>
      Puntuación: ${this.puntuacion}/5<br>
      Peso: ${this.peso}Mb.<br>
      -------------------------------<br>`);
    }
}
class Phone {
    constructor(modelo, color, peso, resolucion, camara, ram) {
        this.modelo = modelo;
        this.color = color;
        this.peso = peso;
        this.resolucion = resolucion;
        this.camara = camara;
        this.ram = ram;
        this.estaEncendido = false;
        this.instaladas = [];
        this.abiertas = [];
    }
    saberInfo() {
        document.writeln(`
      --------------------------------<br>
      Este dispositivo es el ${this.modelo}.<br>
      Color: ${this.color}.<br>
      Peso: ${this.peso ?? "N/D"} grs.<br>
      Resolución de pantalla: ${this.resolucion ?? "N/D"}.<br>
      Cámara: ${this.camara} MP.<br>
      Memoria RAM: ${this.ram} GB.<br>
      -------------------------------<br>`);
    }
    encendido() {
        if (!this.estaEncendido) {
            document.writeln("Encendido: Hello<br>");
            this.estaEncendido = true;
        }
        else {
            document.writeln(`${this.modelo} ya está encendido.<br>`);
        }
    }
    apagar() {
        if (this.estaEncendido) {
            document.writeln("Apagado: Bye<br>");
            this.estaEncendido = false;
        }
        else {
            document.writeln(`${this.modelo} ya está apagado.<br>`);
        }
    }
    reiniciar() {
        if (this.estaEncendido) {
            document.writeln("Reiniciando dispositivo...<br>");
            this.apagar();
            this.encendido();
        }
        else {
            document.writeln("No se puede reiniciar apagado<br>");
        }
    }
    foto() {
        document.writeln(`📸 ${this.modelo} ha tomado una foto con su cámara de ${this.camara}MP.<br>`);
    }
    grabar() {
        document.writeln(`🎥 ${this.modelo} está grabando un video en resolución ${this.resolucion}.<br>`);
    }
    mostrarInstaladas() {
        if (this.instaladas.length === 0) {
            document.writeln(`El dispositivo ${this.modelo} no tiene Apps Instaladas.<br>`);
        }
        else {
            document.writeln(`
        --------------------------------<br>
        Apps instaladas en ${this.modelo}<br>
        --------------------------------<br>`);
            for (const app of this.instaladas) {
                app.infoApp();
            }
        }
    }
    instalar(app) {
        if (this.instaladas.includes(app)) {
            document.writeln(`La App ${app.nombre} ya está instalada en ${this.modelo}.<br>`);
        }
        else if (this.instaladas.length >= 2) {
            document.writeln("Ya tienes 2 Apps instaladas, no necesitas más<br>");
        }
        else {
            this.instaladas.push(app);
            document.writeln(`Se instaló ${app.nombre} en ${this.modelo}<br>`);
        }
    }
    abrir(app) {
        if (this.instaladas.includes(app)) {
            if (!this.abiertas.includes(app)) {
                this.abiertas.push(app);
                document.writeln(`La App ${app.nombre} está abierta.<br>`);
            }
            else {
                document.writeln(`La App ${app.nombre} ya está abierta.<br>`);
            }
        }
        else {
            document.writeln(`La App ${app.nombre} no está instalada en ${this.modelo}.<br>`);
        }
    }
    cerrar(app) {
        const index = this.abiertas.indexOf(app);
        if (index !== -1) {
            this.abiertas.splice(index, 1);
            document.writeln(`La App ${app.nombre} ha sido cerrada.<br>`);
        }
        else {
            document.writeln(`La App ${app.nombre} no está abierta.<br>`);
        }
    }
    desinstalar(app) {
        const index = this.instaladas.indexOf(app);
        if (index !== -1) {
            this.instaladas.splice(index, 1);
            document.writeln(`La App ${app.nombre} ha sido desinstalada de ${this.modelo}.<br>`);
            const indexAbierta = this.abiertas.indexOf(app);
            if (indexAbierta !== -1) {
                this.abiertas.splice(indexAbierta, 1);
                document.writeln(`La App ${app.nombre} también fue cerrada.<br>`);
            }
        }
        else {
            document.writeln(`La App ${app.nombre} no está instalada en ${this.modelo}.<br>`);
        }
    }
}
// IPhone extiende Phone — 'override' indica que este constructor reemplaza al padre
class IPhone extends Phone {
    constructor(modelo, color, peso, resolucion, camara, ram, camaraDual = false) {
        super(modelo, color, peso, resolucion, camara, ram);
        this.camaraDual = camaraDual;
    }
    camaraLenta() {
        document.writeln(`🎥 ${this.modelo} está grabando en ${this.resolucion} a 120Fps en Slow Motion.<br>`);
    }
    faceId() {
        document.writeln("🤦🏼‍♂️ Desbloqueado con Face ID.<br>");
    }
}
// Instancias
const Xiaomi14T = new Phone("Xiaomi 14T", "Negro", 195, "2712 × 1220", 50, 12);
const Xiaomi13Pro = new Phone("Xiaomi 13 Pro", "Blanco", 229, "3200 × 1440", 50, 12);
const XiaomiNote13 = new Phone("Redmi Note 13", "Azul", 188, "2400 × 1080", 108, 8);
const iPhone15 = new IPhone("iPhone 15 Pro", "Titanium Blue", 187, "2556 × 1179", 48, 8);
const iPhone16 = new IPhone("iPhone 16 Pro", "Desert Titanium", 227, "2868 × 1320", 48, 8);
const iPhone17 = new IPhone("iPhone 17 Pro", "Gris", null, null, 48, 12);
const Instagram = new App("Instagram", "Mil Millones", 4.7, 500);
const CandyCrush = new App("Candy Crush", "500 Millones", 4.5, 300);
const Facebook = new App("Facebook", "3 Mil Millones", 4.2, 600);
const TikTok = new App("TikTok", "2 Mil Millones", 4.6, 550);
const SnapChat = new App("SnapChat", "800 Millones", 4.3, 400);
const Youtube = new App("YouTube", "2.5 Mil Millones", 4.8, 650);
const Racional = new App("Racional", "50 Mil", 4.9, 120);
// Uso
iPhone16.saberInfo();
iPhone16.encendido();
iPhone16.instalar(Racional);
iPhone16.mostrarInstaladas();
export {};
//# sourceMappingURL=cofla_3.js.map