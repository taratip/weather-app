import { Config } from './config.js';

$.get('./components/header.html', function(response) {
  $("#nav").html(response);
});

$("#weather-info").css("display", "none");

$("#search_weather").submit(event => {
  // form naturally refreshes page, we need to prevent that
  event.preventDefault();

  let searchTerm = $("#city_search").val();
  console.log(searchTerm);

  // instantiating new config object to retrieve api key
  let config = new Config();
  let key = config.getKey();
  // console.log(config.getKey());

  let url = 'http://api.openweathermap.org/data/2.5/weather';

  let data = {
    q: searchTerm,
    APPID: key
  }

  function convertDeg(degree) {
    return (((degree - 273) * (9/5)) + 32).toFixed(2);
  }

  function showWeather(response) {
    console.log(response);

    $("#city_name").text(response.name + ', ' + response.sys.country);
    $("div#high").html(convertDeg(response.main.temp_max) + "&deg");
    $("#low").html(convertDeg(response.main.temp_min) + "&deg");
    $("#forecast").html(response.weather[0].main);
    $("#humidity").html(response.main.humidity + "%");

    // have weather cards appear again on submission
    $("#weather-info").css("display", "");
  }

  $.get(url, data, showWeather);
});
