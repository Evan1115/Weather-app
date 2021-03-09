const form = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUI = (data) => {

    //destructure object
    const { city, weather } = data; // the name has to be the same in name declared in object
    // const city = data.city;
    // const weather = data.weather;

    //update weather detail
    details.innerHTML = `
    <h5 class="my-3" name="name">${city.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `

    //hide the card when it's first load up
    if (card.classList.contains("d-none")) {
        card.classList.remove("d-none");
    };

    //update day&night and icon 
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute("src", iconSrc);



    //ternary operator
    const timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg";
    time.setAttribute("src", timeSrc)
}


const updateCity = async (cityName) => {
    const city = await getCity(cityName);
    const weather = await getWeather(city.Key);

    console.log(city, weather);

    //object shorthand notation
    return { city, weather }

    // return {
    //     city: city,
    //     weather: weather
    // };
};

form.addEventListener("submit", e => {
    e.preventDefault();
    const cityName = form.city.value.trim();
    form.reset();// clear the text in input


    //update UI
    updateCity(cityName)
        .then(data => updateUI(data))
        .catch(err => console.log(err));

    localStorage.setItem("city", cityName);
});



//when page refresh the weather data is maintain

if (localStorage.getItem("city")) { //if there is item then it's true
    updateCity(localStorage.getItem("city"))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}