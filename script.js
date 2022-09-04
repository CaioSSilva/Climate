const API_KEY = "4d8fb5b93d4af21d66a2948710284366"

const placeInput = document.getElementById('placeName')
const results = document.getElementById('results')
const starter = document.getElementById('starter')

 async function getData(){
    results.style.display = "none"
    let inputValue = placeInput.value
    const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${API_KEY}&units=metric&lang=pt_br`

    fetch(BASE_URL)
    .then((promise) => promise.json())
    .then(data => {
        console.log(data)
        let clima = data.weather.map(clima => clima.description)
        let iconNumber = data.weather[0].icon
        let temp = data.main.temp
        let temp_min = data.main.temp_min
        let temp_max = data.main.temp_max
        let feelslike = data.main.feels_like
        let humidity = data.main.humidity
        let pressure = data.main.pressure
        let clouds = data.clouds.all
        let long = data.coord.lon
        let lat = data.coord.lat
        let iconPath = `https://openweathermap.org/img/wn/${iconNumber}@4x.png`
        starter.style.height = '30vh'
        results.style.display = "flex"
        results.innerHTML = `
        <div class="title">
            <button id="backButton" onClick="hidepanel()"><img src="./assets/left-arrow.png"/></button>
            <div>
                <h1>${data.name}</h1>
            </div>
        </div>
        <div class="info-container">
            <div>
                <img src=${iconPath} />
                <p>${clima}</p>
            </div>
            <div>
                <h3>Localização</h3>
                <p>Longitude: ${long}</p>
                <p>Latitude: ${lat}</p>
            </div>
            <div>
                <h3>Clima</h3>
                <p>Sensação Térmica: ${feelslike} ºC</p>
                <p>Temperatura: ${temp} ºC</p>
                <p>Temperatura-Máxima: ${temp_max} ºC</p>
                <p>Temperatura-Mínima: ${temp_min} ºC</p>
                <p>Nuvens: ${clouds}%</p>
                <p>Umidade: ${humidity}%</p>
                <p>Pressão: ${pressure} hPa</p>
            </div>
        </div>`
    })
    .catch((e) => {
        starter.style.height = '30vh'
        results.style.display = "flex"
        results.innerHTML = `
        <div>
            <img id="error-img" src="https://cdn-icons-png.flaticon.com/512/753/753345.png" width:50px/>
        </div>
        <div>
            <h1>Localização não encontrada!</h1>
            <p>Tente novamente...</p>
        </div>`

    })
}
window.addEventListener('keyup', (e)=>{
    if (e.key === "Enter") {
        getData()
    }
})
function hidepanel(){
    results.style.display = "none"
}