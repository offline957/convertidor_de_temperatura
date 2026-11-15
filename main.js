"use strict";
//referencias de los elmentos del DOM
const temperaturas = {
  celsius: document.getElementById("celsius"),
  fahrenheit: document.getElementById("fahrenheit"),
  kelvin: document.getElementById("kelvin"),
}

// Convierte un valor a Celsius, independientemente
// de la unidad de entrada.
const degresConverterToCelsius = (valor, unidad)=>{
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
const handlerDegressValidator = () => {
  return { 
    inputValidator: async ({valorTexto, valor}, unidadOrigen) => {
      if (valorTexto == ""){
        limpiarResultados(unidadOrigen);
        //TODO: this validation should be toss in the browser side as well
        throw new Error("Wrong ingress value");
      }
      if (!Number.isFinite(valor)) {
        //TODO: this validation should be toss in the browser side as well
        limpiarResultados(unidadOrigen);
        throw new Error("Wrong ingress value");
      }
    },
    degresValidator: async (convertedDegres, unidadOrigen) => {
    //TODO: this validation should be toss in the browser side as well
    if (convertedDegres < -273.15){
      limpiarResultados(unidadOrigen);
      throw new Error("Wrong ingress value");
    }
    }
  }
}

const htmlInputWriter = (resultados, unidadOrigen) => {
  Object.entries(temperaturas).forEach(([unidad, elemento])=> {
    if (unidad !== unidadOrigen){
      elemento.value = formatear(resultados[unidad]);
    }
  });
} 
// Maneja los eventos de los campos.
const degresConverterHandler = async (e) =>{
  try {
  const validators = handlerDegressValidator()
  const unidadOrigen = e.target.id;
  const valorTexto = e.target.value.trim();
  const valor = Number(valorTexto);
  await validators.inputValidator({valor, valorTexto}, unidadOrigen)

  const celsiusValue = degresConverterToCelsius(valor, unidadOrigen);
  await validators.degresValidator(celsiusValue, unidadOrigen)

  const resultados = convertirTemperatura(celsiusValue);
  htmlInputWriter(resultados, unidadOrigen)
  } catch (error) {
    console.log("handler error", error)
  }
};

// Registramos los eventos.
Object.values(temperaturas).forEach((elemento) =>{
  elemento.addEventListener("input", degresConverterHandler)
});
