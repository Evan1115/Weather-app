const key = "SVNdRNCXdpjtFxO8kKeEU7d0gvboJHvG";


const getWeather = async (cityKey) => {
    const url = `http://dataservice.accuweather.com/currentconditions/v1/${cityKey}`;
    const query = `?apikey=${key}`;

    const response = await fetch(url + query);
    const data = await response.json();
    return data[0];

}

const getCity = async (city) => {

    const url = "http://dataservice.accuweather.com/locations/v1/cities/search"
    const query = `?apikey=${key}&q=${city}`

    const response = await fetch(url + query);//return promise
    const data = await response.json();//retur promise

    return data[0];

};

// getCity("london").then(data => {
//     return getWeather(data.Key);
// })
//     .then(data => console.log(data.WeatherText))
//     .catch(err => console.log(err));