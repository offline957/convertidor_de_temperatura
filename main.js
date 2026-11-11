"use strict";
//referencias de los elmentos del DOM
const temperaturas = {
  celsius: document.getElementById("celsius"),
  fahrenheit: document.getElementById("fahrenheit"),
  kelvin: document.getElementById("kelvin"),
}

// Convierte un valor a Celsius, independientemente
// de la unidad de entrada.
const convertirACelsius = (valor, unidad)=>{
  switch(unidad){
    case "celsius":
      return valor; 
    case "fahrenheit":
      return (valor - 32) * 5/9;
    case "kelvin":
      return valor - 273.15;

    default:
      throw new Error("Unidad de temperatura no válida"); 
  }

};
// Convierte Celsius a las tres unidades.

const convertirTemperatura = (celsius) => {
  return{
    celsius,
    fahrenheit: (celsius * 9 / 5) + 32,
    kelvin: celsius + 273.15,

  };
};
const formatear = (valor) => {
// Redondeamos a 3 decimales y eliminamos ceros innecesarios.
  return Number(valor.toFixed(3)).toString();
};
const limpiarResultados = (unidadOrigen) => {
  Object.entries(temperaturas).forEach(([unidad, elemento]) => {
    if (unidad !== unidadOrigen){
      elemento.value = "";
    }
  });
};
// Maneja los eventos de los campos.
const actualizarTemperaturas = (e) =>{
  const unidadOrigen = e.target.id;
  const valorTexto = e.target.value.trim();
  // Evitamos procesar campos vacíos.
if (valorTexto == ""){
  return;
}

const valor = Number(valorTexto);

  // Validamos que sea un número válido.
if (!Number.isFinite(valor)) {
  limpiarResultados(unidadOrigen);
  return;
}
  // Convertimos primero a Celsius.
const valorCelsius = convertirACelsius(valor, unidadOrigen);
  // El cero absoluto es -273.15 °C.
if (valorCelsius < -273.15){
  limpiarResultados(unidadOrigen);
  return;
}
  // Calculamos las tres temperaturas.
const resultados = convertirTemperatura(valorCelsius);

  // Actualizamos los campos, respetando el campo de origen.
Object.entries(temperaturas).forEach(([unidad, elemento])=> {
  if (unidad !== unidadOrigen){
    elemento.value = formatear(resultados[unidad]);
  }
});
};
// Registramos los eventos.
Object.values(temperaturas).forEach((elemento) =>{
  elemento.addEventListener("input", actualizarTemperaturas)
});
