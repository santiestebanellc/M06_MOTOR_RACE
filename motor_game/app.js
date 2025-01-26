// Importar módulos
import { Track } from "./Models/Track.js";
import { Participant } from "./Models/Participant.js";
import { Vehicle } from "./Models/Vehicle.js";
import { Motorcycle } from "./Models/Motorcycle.js";
import { Car } from "./Models/Car.js";

// Estado global
const tracks = [];
const participants = [];
const vehicles = [];

// Elementos del DOM
const elementos = {
  guardarParticipantBtn: document.getElementById("guardar-participante"),
  cargarEstadisticasParticipantBtn: document.getElementById("cargar-estadisticas-participante"),
  nuevoVehicleBtn: document.getElementById("nuevo-vehiculo"),
  cargarEstadisticasVehicleBtn: document.getElementById("cargar-estadisticas-vehiculo"),
  newRaceBtn: document.getElementById("nueva-carrera"),
  asignarParticipantBtn: document.getElementById("asignar-participante"),
  quitarParticipantBtn: document.getElementById("quitar-participante"),
  startRaceBtn: document.getElementById("start-carrera"),
  participanteNombreInput: document.querySelector("input[list='participants-list']"),
  vehiculoNombreInput: document.querySelector("input[list='vehicles-list']"),
  modeloVehicleInput: document.getElementById("modelo-input"),
  minSpeedInput: document.getElementById("min-vel"),
  maxSpeedInput: document.getElementById("max-vel"),
  tractionTypeSelect: document.querySelector("select"),
  tipoVehicleSelect: document.getElementById("tipo-vehiculo"),
  nombreTrackInput: document.getElementById("nombre-circuito"),
  longitudTrackInput: document.getElementById("longitud-circuito"),
  tiempoTrackSelect: document.getElementById("tiempo-circuito"),
  tracksList: document.getElementById("tracks-list"),
  participantsList: document.getElementById("participants-list2"),
  tracksListQuitar: document.getElementById("tracks-list-quitar"),
  participantsListQuitar: document.getElementById("participants-list-quitar"),
};

// Inicialización
window.addEventListener("DOMContentLoaded", () => {
  actualizarListas();
  configurarEventos();
});

// Actualizar elementos dinámicos
function actualizarListas() {
  actualizarDatalist("participants-list", participants.map(p => p.nombre));
  actualizarDatalist("vehicles-list", vehicles.map(v => v.modelo));
  actualizarSelect(elementos.tracksList, tracks.map(c => c.nombre));
  actualizarSelect(elementos.tracksListQuitar, tracks.map(c => c.nombre));
  actualizarSelect(elementos.participantsList, participants.map(p => p.nombre));
  actualizarSelect(elementos.participantsListQuitar, participants.map(p => p.nombre));
}

function actualizarDatalist(id, items) {
  const datalist = document.getElementById(id);
  if (!datalist) return;
  datalist.innerHTML = items.map(item => `<option value="${item}"></option>`).join("");
}

function actualizarSelect(selectElement, items) {
  if (!selectElement) return;
  selectElement.innerHTML = items.map(item => `<option value="${item}">${item}</option>`).join("");
}

// Gestión de eventos
function configurarEventos() {
  elementos.guardarParticipantBtn.addEventListener("click", guardarParticipant);
  elementos.nuevoVehicleBtn.addEventListener("click", crearVehicle);
  elementos.newRaceBtn.addEventListener("click", crearTrack);
  elementos.asignarParticipantBtn.addEventListener("click", asignarParticipant);
  elementos.quitarParticipantBtn.addEventListener("click", quitarParticipant);
  elementos.startRaceBtn.addEventListener("click", iniciarCarrera);
  elementos.cargarEstadisticasParticipantBtn.addEventListener("click", mostrarEstadisticasParticipant);
  elementos.cargarEstadisticasVehicleBtn.addEventListener("click", mostrarEstadisticasVehicle);
}

function guardarParticipant() {
  const nombre = elementos.participanteNombreInput.value;
  const vehiculoModelo = elementos.vehiculoNombreInput.value;
  const vehiculo = vehicles.find(v => v.modelo === vehiculoModelo);

  if (!nombre || !vehiculo) {
    alert("Datos incompletos o vehículo no encontrado.");
    return;
  }

  participants.push(new Participant(nombre, vehiculo));
  actualizarListas();
  alert(`Participant '${nombre}' guardado.`);
}

function crearVehicle() {
  const { modeloVehicleInput, minSpeedInput, maxSpeedInput, tractionTypeSelect, tipoVehicleSelect } = elementos;
  const modelo = modeloVehicleInput.value;
  const minVel = parseInt(minSpeedInput.value);
  const maxVel = parseInt(maxSpeedInput.value);
  const traccion = tractionTypeSelect.value;
  const tipoVehicle = tipoVehicleSelect.value;

  if (!modelo || isNaN(minVel) || isNaN(maxVel)) {
    alert("Por favor, completa todos los campos del vehículo.");
    return;
  }

  const nuevoVehicle = tipoVehicle === "Motorcycle"
    ? new Motorcycle(modelo, traccion, minVel, maxVel)
    : new Car(modelo, traccion, minVel, maxVel);

  vehicles.push(nuevoVehicle);
  actualizarListas();
  alert(`Vehículo '${modelo}' creado.`);
}

function crearTrack() {
  const { nombreTrackInput, longitudTrackInput, tiempoTrackSelect } = elementos;
  const nombre = nombreTrackInput.value;
  const longitud = parseInt(longitudTrackInput.value);
  const tiempo = tiempoTrackSelect.value;

  if (!nombre || isNaN(longitud)) {
    alert("Datos incompletos para el circuito.");
    return;
  }

  tracks.push(new Track(nombre, longitud, tiempo));
  actualizarListas();
  alert(`Track '${nombre}' creado.`);
}

function asignarParticipant() {
  const circuito = tracks.find(c => c.nombre === elementos.tracksList.value);
  const participante = participants.find(p => p.nombre === elementos.participantsList.value);

  if (!circuito || !participante) {
    alert("Datos incorrectos.");
    return;
  }

  circuito.agregarParticipant(participante);
  alert(`Participant '${participante.nombre}' asignado al circuito '${circuito.nombre}'.`);
}

function quitarParticipant() {
  const circuito = tracks.find(c => c.nombre === elementos.tracksListQuitar.value);
  const participante = participants.find(p => p.nombre === elementos.participantsListQuitar.value);

  if (!circuito || !participante) {
    alert("Datos incorrectos.");
    return;
  }

  circuito.quitarParticipant(participante);
  actualizarListas();
  alert(`Participant '${participante.nombre}' eliminado del circuito '${circuito.nombre}'.`);
}

function iniciarCarrera() {
  const circuito = tracks.find(c => c.nombre === elementos.tracksList.value);
  if (!circuito) {
    alert("Selecciona un circuito.");
    return;
  }

  simularCarrera(circuito, mostrarAvanceCarrera, mostrarPodioEnPantalla);
}

// Mostrar estadísticas
function mostrarEstadisticasParticipant() {
  const nombre = elementos.participanteNombreInput.value;
  const participante = participants.find(p => p.nombre === nombre);

  if (!participante) {
    alert("Participant no encontrado.");
    return;
  }

  const { primero, segundo, tercero, fuera } = participante.podio;
  alert(`Estadísticas de ${nombre}:
Primer lugar: ${primero}
Segundo lugar: ${segundo}
Tercer lugar: ${tercero}
Fuera de podio: ${fuera}`);
}

function mostrarEstadisticasVehicle() {
  const modelo = elementos.vehiculoNombreInput.value;
  const vehiculo = vehicles.find(v => v.modelo === modelo);

  if (!vehiculo) {
    alert("Vehículo no encontrado.");
    return;
  }

  const participantsConVehicle = participants.filter(p => p.vehiculo === vehiculo);
  alert(`Vehículo: ${modelo}
Usado por ${participantsConVehicle.length} participante(s).`);
}

// Simulación de la carrera
function simularCarrera(circuito, callbackAvance, callbackPodio) {
  let posiciones = circuito.participants.map(p => ({ participante: p, distancia: 0 }));

  const intervalo = setInterval(() => {
    posiciones.forEach(pos => pos.distancia += pos.participante.vehiculo.calcularAvance(circuito.tiempo));

    callbackAvance(posiciones, circuito);

    if (posiciones.every(pos => pos.distancia >= circuito.longitud)) {
      clearInterval(intervalo);
      posiciones.sort((a, b) => b.distancia - a.distancia);
      posiciones.forEach((pos, index) => pos.participante.actualizarPodio(index + 1));
      callbackPodio(posiciones);
    }
  }, 500);
}

function mostrarAvanceCarrera(posiciones, circuito) {
  const contenedorCarrera = document.getElementById("race");
  contenedorCarrera.innerHTML = posiciones.map(pos => `
    <div>
      <span>${pos.participante.nombre}</span>
      <div style="width: ${(pos.distancia / circuito.longitud) * 100}%; background: #28a745; height: 10px;"></div>
    </div>
  `).join("");
}

function mostrarPodioEnPantalla(posiciones) {
  const podioSection = document.getElementById("podio-output");
  podioSection.innerHTML = posiciones.slice(0, 3).map((pos, i) => `
    <p>${i + 1}º: ${pos.participante.nombre}</p>
  `).join("");
}
