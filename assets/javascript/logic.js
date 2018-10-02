console.log("logic");
$("#submit-search").on("click", function(event) {
    console.log("submit button clicked")
    event.preventDefault();
    var userInput = $("#search").val().trim();
    console.log(userInput)
    if (userInput !== "") {
        searchForCity(userInput);
    }
});

// Function for displaying initial results to be ran after API call is complete
function displayInitialResults() {
    if (initialResults.length === 0) {
        $("#initial-results").html("No results match that search. Try typing your search differently, or search for a different City.<br>Include only the city name or the city and country separated by a comma. Make sure that you have spelled your search correctly.");
    }
    else {
        $("#initial-results").html($("<p class='instructions'>Please click on the correct result.</p>"));
        initialResults.forEach(function(value, index) {
            var newP = $(`<p id="${index}" class="initial-result">`);            
            newP.html((index + 1) + ": " + value.fullName);
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
        `<div class="card city-card d-inline-block mx-1 my-1" id="${myCities.indexOf(city)}">
            <div class="card-body">
                <button class="btn btn-outline-danger" cityId="${myCities.indexOf(city)}">
                    <i class="fa fa-window-close" aria-hidden="true"></i>
                </button>
                <h3>${city.name}</h3>
                <p>Population: ${city.population}</p>
                <p>Current time: ${city.currentTime}</p>
                <p>Timezone: ${city.timeZone}</p>
                <p>Country: ${city.country}</p>
                <p>Currency: ${city.currency}</p>
                <p>Current weather: ${city.currentWeather.shortDescription}
                    <ul>
                        <li>Temperature: ${city.currentWeather.temp.celcius} &degC/ ${city.currentWeather.temp.fahrenheit} &degF</li>
                        <li>Humidity: ${city.currentWeather.humidity}</li>
                    </ul>
                </p>
                <button class="update btn btn-outline-primary" cityId="${myCities.indexOf(city)}">Update time and weather</button>
            </div>
        </div>`
    );
    $("#results").prepend(newDiv);

    mapCity(city);
}

// Update time and weather when the update button is clicked
$(document).on("click", ".update", function() {
    var clickedCityIndex = $(this).attr("cityId");
    var clickedCity = myCities[clickedCityIndex];
    // console.log(clickedCity)
    clickedCity.getCurrentTime();
    $("#" + clickedCityIndex).remove();
    clickedCity.getCurrentWeather();
});

// delete city info card if the red exit button is clicked
$(document).on("click", ".btn-outline-danger", function() {
    $("#" + $(this).attr("cityId")).detach();
});