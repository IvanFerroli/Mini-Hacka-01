let latitudeUsuario = 0
let longitudeUsuario = 0
let dataWeather = []
let cidade = ""
let tempo = ""
let direcaoVento = ""
let temperatura = ""
let umidade = ""
let imagemTempo;

function startApp() {
    pedirLocalizacao();
    mostrarlocalizacao();
}
startApp();

/* Geolocation API */

function pedirLocalizacao() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(mostrarlocalizacao);
    } else {
        console.log("Geolocation não funciona no seu navegador");
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


/* Weather API */

function carregarData(resposta) {
    dataWeather = resposta.data
    console.log(dataWeather)
    receberTemperatura(dataWeather)
    receberTempo(dataWeather)
    receberCidade(dataWeather)
    receberVento(dataWeather)
    renderizarCidade(cidade, temperatura, tempo, velocidadeVento, imagemTempo)
}

function receberCidade(resposta) {
    cidade = resposta.name;
    console.log('cidade é: ' + cidade);
}

function receberTempo(resposta) {
    tempo = resposta.weather[0].description;
    imagemTempo = resposta.weather[0].icon;
    console.log('O tempo está: ' + tempo);
    console.log('icone: ' + imagemTempo);
}


function receberVento(resposta) {
    velocidadeVento = (resposta.wind.speed * 3.6).toFixed(1)
    direcaoVento = resposta.wind.deg;
    console.log('Velocidade do vento é: ' + velocidadeVento);
    console.log('Direcão do vento é: ' + direcaoVento);
}

function receberTemperatura(resposta) {
    temperatura = resposta.main.temp;
    umidade = resposta.main.humidity;
    console.log('temperatura é: ' + temperatura + '°C');
    console.log('umidade é: ' + umidade);
}

function tratarErro(erro) {
    console.log("Status Code: " + erro.response.status);
    console.log("Mensagem de erro: " + erro.response.data);
}




function renderizarCidade(cidadeNome, valorTemperatura, tempo, ventoVelocidade, imagem) {
    document.querySelector('.city-name').innerText = cidadeNome;
    document.querySelector('.city-temperature').innerText = valorTemperatura.toFixed()
    document.querySelector('.city-sky').innerText = tempo;
    document.querySelector('.city-wind').innerText = `Vento: ${ventoVelocidade} km/h`;
    document.querySelector('.weather-information img').setAttribute('src', `http://openweathermap.org/img/wn/${imagem}.png`);

}

function toggleHidden() {
    mainToggle = document.querySelector("main");
    asideToggle = document.querySelector("aside");
    mainToggle.classList.toggle("hidden");
    asideToggle.classList.toggle("hidden");
} 
startApp();