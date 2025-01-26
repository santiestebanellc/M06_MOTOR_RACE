import { Vehicle } from "./Vehicle.js";

export class Car extends Vehicle {
  constructor(modelo, traccion, velMin, velMax) {
    super(modelo, traccion, velMin, velMax);
  }

  calcularAvance(tiempo) {
    let modificador = 0;

    switch (tiempo) {
      case "lluvioso":
        if (this.traccion === "blanda") {
          modificador = 4;
        } else if (this.traccion === "mediana") {
          modificador = 2;
        }
        break;

      case "húmedo":
        modificador = 2;
        break;

      case "seco":
        if (this.traccion === "dura") {
          modificador = 4;
        } else if (this.traccion === "mediana") {
          modificador = 2;
        }
        break;

      default:
        modificador = 0;
    }

    const velocidadBase = Math.random() * (this.velMax - this.velMin) + this.velMin;
    return velocidadBase + modificador;
  }
}