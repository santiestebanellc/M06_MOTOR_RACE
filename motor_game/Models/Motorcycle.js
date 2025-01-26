import { Vehicle } from "./Vehicle.js";

export class Motorcycle extends Vehicle {
  constructor(modelo, traccion, velMin, velMax) {
    super(modelo, traccion, velMin, velMax);
    this.movimientosRestantes = 0;
  }

  calcularAvance(tiempo) {
    if (this.movimientosRestantes > 0) {
      this.movimientosRestantes--;
      return 0;
    }

    const modificador = this.obtenerModificador();
    const avance = this.calcularVelocidadBase() + modificador;

    if (this.verificarCaida(tiempo)) {
      this.movimientosRestantes = 5;
      return 0;
    }

    return avance;
  }

  obtenerModificador() {
    return this.traccion === "dura" ? 5 : this.traccion === "mediana" ? 2 : 0;
  }

  calcularVelocidadBase() {
    return Math.random() * (this.velMax - this.velMin) + this.velMin;
  }

  verificarCaida(tiempo) {
    const probabilidad = this.calcularProbabilidadCaida(tiempo);
    return Math.random() * 100 < probabilidad;
  }

  calcularProbabilidadCaida(tiempo) {
    if (tiempo === "lluvioso" && this.traccion === "dura") return 30;
    if (tiempo === "húmedo" && this.traccion === "dura") return 20;
    if (tiempo === "lluvioso" && this.traccion === "mediana") return 20;
    if (tiempo === "húmedo" && this.traccion === "mediana") return 10;
    return 5;
  }
}
