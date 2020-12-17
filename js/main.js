/** TO DO
 * -crear funcion que tome la ubicacion del cliente
 * si no esta disponible, colocar una ubicacion aleatoria
 * 
 * -implementar autocompletado predictivo de ciudades
 * 
 * -implementar ligth/dark mode
 */ 



/* MI API

const api = {
    key: 'fc56858acc8d7a3be4849d5896038f853',
    url: `https://api.openweathermap.org/data/2.5/weather`
}*/

// API DE TERCEROS
const api = {
    key: '9e122cd782b2d0333f5fe4e7fa192062',
    url: `https://api.openweathermap.org/data/2.5/weather`
}

//VARIABLES----------------------------------------------

const tarjeta = document.getElementById('tarjeta')
const ciudad = document.getElementById('ciudad');
const  fecha= document.getElementById('fecha');
const  tempImg= document.getElementById('temp-img');
const  temp= document.getElementById('temp');
const  clima= document.getElementById('clima');
const  rango= document.getElementById('rango');
const  searchform = document.getElementById('busqueda-form');
const  searchbox= document.getElementById('busqueda-input');



//FUNCIONES----------------------------------------------

function updateImage(data){
    const temp = toCelcius(data.main.temp)
    let src= '../dev/assets/media/img/003.png'
    if (temp >= 20 && temp < 30) {
        src = 'assets/media/img/002.png'
    } else if (temp >= 8 && temp < 20){
        src = '../dev/assets/media/img/001.png'
    } else if(temp < 8){
        src= '../dev/assets/media/img/000.png'
    }
    tempImg.src = src
}


async function search(query){
    try {
        const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`)
        const data = await response.json();

        tarjeta.style.display="block";
        ciudad.innerHTML = `${data.name}, ${data.sys.country}`
        fecha.innerHTML = (new Date()).toLocaleDateString();
        temp.innerHTML = toCelcius(data.main.temp)+"°C";
        clima.innerHTML = data.weather[0].description;
        rango.innerHTML = `${toCelcius(data.main.temp_min)}°C / ${toCelcius(data.main.temp_max)}°C`

        updateImage(data);

    } catch(err){
        console.log(err)
        alert("Hubo un error")
    }
} 


function toCelcius(kelvin){
    return Math.round(kelvin - 273.15)
}


function onSubmit(event){
    event.preventDefault()
    search(searchbox.value)
}


searchform.addEventListener('submit', onSubmit, true );