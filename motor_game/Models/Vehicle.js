export class Vehicle {
    constructor(modelo, traccion, velMin, velMax) {
      this.modelo = modelo;
      this.traccion = traccion;
      this.velMin = velMin;
      this.velMax = velMax;
    }
  
    calcularAvance(tiempo) {
      throw new Error("To override");
    }
  }
  