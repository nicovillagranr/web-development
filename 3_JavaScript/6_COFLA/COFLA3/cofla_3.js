/*
Problemas a resolver:
A) Phone: representar 3 celulares con atributos (modelo, color, peso, resolución, cámara, ram) y comportamientos: encendido/apagado/reiniciar, tomar foto, grabar; manejar apps instaladas (máx 2), evitar duplicados y listar instaladas.
B) IPhone: hereda Phone y añade cámara lenta y faceId (cámara dual opcional).
C) App: representar apps con nombre, descargas, puntuación y peso; permitir instalar, abrir, cerrar y desinstalar; controlar estado abierto, cerrar apps al apagar, prohibir acciones si el teléfono está apagado y limitar a 2 apps instaladas.
*/


class Phone{
    constructor(modelo , color , peso , resolucion , camara , ram){
        this.modelo = modelo
        this.color = color
        this.peso = peso
        this.resolucion = resolucion
        this.camara = camara
        this.ram = ram
        this.info = `
            --------------------------------<br>
            Este dispositivo es el ${this.modelo}.<br>
            Color: ${this.color}.<br>
            Peso: ${this.peso} grs.<br>
            Resolución de pantalla: ${this.resolucion}.<br>
            Cámara: ${this.camara} MP.<br>
            Memoria RAM: ${this.ram} GB.<br>
            -------------------------------<br>`
        this.instaladas = []
        this.abiertas = []
        this.estaEncendido = false
    }

    saberInfo(){
        document.writeln(this.info)
    }

    encendido(){
        if(!this.estaEncendido){
            document.writeln(`Encendido: Hello<br>`)
            this.estaEncendido = true
        }
        else{
            document.writeln(`${this.modelo} ya está encendido.<br>`)
        }
    }

    apagar(){
        if(this.estaEncendido){
            document.writeln(`Apagado: Bye<br>`)
            this.estaEncendido = false
        }
        else{
            document.writeln(`${this.modelo} ya está apagado.<br>`)
        }
    }

    reiniciar(){
        if(this.estaEncendido){
            document.writeln(`Reinciando dispositivo...<br>`)
            this.apagar()
            this.encendido()
        }
        else{
            document.writeln(`No se puede reiniciar apagado`)
        }
    }

    foto(){
    document.writeln(`📸 ${this.modelo} ha tomado una foto con su cámara de ${this.camara}MP.<br>`)
    }

    grabar(){
    document.writeln(`🎥 ${this.modelo} está grabando un video en resolución ${this.resolucion}.<br>`)
    }

    mostrarInstaladas(){
        if(this.instaladas.length === 0){
            document.writeln(`El dispositivo ${this.modelo} no tiene Apps Instaladas.<br>`)
        }
        else{
            document.writeln(`
                --------------------------------<br>
                Apps instaladas en ${this.modelo}<br>
                --------------------------------<br>`)
            for(let i = 0; i < this.instaladas.length; i++){
                this.instaladas[i].infoApp()
            }
        }
    }

    instalar(App){
        if(this.instaladas.includes(App)){
            document.writeln(`
                --------------------------------<br>
                La App ${App.nombre} ya está instalada en ${this.modelo}.<br>
                --------------------------------<br>`)
        }
        else if(this.instaladas.length >= 2){
            document.writeln(`
                --------------------------------<br>
                Ya tienes 2 Apps instaladas, no necesitas más<br>
                --------------------------------<br>`)
        }
        else{
            this.instaladas.push(App)
            document.writeln(`
                --------------------------------<br>
                Se instaló ${App.nombre} en ${this.modelo}<br>
                --------------------------------<br>`)
        }
    }

    abrir(App){
        if(this.instaladas.includes(App)){
            if(!this.abiertas.includes(App)){ // Solo si no está ya abierta
                this.abiertas.push(App)
                document.writeln(`La App ${App.nombre} está abierta.<br>`)
            } else {
                document.writeln(`La App ${App.nombre} ya está abierta.<br>`)
            }
        } else {
            document.writeln(`La App ${App.nombre} no está instalada en ${this.modelo}.<br>`)
        }
    }

    cerrar(App){
        const index = this.abiertas.indexOf(App)
        if(index !== -1){
            this.abiertas.splice(index, 1) // Quita la app del array de abiertas
            document.writeln(`La App ${App.nombre} ha sido cerrada.<br>`)
        } else {
            document.writeln(`La App ${App.nombre} no está abierta, no se puede cerrar.<br>`)
        }
    }

    desinstalar(App){
        const index = this.instaladas.indexOf(App)
        if(index !== -1){
            this.instaladas.splice(index, 1) // la sacamos de instaladas
            document.writeln(`
                --------------------------------<br>
                La App ${App.nombre} ha sido desinstalada de ${this.modelo}.<br>
                --------------------------------<br>`)

            // Si estaba abierta, la cerramos
            const indexAbierta = this.abiertas.indexOf(App)
            if(indexAbierta !== -1){
                this.abiertas.splice(indexAbierta, 1)
                document.writeln(`La App ${App.nombre} también fue cerrada.<br>`)
            }

        }
        else{
            document.writeln(`La App ${App.nombre} no está instalada en ${this.modelo}, no se puede desinstalar.<br>`)
        }
    }

}


class IPhone extends Phone{
    constructor(modelo , color , peso , resolucion , camara , ram , camaraDual){
        super(modelo , color , peso , resolucion , camara , ram)
        this.camaraDual = camaraDual
        this.instaladas = []
    }

    camaraLenta(){
        document.writeln(`🎥 ${this.modelo} está grabando un video en resolución ${this.resolucion} a 120Fps en Slow Motion.<br>`)
    }

    faceId(){
        document.writeln(`
            --------------------------------<br>
            🤦🏼‍♂️ Desbloqueado con Face ID.<br>
            --------------------------------<br>`)
    }
}


class App{
    constructor(nombre , descargas , puntuacion , peso){
        this.nombre = nombre
        this.descargas = descargas
        this.puntuacion = puntuacion
        this.peso = peso
        this.infoApps = `
            --------------------------------<br>
            Nombre App: ${this.nombre}.<br>
            Cantidad de descargas: ${this.descargas}.<br>
            Puntuación: ${this.puntuacion}/5<br>
            Peso: ${this.peso}Mb.<br>
            -------------------------------<br>`
    }
    infoApp(){
        document.writeln(this.infoApps)
    }
}


const Xiaomi14T = new Phone("Xiaomi 14T" , "Negro" , 195 , "2712 × 1220" , 50 , 12)
const Xiaomi13Pro = new Phone("Xiaomi 13 Pro" , "Blanco" , 229 , "3200 × 1440" , 50 , 12)
const XiaomiNote13 = new Phone("Redmi Note 13" , "Azul" , 188 , "2400 × 1080" , 108 , 8)

const iPhone15 = new IPhone("iPhone 15 Pro", "Titanium Blue", 187, "2556 × 1179", 48, 8)
const iPhone16 = new IPhone("iPhone 16 Pro", "Desert Titanium", 227, "2868 × 1320", 48, 8)  
const iPhone17 = new IPhone("iPhone 17 Pro", "Gris", null, null, 48, 12)

const Instagram = new App("Instagram",  "Mil Millones", 4.7, 500)
const CandyCrush = new App("Candy Crush", "500 Millones", 4.5, 300)
const Facebook = new App("Facebook",   "3 Mil Millones", 4.2, 600)
const TikTok = new App("TikTok",     "2 Mil Millones", 4.6, 550)
const SnapChat = new App("SnapChat",   "800 Millones", 4.3, 400)
const Youtube = new App("YouTube",    "2.5 Mil Millones", 4.8, 650)
const Racional = new App("Racional",   "50 Mil", 4.9, 120)


iPhone16.saberInfo()
iPhone16.encendido()
iPhone16.instalar(Racional)
iPhone16.mostrarInstaladas()

