let latitudeUsuario = 0
let longitudeUsuario = 0
let dataWeather = []

/* Geolocation API */

function pedirLocalizacao() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(mostrarlocalizacao);
  } else {
    console.log("Geolocation is not supported by this browser.");
  }
}

function mostrarlocalizacao(position) {
  latitudeUsuario = position.coords.latitude
  longitudeUsuario = position.coords.longitude
  console.log("LatitudeUser: " + latitudeUsuario)
  console.log("LongitudeUser: " + longitudeUsuario)
  let LINK_API = `https://api.openweathermap.org/data/2.5/weather?lat=${latitudeUsuario}&lon=${longitudeUsuario}&units=metric&lang=pt_br&appid=313e9589d80e64758e636be87b5ab8dc`
  let promise = axios.get(LINK_API)
  promise.then(carregarData)
  promise.catch(tratarErro)

}

function carregarData(resposta) {
  dataWeather = resposta.data
  console.log(dataWeather)
  receberTemperatura(dataWeather)
  receberTempo(dataWeather)
  receberCidade(dataWeather)
  receberVento(dataWeather)
}


/ Weather API /
function receberCidade(resposta){
    let cidade = resposta.name;
    console.log('cidade é: '+cidade);
}



function receberTempo(resposta) {
  let tempo = resposta.weather[0];
  console.log('O tempo está: ' + tempo.description);
}


function receberVento(resposta){
    let Direcaovento = resposta.wind.deg;
    console.log('Direcão do vento é: '+Direcaovento);
}

function receberTemperatura(resposta) {
  let temperatura = resposta.main.temp;
  let umidade = resposta.main.humidity;
  console.log('temperatura é: ' + temperatura+ '°C');
  console.log('umidade é: ' + umidade);

}

function tratarErro(erro) {
  console.log("Status Code: " + erro.response.status);
  console.log("Mensagem de erro: " + erro.response.data);
}


/* Chama Funções */

pedirLocalizacao()
mostrarlocalizacao()