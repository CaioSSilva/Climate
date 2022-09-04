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
        let temp = Math.round(data.main.temp)
        let temp_min = Math.round(data.main.temp_min)
        let temp_max = Math.round(data.main.temp_max)
        let feelslike = Math.round(data.main.feels_like)
        let humidity = data.main.humidity
        let pressure = data.main.pressure
        let clouds = data.clouds.all
        let long = data.coord.lon
        let lat = data.coord.lat
        let iconPath = `https://openweathermap.org/img/wn/${iconNumber}@2x.png`
        starter.style.height = '50vh'
        results.style.display = "flex"
        results.innerHTML = `
        <div class="title">
            <button id="backButton" onClick="hidepanel()"><img src="./assets/left-arrow.png"/></button>
            <div>
                <h1>${data.name}</h1>
                <p>${clima}</p>
            </div>
        </div>
        <div>
            <div class="info temp">
                <div>
                    <img src=${iconPath} />
                    <div>
                        <h2>${temp}º</h2>
                    </div>
                </div>
                <h3>${temp_min}º/${temp_max}º</h3>
                <p>Sensação: ${feelslike}º</p>
            </div>
            <div class="info atmo">
                <h1>Atmosfera</h1>
                <p>Nuvens: ${clouds}%</p>
                <p>Umidade: ${humidity}%</p>
                <p>Pressão: ${pressure} hPa</p>
            </div>
            <div class="info locate">
                <h1>Localização</h1>
                <p>Longitude: ${long}</p>
                <p>Latitude: ${lat}</p>
            </div>
        </div>
        `
    })
    .catch((e) => {
        starter.style.height = '50vh'
        results.style.display = "flex"
        results.innerHTML = `
        <section>
            <div>
                <img id="error-img" src="https://cdn-icons-png.flaticon.com/512/753/753345.png"/>
            </div>
            <div>
                <h1>Localização não encontrada!</h1>
                <p>Tente novamente...</p>
            </div>
        </section>`

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
function upperphase(e){
    e.map((e) => { 
    return e[0].toUpperCase() + e.substring(1); 
    }).join(" ");
}