console.log("logic");
$("#submit-search").on("click", function(event) {
    console.log("submit button clicked")
    event.preventDefault();
    var userInput = $("#search").val().trim();
    console.log(userInput)
    searchForCity(userInput);
});

// Function for displaying initial results to be ran after API call is complete
function displayInitialResults() {
    if (initialResults.length === 0) {
        $("#initial-results").html("No results match that search. \nTry typing your search differently, or search for a different City.");
    }
    else {
        $("#initial-results").html($("<p>Please click on the correct result.</p>"));
        initialResults.forEach(function(value, index) {
            var newP = $(`<p id="${index}" class="initial-result">`);
            newP.html(index + ": " + value.fullName);
            $("#initial-results").append(newP);
        });
    }
}

// Function to get and display city details when city from initial results is clicked
$(document).on("click", ".initial-result", function() {
    initialResults[$(this).attr("id")].getCityInfo();
    $("#initial-results").empty();
});

// Function for displaying full city info to be run when the API calls are complete
function displayCityInfo(city) {


    var newDiv = $(
        `<div class="card city-card d-inline-block mx-1" id="${myCities.indexOf(city)}">
            <div class="card-body">
                <h3>${city.name}</h3>
                <p>Population: ${city.population}</p>
                <p>Current time: ${city.currentTime}</p>
                <p>Timezone: ${city.timeZone}</p>
                <p>Country: ${city.country}</p>
                <p>Currency: ${city.currency}</p>
                <p>Current weather: ${city.currentWeather.shortDescription}
                    <ul>
                        <li>Temperature: ${city.currentWeather.temp.celcius} Celcius/ ${city.currentWeather.temp.fahrenheit} Fahrenheit</li>
                        <li>Humidity: ${city.currentWeather.humidity}</li>
                    </ul>
                </p>
                <button class="update" id="${myCities.indexOf(city)}">Update time and weather</button>
            </div>
        </div>`
    );
    $("#results").append(newDiv);
}

// Update time and weather when the update button is clicked
$(document).on("click", ".update", function() {
    var clickedCity = myCities[$(this).attr("id")];
    // console.log(clickedCity)
    clickedCity.getCurrentTime();
    clickedCity.getCurrentWeather();
});