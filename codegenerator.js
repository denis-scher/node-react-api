const url = "http://api.weatherapi.com/v1/current.json";
const apiKey = "791f4e2e51fd48b6ae7103020241605"; // Replace with your WeatherAPI API key
const wcc = require('world-countries-capitals')


async function codeGenerator() {
    var code = "";

    for (i = 3; i >= 1; i--) {
        const randomCountryName = wcc.getCountryDetailsByName(wcc.getRandomCountry());
        const capital = randomCountryName[0].capital;
        const params = new URLSearchParams({
            key: apiKey,
            q: capital
        });

        const promise = await fetch(`${url}?${params}`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
            })
            .then(weatherData => {
                let _num = Math.trunc(Math.abs(weatherData.current.temp_c));
                if (_num < 10) {
                    _num = "0" + _num.toString();
                } else {
                    _num = _num.toString();
                }
                code = code + _num;
            })
            .catch(error => {
                console.error("Error:", error);
            });


    }
    
    console.log(typeof code);
    return code;
        
}
module.exports = codeGenerator; 
