const currentTime = dayjs();
const searchForm = $('#search-form');
const autoCompleteList = ['Denver', 'Granville', 'Lawrence', 'Grandview', 'Chicago', 'Seattle', 'New York', 'Boise', 'Idaho Falls', 'Boulder', 'Littleton', 'Colorado Springs', 'Estes Park', 'Winter Park', 'Fraiser', 'Madison']
// const searchForm = document.getElementById('search-form');
// https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a65fbee006d1cdf010afb7d2f7201d89&units=imperial

const searchInput = $('#city-input');
// const searchInput = document.querySelector('#city-input');
// const searchInput = document.getElementById('city-input');

const forecastDisplay = $('#forecast-display');

// This is a submit event listener on the search form.
searchForm.on('submit', function (e) {
    console.log(e.target);

    // This prevents the default behavior on executing the search function where the form will try to trigger the action attribute.
    e.preventDefault();

    // This saves the input entered into the search input to allow city names searched to be saved for later use.
    let inputCity = searchInput.val();
    // console.log(inputCity);

    getCurrentWeather(inputCity, currentForecast);

    // This calls the getWeather function to make the API call and uses the city searched for in the input field to pull the forecast data.
    getWeather(inputCity);

    // This will add the searched cities to an array that holds previously searched values.  The array will be used to write the values to the list item buttons.
    searchedCities.push(inputCity);
    // displayForecast(getWeather);

    createCityButtons();
    
    // This clears the input field after searching.
    searchInput.val('');


})

// This code has been commented out but left as it creates a submit event listener, but uses syntax that is not jQuery.  It represents another method of acheiving the same end as the jQuery listener above.
// searchForm.addEventListener('submit', function (e) {
//     e.preventDefault;
//     console.log(e);
// })


// This function was added to display the current weather conditions.  The API call is different than the forecast and provides the current weather data.
getCurrentWeather = (city, current) => {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=a65fbee006d1cdf010afb7d2f7201d89&units=imperial`)
    .then(function (response) {
        console.log(response);
        return response.json();
    })
    .then(function (data) {
        console.log(data)

        // The functions used to write data to the different display cards used for the forecast will be passed as arguemnts and called here.
        current(data);
    });
}
// This function calls fetches data related to the city searched from the Open Weather API.  A city argument can be passed to reuse the fetch.  Addtional arguemnts designating functions have been added. These will be used to call the functions that populate forecast data into the cards. This function is called in the submit event listener and the city list function.
getWeather = (city, weather1, weather2, weather3, weather4) => {
   
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=a65fbee006d1cdf010afb7d2f7201d89&units=imperial`)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data)

            // The functions used to write data to the different display cards used for the forecast will be passed as arguemnts and called here.
            // current(data);
        });
}

// getWeather = async (url) => {
//     let forecast = await url;
//     // console.log(response);
//     console.log(data);
// }

// To make this work an array will be needed.  It will start empty and need to be written to local storage.  The basic functionality has been tested and does work.  The array's values are updated with a push of the search input in the submit form's event listener.
const cityList = $('#city-list');
const searchedCities = [];

createCityButtons = () => {
for (let i=0; i < cityList[0].children.length; i++) {
    cityList[0].children[i].innerText = searchedCities[i]
}
};

// The idea of this listener is extremely important. The listener is added to the parent ul element and listens for events on buttons that are children.  It takes advantage of the concept of event bubbling and eliminates what would be repetitious code to add listeners to all buttons.  This allows for dynamic creation of button elements within this parent and will automatically listen on elements added.  This will be used to recall forecast data related to cities previously searched.  It's important to remember it's an array of objects and requires the index to use the listener without an error.
cityList[0].addEventListener('click', function(e) {
       if (e.target.tagName === 'BUTTON') {
        console.log(e.target.innerText);

        // This calls the same getWeather function defined earlier to be used within the submit form listener.  The function was designed for reuse by adding the city argument.  That argument is what allows the event target's inner text to be passed to the API call here.
        getCurrentWeather(e.target.innerText, currentForecast);
    }
});

// This function sets the forecast for current weather conditions in the location requested.
currentForecast = (data) => {
    // const cityName = $('#display-current-weather .card-title');
    const cityName = $('.city-name');
    const iconDisplay = $('#display-current-weather .icon');
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    const currentConditions = $('#display-current-weather .description');
    const feelsLike = $('#display-current-weather .feels-like');
    const currentTemp = $('#display-current-weather .current');
    const currentHigh = $('#display-current-weather .high');
    const currentLow = $('#display-current-weather .low');
    // console.log(data.name);
    cityName[0].innerText = data.name;
    currentConditions[0].innerText = data.weather[0].description;
    iconDisplay[0].src = iconUrl;
    currentTemp[0].innerText = `Currently: ${Math.round(data.main.temp)}`;
    feelsLike[0].innerText = `Feels Like: ${Math.round(data.main.feels_like)}`
    currentHigh[0].innerText = `Today's High: ${Math.round(data.main.temp_max)}`;
    currentLow[0].innerText = `Today's Low: ${Math.round(data.main.temp_min)}`;    
}

// This will be used to write data to the extended five day forecast cards.
extendedForecast = (data) => {
    // const cityName = $('#display-current-weather .card-title');
    const currentConditions = $('#display-current-weather .description');
    const currentTemp = $('#display-current-weather .current');
    const currentHigh = $('#display-current-weather .high');
    const currentLow = $('#display-current-weather .low');
    console.log(data.city.name);
    cityName[0].innerText = data.city.name;
    currentConditions[0].innerText = data.list[0].weather[0].description;
    currentTemp[0].innerText = `Currently: ${Math.round(data.list[0].main.temp)}`;
    currentHigh[0].innerText = `Today's High: ${data.list[0].main.temp_max}`;
    currentLow[0].innerText = `Today's Low: ${data.list[0].main.temp_min}`;    
}

// This function adds an autocomplete menu for various cities using the jQuery UI.  The source references the autoComplete list array created at the beginning of the script.
$(function () {
    $('#city-input').autocomplete({
        source: autoCompleteList,
    })
});

// This would allow for a sortable list of cities.
// $(function () {
//     $("#city-list").sortable();
// });

// Icon list
// 200-299 = 11d
// 300-399 || 520-531 = 09d
// 500-504 = 10d
// 511 || 600-622 = 13d
// 701-781 = 50d

