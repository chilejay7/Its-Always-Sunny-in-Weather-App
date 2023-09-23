const currentTime = dayjs();
const searchForm = $('#search-form');
const autoCompleteList = ['Denver', 'Granville', 'Chicago', 'Seattle', 'New York', 'Boise', 'Idaho Falls', 'Boulder', 'Littleton', 'Colorado Springs', 'Estes Park', 'Winter Park', 'Fraiser']
// const searchForm = document.getElementById('search-form');

const searchInput = $('#city-input');
// const searchInput = document.querySelector('#city-input');
// const searchInput = document.getElementById('city-input');

const forecastDisplay = $('#forecast-display')

searchForm.on('submit', function (e) {
    console.log(e);
    e.preventDefault();
    let inputCity = searchInput.val();
    console.log(inputCity);

    // This calls the getWeather function to make the API call and uses the City searched for in the input field.
    getWeather(inputCity);

    // displayForecast(getWeather);
    
    // This clears the input field after searching.
    searchInput.val('');


})

// searchForm.addEventListener('submit', function (e) {
//     e.preventDefault;
//     console.log(e);
// })

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

// This function adds an autocomplete menu for various cities using the jQuery UI.
$(function () {
    $('#city-input').autocomplete({
        source: autoCompleteList,
    })
});

// This would allow for a sortable list of cities.
// $(function () {
//     $("#city-list").sortable();
// });