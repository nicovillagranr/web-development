// ============================================================================
// 🏎️ Campeonato de Fórmula 1 — TypeScript
// ============================================================================
// TS: interfaces para estructuras de datos complejas; Record<K,V> para mapas.

// ===========================
// Interfaces de datos
// ===========================

interface Circuito {
  indice: number;
  nombre: string;
  pais: string;
  kilometros: number;
}

interface Carrera {
  circuito: Circuito;
  fecha: string;
}

interface Piloto {
  nombre: string;
  puntos: number;
}

interface Scuderia {
  nombreScuderia: string;
  pilotos: Piloto[];
  autos: string[];
}

// Puntos FIA por posición — Record<number, number> es un mapa tipado
const PUNTOS_FIA: Record<number, number> = {
  0: 25, 1: 18, 2: 15, 3: 12, 4: 10, 5: 8, 6: 6, 7: 4, 8: 2, 9: 1,
};

// ===========================
// Clase Campeonato
// ===========================

class Campeonato {
  private nombre: string;
  private listaCircuitos: Circuito[] = [];
  private listaCarreras: Carrera[] = [];
  private listaScuderias: Scuderia[] = [];
  private carrerasTerminadas: number = 0;

  constructor(nombre: string) {
    this.nombre = nombre;
  }

  presentarCampeonato(): void {
    console.info(`¡Sean todos bienvenidos a este nuevo campeonato ${this.nombre}!`);
  }

  crearCircuito(indice: number, nombre: string, pais: string, kilometros: number): void {
    const existe: Circuito | undefined = this.listaCircuitos.find(
      (c: Circuito) => c.indice === indice
    );
    if (existe !== undefined) {
      console.warn(`El circuito con índice ${indice} ya existe`);
      return;
    }
    this.listaCircuitos.push({ indice, nombre, pais, kilometros });
  }

  mostrarCircuitos(): void {
    console.info("Esta es la lista de Circuitos disponibles para este año:");
    for (const circuito of this.listaCircuitos) {
      console.info(
        `Circuito: ${circuito.nombre} - País: ${circuito.pais} - Km: ${circuito.kilometros}`
      );
    }
  }

  crearCarreras(indice: number, fecha: string): void {
    const circuito: Circuito | undefined = this.listaCircuitos[indice];
    if (circuito === undefined) {
      console.warn("El circuito seleccionado no existe");
      return;
    }
    this.listaCarreras.push({ circuito, fecha });
  }

  mostrarCarreras(): void {
    console.info("\nEstas son las carreras para este año:");
    this.listaCarreras.forEach((carrera: Carrera, i: number): void => {
      console.info(
        `${i + 1}: ${carrera.circuito.nombre} - (${carrera.circuito.pais}) - (${carrera.fecha})`
      );
    });
  }

  crearScuderia(nombreScuderia: string): void {
    this.listaScuderias.push({ nombreScuderia, pilotos: [], autos: [] });
  }

  ficharPilotos(nombreScuderia: string, piloto: string, puntos: number = 0): void {
    const scuderia: Scuderia | undefined = this.listaScuderias.find(
      (s: Scuderia) => s.nombreScuderia === nombreScuderia
    );
    if (scuderia === undefined) {
      console.warn(`No existe la Scudería ${nombreScuderia}`);
      return;
    }
    if (scuderia.pilotos.length >= 2) {
      console.warn(`${nombreScuderia} ya tiene sus 2 pilotos.`);
      return;
    }
    scuderia.pilotos.push({ nombre: piloto, puntos });
  }

  ficharAutos(nombreScuderia: string, auto: string): void {
    const scuderia: Scuderia | undefined = this.listaScuderias.find(
      (s: Scuderia) => s.nombreScuderia === nombreScuderia
    );
    if (scuderia === undefined) {
      console.warn(`No existe la scudería ${nombreScuderia}`);
      return;
    }
    scuderia.autos.push(auto);
  }

  mostrarScuderias(): void {
    console.info("\nEstas son las Scuderias de este año:");
    for (const scuderia of this.listaScuderias) {
      console.info(`\n➡️ ${scuderia.nombreScuderia}`);
      if (scuderia.pilotos.length > 0) {
        console.info("Pilotos:");
        for (const piloto of scuderia.pilotos) {
          console.info(`  Nombre: ${piloto.nombre} | Puntos: ${piloto.puntos}`);
        }
      } else {
        console.info("(Sin pilotos aún)");
      }
      if (scuderia.autos.length > 0) {
        console.info("Autos:", scuderia.autos.join(", "));
      } else {
        console.info("(Sin autos aún)");
      }
    }
  }

  correrCarrera(indice: number): void {
    const carrera: Carrera | undefined = this.listaCarreras[indice];
    if (carrera === undefined) {
      console.warn(`La carrera ${indice} no existe.`);
      return;
    }

    console.info(
      `\n🏁 Carrera en ${carrera.circuito.nombre} (${carrera.circuito.pais}) - ${carrera.fecha}`
    );

    // Recopilamos todos los pilotos con referencia a su scudería
    interface PilotoCarrera {
      nombre: string;
      puntos: number;
      scuderia: string;
    }

    const pilotos: PilotoCarrera[] = [];
    for (const scuderia of this.listaScuderias) {
      for (const piloto of scuderia.pilotos) {
        pilotos.push({
          nombre: piloto.nombre,
          puntos: piloto.puntos,
          scuderia: scuderia.nombreScuderia,
        });
      }
    }

    // Fisher-Yates shuffle — orden aleatorio de largada
    for (let i: number = pilotos.length - 1; i > 0; i--) {
      const j: number = Math.floor(Math.random() * (i + 1));
      [pilotos[i], pilotos[j]] = [pilotos[j], pilotos[i]];
    }

    // Asignar puntos y actualizar referencias
    for (let i: number = 0; i < pilotos.length; i++) {
      const puntosGanados: number = PUNTOS_FIA[i] ?? 0;
      pilotos[i].puntos += puntosGanados;

      // Actualizar en la scudería original
      const scuderia: Scuderia | undefined = this.listaScuderias.find(
        (s: Scuderia) => s.nombreScuderia === pilotos[i].scuderia
      );
      if (scuderia !== undefined) {
        const pilotoRef: Piloto | undefined = scuderia.pilotos.find(
          (p: Piloto) => p.nombre === pilotos[i].nombre
        );
        if (pilotoRef !== undefined) {
          pilotoRef.puntos = pilotos[i].puntos;
        }
      }

      console.info(
        `${i + 1}° ${pilotos[i].nombre} (${pilotos[i].scuderia}) +${puntosGanados}Pts`
      );
    }

    this.carrerasTerminadas++;
    console.info(`\nCarrera completada ✅ | Total terminadas: ${this.carrerasTerminadas}`);
  }

  mostrarClasificacion(): void {
    console.info(`\n📊 Clasificación General - ${this.nombre}`);

    const todosPilotos: Array<{ nombre: string; puntos: number; scuderia: string }> = [];

    for (const scuderia of this.listaScuderias) {
      for (const piloto of scuderia.pilotos) {
        todosPilotos.push({
          nombre: piloto.nombre,
          puntos: piloto.puntos,
          scuderia: scuderia.nombreScuderia,
        });
      }
    }

    todosPilotos.sort((a, b) => b.puntos - a.puntos);

    todosPilotos.forEach((piloto, index: number): void => {
      console.info(`${index + 1}. ${piloto.nombre} (${piloto.scuderia}) - ${piloto.puntos} pts`);
    });
  }
}

// ===========================
// USO DEL CAMPEONATO
// ===========================

const F12025 = new Campeonato("Formula 1 2025");
F12025.presentarCampeonato();

F12025.crearCircuito(0, "Circuit de Monaco", "Mónaco", 3337);
F12025.crearCircuito(1, "Autodromo Nazionale di Monza", "Italia", 5793);
F12025.crearCircuito(2, "Silverstone Circuit", "Reino Unido", 5891);
F12025.crearCircuito(3, "Spa-Francorchamps", "Bélgica", 7004);
F12025.crearCircuito(4, "Suzuka International Racing Course", "Japón", 5807);
F12025.crearCircuito(5, "Autódromo José Carlos Pace (Interlagos)", "Brasil", 4309);
F12025.crearCircuito(6, "Circuit Gilles Villeneuve", "Canadá", 4361);
F12025.crearCircuito(7, "Nürburgring", "Alemania", 5148);
F12025.crearCircuito(8, "Hungaroring", "Hungría", 4381);
F12025.crearCircuito(9, "Autodromo Enzo e Dino Ferrari (Imola)", "Italia", 4909);
F12025.crearCircuito(10, "Circuit de Barcelona-Catalunya", "España", 4675);
F12025.crearCircuito(11, "Yas Marina Circuit", "Emiratos Árabes Unidos", 5281);
F12025.crearCircuito(12, "Red Bull Ring", "Austria", 4326);
F12025.crearCircuito(13, "Circuit of the Americas", "Estados Unidos", 5513);
F12025.crearCircuito(14, "Albert Park Circuit", "Australia", 5303);
F12025.crearCircuito(15, "Bahrain International Circuit", "Baréin", 5412);

F12025.mostrarCircuitos();

F12025.crearCarreras(0, "30/09/2025");
F12025.crearCarreras(1, "30/10/2025");
F12025.crearCarreras(2, "30/11/2025");
F12025.crearCarreras(3, "30/12/2025");
F12025.crearCarreras(4, "30/01/2026");

F12025.mostrarCarreras();

F12025.crearScuderia("Ferrari");
F12025.crearScuderia("Red Bull Racing");
F12025.crearScuderia("McLaren");
F12025.crearScuderia("Mercedes");

F12025.ficharPilotos("Ferrari", "Charles Leclerc");
F12025.ficharPilotos("Ferrari", "Lewis Hamilton");
F12025.ficharPilotos("Red Bull Racing", "Max Verstappen");
F12025.ficharPilotos("Red Bull Racing", "Sergio Perez");
F12025.ficharPilotos("McLaren", "Lando Norris");
F12025.ficharPilotos("McLaren", "Oscar Piastri");
F12025.ficharPilotos("Mercedes", "George Russell");
F12025.ficharPilotos("Mercedes", "Andrea Kimi Antonelli");

F12025.mostrarScuderias();

F12025.correrCarrera(0);
F12025.correrCarrera(1);
F12025.correrCarrera(2);

F12025.mostrarClasificacion();
