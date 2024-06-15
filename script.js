const main = document.getElementById('mainConatiner');
const mainIc = document.getElementById('mainIc');
const latitudeEl = document.getElementById('latitude');
const longitudeEl = document.getElementById('longitude');
const timeEl = document.getElementById('time');
const rainEl = document.getElementById('rain');
const temparetureEl = document.getElementById('tempareture');
const windSpeedEl = document.getElementById('windSpeed');
const isdayEl = document.getElementById('isday');
const precipitationEl = document.getElementById('precipitation');
const cloudEl = document.getElementById('cloud');
const latitudeInputEl = document.getElementById('latitudeInput');
const LongitudeInputEl = document.getElementById('LongitudeInput');
const submitBtn = document.getElementById('submitBtn');


let time = "";
let tempareture = "";
let windSpeed = "";



const getWeatherdata = async function (latitude,logitude){
    let weatherData = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${logitude}&current=temperature_2m,precipitation,rain,cloud_cover,is_day,wind_speed_10m`);
    let response = await weatherData.json();
    console.log(response.latitude,response.longitude,response.current.time,response.current.rain,
    response.current.temperature_2m,response.current.wind_speed_10m,response.current.is_day,
    response.current.precipitation,response.current.cloud_cover)
    console.log(response)
    return response;
   
   
}

async function render(){
    let latitude = latitudeInputEl.value;
    let longitude = LongitudeInputEl.value;
    console.log(latitude,longitude);
   
    if(latitude && longitude){
        const response = await getWeatherdata(latitude, longitude);
        console.log(response);
        latitudeEl.innerText = `Latitude is : ${response.latitude}`;
        longitudeEl.innerText = `Longitude is : ${response.longitude}`;
        timeEl.innerText = response.current.time;
        rainEl.innerText = `Rain : ${response.current.rain}`;
        temparetureEl.innerText = `${response.current.temperature_2m}\u00B0C`;
        windSpeedEl.innerText = `Wind Speed : ${response.current.wind_speed_10m}km/h`;
        precipitationEl.innerText = `Precipitation : ${response.current.precipitation}`;
        cloudEl.innerText = `Cloud : ${response.current.cloud_cover}`;
        
        
        console.log(`main : ${main}`)
        if(response.current.is_day === 1){
           main.style.backgroundImage = `url('day-bg.avif')`;
            isdayEl.innerHTML = `Day<i class='bx bxs-sun'></i>`;
             mainIc.innerHTML = `<i class='bx bxs-sun'></i>`
            
        }else{
            main.style.backgroundImage = `url('night-bg.avif')`;
            isdayEl.innerHTML = `Night<i class='bx bxs-moon'></i>`;
            mainIc.innerHTML = `<i class='bx bxs-moon'></i>`;
            
        }
        if(response.current.rain === 0){
           
        }else{
            
            
        }

       
    }  else{
        alert("You Haven't input anything");
    }

    
}


submitBtn.addEventListener('click', function(){
    render();
})