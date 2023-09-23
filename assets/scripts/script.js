const currentTime = dayjs();
const apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={}'
const searchForm = $('#search-form');
const cities = ['Denver', 'Chicago', 'Seattle', 'New York', 'Boise', 'Idaho Falls', 'Boulder', 'Littleton', 'Colorado Springs', 'Estes Park', 'Winter Park', 'Fraiser']
// const searchForm = document.getElementById('search-form');


// fetch(apiUrl) 
// .then(function(response){
//     console.log(response);
// })
// .then(function (data) {
//     console.log(data)
// });

// getWeather = async (url) => {
//     let forecast = await url;
//     // console.log(response);
//     console.log(data);
// }

// searchForm.addEventListener('submit', function (e) {
//     e.preventDefault;
//     console.log(e);
// })

// searchForm.on('submit', function (e) {
//     console.log(e);
// })
// $(function() {
//     $('#city-input').autocomplete({
//         source: cities
//     });
// });

// This function adds an autocomplete menu for various cities using the jQuery UI.
$(function () {  
    $('#city-input').autocomplete({
      source: cities,
    })
  });

  $( function() {
    $( "#city-list" ).sortable();
  } );