export class Track {
  constructor(nombre, longitud, tiempo) {
    this.nombre = nombre;
    this.longitud = longitud;
    this.tiempo = tiempo;
    this.participants = [];
  }

  agregarParticipant(participante) {
    this.participants.push(participante);
  }

  quitarParticipant(participante) {
    const index = this.buscarIndexParticipant(participante);
    if (index !== -1) {
      this.participants.splice(index, 1);
    }
  }

  buscarIndexParticipant(participante) {
    return this.participants.indexOf(participante);
  }
}

  