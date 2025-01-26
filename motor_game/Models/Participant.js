export class Participant {
    constructor(nombre, vehiculo) {
      this.nombre = nombre;
      this.vehiculo = vehiculo;
      this.podio = { primero: 0, segundo: 0, tercero: 0, fuera: 0 };
    }
  
    actualizarPodio(posicion) {
      if (posicion === 1) this.podio.primero++;
      else if (posicion === 2) this.podio.segundo++;
      else if (posicion === 3) this.podio.tercero++;
      else this.podio.fuera++;
    }
  }
  