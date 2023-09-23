const currentTime = dayjs();
const apiUrl = 'http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={a65fbee006d1cdf010afb7d2f7201d89}'
const searchForm = $('#search-form');
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

searchForm.on('submit', function (e) {
    console.log(e);
})

