function Data() {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
    } else {
        navigator.geolocation.getCurrentPosition(success);
    }

    function success(position) {

        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log(latitude, longitude)
        document.getElementById('lat').innerText=`Lat: ${latitude}`
        document.getElementById('long').innerText=`Long: ${longitude}`
        showTableData(latitude,longitude);
    }
    
}
async function showTableData(lat,long){
    
        let url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=41f0381fedd924492178a2ae8c53edfd`
        console.log(url)
        let data=await fetch(url)
        let response=await data.json();
        console.log(response);

        document.getElementById("data").style.display="block";
        document.getElementById("location").style.display="flex";
        // document.getElementById("message").style.color="green";
        document.getElementById("tableBody").innerHTML=`
        <p>Location: ${response.name}</p>
        <div class="latlong">
            <p>Lat: ${response.coord.lat}</p>
            <p>Long: ${response.coord.lon}</p>
        </div>
        <p>TimeZone: ${response.timezone}</p>
        <p>Wind Speed: ${response.wind.speed}</p>
        <p>Pressure :${response.main.pressure}</p>
        <p>Humidity :${response.main.humidity}</p>
        <p>Wind Direction :${response.wind.deg}</p>
        <p>UV Index :${response.weather[0].id}</p>
        <p>Feels Like :${response.main.feels_like}</p>`
    }
document.getElementById("fetch-data").addEventListener('click', Data);
