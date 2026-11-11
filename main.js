const imprimirDatos = (e) => {
  if (!e.target.value || isNaN(e.target.value)) return false;
  const [vc, vf, vk] = convertir(e);
  celcius.value = vc;
  fahrenheit.value = vf;
  kelvin.value = vk;

};
const convertir = (e) => {
var valor = parseInt(e.target.value);

  if (e.target.id === "celcius") {
    let valorFarenheit = valor * 1.8 + 32,
    valorKelvin = valor + 273.15;
    return [valor, valorFarenheit.toFixed(3).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/,'$1') ,valorKelvin.toFixed(3).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/,'$1')];
  }
  if (e.target.id === "fahrenheit") {

    let valorCelcius = (valor - 32) / 1.8,
        valorKelvin = ((valor - 32) * 5) / 9 + 273.15;

    return [valorCelcius.toFixed(3).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/,'$1'), valor, valorKelvin.toFixed(3).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/,'$1')];
  }

  if (e.target.id === "kelvin") {
    let valorCelcius = valor - 273.15,
    valorFarenheit = ((valor - 273.15) * 9) / 5 + 32;

    return [valorCelcius.toFixed(3).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/,'$1'), valorFarenheit.toFixed(3).replace(/([0-9]+(\.[0-9]+[1-9])?)(\.?0+$)/,'$1'), valor];
  }
};

let celcius = document.getElementById("celcius");
let fahrenheit = document.getElementById("fahrenheit");
let kelvin = document.getElementById("kelvin");
celcius.addEventListener("keyup", imprimirDatos);
fahrenheit.addEventListener("keyup", imprimirDatos);
kelvin.addEventListener("keyup", imprimirDatos);
