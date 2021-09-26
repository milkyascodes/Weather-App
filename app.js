const city=document.querySelector('#cityName')

// get elements
const weatherDeg=document.querySelector('#weatherDeg')
const tempDeg=document.querySelector('#tempDeg')
const humidDeg=document.querySelector('#humidDeg')
const weatherLocation=document.querySelector('#location')
const description=document.querySelector('#description')
const weatherIcon=document.querySelector('#weatherIcon')

const infoText=document.querySelector('.info-txt')
const backBtn=document.querySelector('#backBtn')
const weatherBtn=document.querySelector('#weatherBtn')


//  api
const api = {
    key :'e46a6552fc54b7272c672b6f1199e7e6',
    url:'https://api.openweathermap.org/data/2.5/',
    units:'metric'
}

// click events
weatherBtn.addEventListener('click', ()=>{
    validateInput()
})

city.addEventListener('keypress', (e)=>{
    if(e.keyCode === 13){
        validateInput()
    }
    
})
// check for input
function validateInput(){
    if( city.value.trim() !== ''){
        displayWeather() 
    }else{
        errorTxt()
    }
}

// fetch
function displayWeather(){

    fetch(`${api.url}weather?q=${city.value}&units=${api.units}&APPID=${api.key}`)
    .then((weather) => weather.json())
    .then(fillValues)
    .then(showWeather)
}

function fillValues(weather){
    if(`${weather.cod}` !=='200'){
       errorTxt()
       showMenu()
    }
   
    
    
    weatherLocation.textContent = `${weather.name}, ${weather.sys.country}`
    description.textContent = `${weather.weather[0].description}`
    weatherDeg.textContent = Math.floor(`${weather.main.temp}`)
    tempDeg.textContent = Math.floor(`${weather.main.feels_like}`)
    humidDeg.textContent = Math.floor(`${weather.main.humidity}`)
    const icon = `${weather.weather[0].main}`


    if(`${weather.sys.country}` === 'US'){
        weatherDeg.innerHTML = Math.floor((weatherDeg.innerHTML * 1.8) + 32)
        tempDeg.innerHTML = Math.floor((tempDeg.innerHTML * 1.8) + 32)
        textSwich()
        
    }
    function textSwich(){
        document.getElementById('degree').innerText = '°F'
        document.getElementById('degree2').innerText = '°F'
    }
    switch (icon) {
        case 'Clear':
            weatherIcon.setAttribute('src', "/Weather Icons/clear.svg")
            break;
        case 'Clouds':
            weatherIcon.setAttribute('src', "/Weather Icons/cloud.svg")
            break;
        case 'Haze':
            weatherIcon.setAttribute('src', "/Weather Icons/haze.svg")
            break;
        case 'Snow':
            weatherIcon.setAttribute('src', "/Weather Icons/snow.svg")
            break;
        case 'Rain':
            weatherIcon.setAttribute('src', "/Weather Icons/rain.svg")
            break;
        case 'Thunderstorm':
            weatherIcon.setAttribute('src', "/Weather Icons/storm.svg")
            break;
    
        default:
            break;
    }
    
}

// back to input
backBtn.addEventListener('click', ()=>{
    city.value = ''
    removeError()
    showMenu()
    document.getElementById('degree').innerText = '°C'
    document.getElementById('degree2').innerText = '°C'
    
})


// show and hide sections

// display the weather section only
function showWeather(){
    document.querySelector('.wrapper').classList.add('active')
}
// display the input section only
function showMenu(){
    document.querySelector('.wrapper').classList.remove('active')
}
// remove the error
function removeError(){
    infoText.classList.remove('error','pending')
}
function errorTxt(){
    infoText.classList.remove('pending')
    infoText.classList.add('error')
}
function pendingTxt(){
    infoText.classList.remove('error')
    infoText.classList.add('pending')
    infoText.textContent = 'Getting the weather..'
}


// dark mode version

const toggle = document.getElementById('toggle')
let darkmode = localStorage.getItem('darkmode')

function enableDarkmode(){
    document.body.classList.add('darkmode')
    toggle.className = 'bx bx-moon'
    localStorage.setItem('darkmode', 'enabled')
}
function disableDarkmode(){
    document.body.classList.remove('darkmode')
    toggle.className = 'bx bx-sun'
    localStorage.setItem('darkmode', null)
}

darkmode === 'enabled' ? enableDarkmode():disableDarkmode()

toggle.addEventListener('click', ()=>{
    let darkmode = localStorage.getItem('darkmode')
    darkmode !== 'enabled' ? enableDarkmode():disableDarkmode()
})