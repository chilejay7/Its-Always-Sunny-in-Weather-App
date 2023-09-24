const currentTime = dayjs();
const searchForm = $('#search-form');
const autoCompleteList = ['Denver', 'Granville', 'Grandview', 'Chicago', 'Seattle', 'New York', 'Boise', 'Idaho Falls', 'Boulder', 'Littleton', 'Colorado Springs', 'Estes Park', 'Winter Park', 'Fraiser']
// const searchForm = document.getElementById('search-form');

const searchInput = $('#city-input');
// const searchInput = document.querySelector('#city-input');
// const searchInput = document.getElementById('city-input');

const forecastDisplay = $('#forecast-display');

// This is a submit event listener on the search form.
searchForm.on('submit', function (e) {
    console.log(e);

    // This prevents the default behavior on executing the search function where the form will try to trigger the action attribute.
    e.preventDefault();

    // This saves the input entered into the search input to allow city names searched to be saved for later use.
    let inputCity = searchInput.val();
    console.log(inputCity);

    // This calls the getWeather function to make the API call and uses the city searched for in the input field to pull the forecast data.
    getWeather(inputCity);

    // This will add the searched cities to an array that holds previously searched values.  The array will be used to write the values to the list item buttons.
    searchedCities.push(inputCity);
    // displayForecast(getWeather);
    
    // This clears the input field after searching.
    searchInput.val('');


})

// This code has been commented out but left as it creates a submit event listener, but uses syntax that is not jQuery.  It represents another method of acheiving the same end as the jQuery listener above.
// searchForm.addEventListener('submit', function (e) {
//     e.preventDefault;
//     console.log(e);
// })


// This function calls fetches data related to the city searched from the Open Weather API.  A city argument can be passed to reuse the fetch.  This function is called in the submit event listener.
getWeather = (city) => {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=a65fbee006d1cdf010afb7d2f7201d89&units=imperial`)
        .then(function (response) {
            console.log(response);
            return response.json();
        })
        .then(function (data) {
            console.log(data)
        });
}

// getWeather = async (url) => {
//     let forecast = await url;
//     // console.log(response);
//     console.log(data);
// }


displayForecast = (fnc) => {
    fnc();

    console.log

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


// To make this work an array will probably be needed.  It will start empty and need to be written to local storage.  The basic functionality has been tested and does work.  
const citySearchBtns = $('#city-list');
const searchedCities = [];

createCityButtons = () => {
for (let i=0; i < citySearchBtns[0].children.length; i++) {
    citySearchBtns[0].children[i].innerText = searchedCities[i]
}
}