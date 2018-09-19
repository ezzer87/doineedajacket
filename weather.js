// Access openweathermap API after user enters city
const searchWeather = function(city) {
  axios
    .get(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=83123771a9647b6f6e8cebf61e810cbe&units=metric`
    )
    .then(function(response) {
      let weatherData = response.data;
      generateDOM(weatherData);
    })
    .catch(function(error) {
      generateError();
    });
};

// If user enters invalid city generate error
const generateError = function() {
  const error = document.createElement("p");
  error.textContent = "we all know that's not a real city...try again";
  document.querySelector("#weather-list").appendChild(error);
};

// Generate DOM elements
const generateDOM = function(weatherData) {
  const container = document.createElement("div");
  const load = document.createElement("p");
  const temperature = Math.round(weatherData.main.temp);
  const weatherId = weatherData.weather[0].id;
  const description = weatherData.weather[0].description;
  var gif = document.createElement("img");
  let city = weatherData.name.toLowerCase();
  let outputCity = document.createElement("p");
  let outputTemp = document.createElement("p");
  let outputDescription = document.createElement("p");
  let outputJacket = document.createElement("p");
  outputJacket.style.fontWeight = "900";

  console.log(description);
  console.log(weatherData);
  console.log(weatherId);

  outputCity.textContent = `city in question: ${city}`;
  outputTemp.textContent = `temperature (celcius): ${temperature}`;
  outputDescription.textContent = `description: ${description}`;
  load.textContent =
    "one moment, our team of weather/jacket experts are hard at work";

  if (
    (weatherId != 701 &&
      weatherId != 711 &&
      weatherId != 721 &&
      weatherId != 741 &&
      weatherId != 800 &&
      weatherId != 801 &&
      weatherId != 802 &&
      weatherId != 803 &&
      weatherId != 804) ||
    weatherData.main.temp <= 17
  ) {
    outputJacket.textContent = "do i need a jacket? yes";
    gif.src = "https://media.giphy.com/media/26u6dryuZH98z5KuY/giphy.gif";
  } else {
    outputJacket.textContent = "do i need a jacket? no";
    gif.src = "https://media.giphy.com/media/l378p8uWeCxvnRzhK/giphy.gif";
  }

  document.querySelector("#weather-list").appendChild(container);
  container.appendChild(load);

  setTimeout(function() {
    container.innerHTML = "";
  }, 2500);

  setTimeout(function() {
    document.querySelector("#weather-list").appendChild(container);
    container.appendChild(outputCity);
    container.appendChild(outputTemp);
    container.appendChild(outputDescription);
    container.appendChild(outputJacket);
    container.appendChild(gif);
  }, 3000);
};

var placesAutocomplete = places({
  container: document.querySelector("#city"),
  type: "city",
  useDeviceLocation: true,
  templates: {
    value: function(suggestion) {
      return suggestion.name.toLowerCase();
    }
  }
});

document.querySelector("#city").addEventListener("change", function(e) {
  document.querySelector("#weather-list").innerHTML = "";
  searchWeather(e.target.value);
});

// //selectsize search-bar
// const renderCity = function(item, escape) {
//   console.log(item);
//   return (
//     '<div class="item">' +
//     `<span class="flag-icon flag-icon-${escape(
//       item.countryCode.toLowerCase()
//     )}"></span>` +
//     '<span class="title">' +
//     '<strong class="name">' +
//     escape(item.name.toLowerCase()) +
//     "</strong>, " +
//     "</span>" +
//     '<span class="description">' +
//     escape(item.countryName.toLowerCase()) +
//     "</span>" +
//     "</div>"
//   );
// };

// $("select.city-input").selectize({
//   valueField: "name",
//   searchField: "name",
//   options: [
//     {
//       name: "Melbourne",
//       countryName: "Australia",
//       countryCode: "AU"
//     },

//     {
//       name: "Tokyo",
//       countryName: "Japan",
//       countryCode: "JP"
//     },

//     {
//       name: "New York",
//       countryName: "USA",
//       countryCode: "US"
//     }
//   ],
//   create: false,

//   render: {
//     option: renderCity,
//     item: renderCity
//   },

//   load: function(query, callback) {
//     // no empty searches
//     if (!query.length) return callback();

//     axios
//       .get(
//         `http://ws.geonames.org/searchJSON?name_startsWith=${query}&username=ezzer87`
//       )
//       .then(function(response) {
//         var results = response.data.geonames;

//         results = results.filter(function(city) {
//           return city.population > 100000;
//         });

//         console.log(results);
//         callback(results);
//       })
//       .catch(function(error) {
//         callback();
//       });
//   },

//   onChange: function(value) {
//     document.querySelector("#weather-list").innerHTML = "";
//     if (value) {
//       searchWeather(value);
//     }
//   }
// });

// document.querySelector("#city-name").addEventListener("change", function(e) {
//   document.querySelector("#city-name").innerHTML = "";
//   document.querySelector("#weather-list").innerHTML = "";
//   let city = e.target.value;
//   searchWeather(city);
//   e.target.value = "";
// });

// document.querySelector("#city-name").addEventListener("input", function(e) {
//   let search = e.target.value;
//   searchCity(search);
//   console.log(search);
// });

// Access geonames api
// const searchCity = function(search) {
//   axios
//     .get(
//       `http://ws.geonames.org/searchJSON?name_startsWith=${search}&username=ezzer87`
//     )
//     .then(function(response) {
//       let cityData = response.data.geonames;
//       generateDropDown(cityData);
//     })
//     .catch(function(error) {});
// };

// const generateDropDown = function(cityData) {
//   getCityNames();
//   let cityList = [];
//   cityData.forEach(function(city) {
//     if (city.population > 100000) {
//       cityList.push(city.name);
//     }
//   });
// };
