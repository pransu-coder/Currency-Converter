const apiKey = '58f1d4f5873f62d31593097433aaaa82'; 

async function getWeather() {
    const city = document.getElementById('cityInput').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }
    
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.cod === "404") {
            document.getElementById('weatherResult').innerHTML = `<p>Place not found</p>`;
        } else {
            document.getElementById('weatherResult').innerHTML = `
                <h2>${data.name}</h2>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
            
            const weatherCondition = data.weather[0].main;
            let backgroundImage = '';

            switch (weatherCondition) {
                case 'Clouds':
                    backgroundImage = 'url("cloudy.jpg")'; 
                    break;
                case 'Rain':
                    backgroundImage = 'url("rainy.jpg")'; 
                    break;
                case 'Snow':
                    backgroundImage = 'url("snowy.jpg")'; 
                    break;
                case 'Clear':
                    backgroundImage = 'url("sunny.jpg")'; 
                    break;
                case 'Haze':
                    backgroundImage = 'url("haze.jpg")'; 
                    break;
                default:
                    backgroundImage = 'url("weather bg.jpg")'; 
            }

            document.body.style.backgroundImage = backgroundImage;
            document.body.style.backgroundSize = cover;
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}
