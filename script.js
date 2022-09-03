const API_KEY = "4d8fb5b93d4af21d66a2948710284366"

const placeInput = document.getElementById('placeName')
const results = document.getElementById('results')
const starter = document.getElementById('starter')

function getData(){
    results.style.display = "none"
    starter.style.height = '100vh'
    let inputValue = placeInput.value
    const BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&appid=${API_KEY}&units=metric&lang=pt_br`

    try{
        fetch(BASE_URL)
        .then((promise) => promise.json())
        .then(data => {
            let clima = data.weather.map(clima => clima.description)
            let iconNumber = data.weather.map(clima => clima.icon)
            let temp = data.main.temp
            let temp_min = data.main.temp_min
            let temp_max = data.main.temp_max
            let feelslike = data.main.feels_like
            let humidity = data.main.humidity
            let pressure = data.main.pressure
            let iconPath = `https://openweathermap.org/img/wn/${iconNumber}@2x.png`
            starter.style.height = '40vh'
            results.style.display = "flex"
            console.log(data)
            results.innerHTML = `
            <div>
                <img src=${iconPath} />
            </div>
            <div>
                <h1>${data.name}</h1>
                <p>Clima: ${clima}</p>
                <p>Sensação Termica: ${feelslike} ºC</p>
                <p>Temperatura: ${temp} ºC</p>
                <p>Temperatura-Maxima: ${temp_max} ºC</p>
                <p>Temperatura-Minima: ${temp_min} ºC</p>
                <p>Umidade: ${humidity} %</p>
                <p>Pressão: ${pressure} hPa</p>
            </div>`
        })
    }
    catch (e){
        console.log(e.data)
    }
}