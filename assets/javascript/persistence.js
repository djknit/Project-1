// Function for storing the current cities array in local storage
function saveCitiesInLocalStorage() {
    localStorage.clear();
    // Store the array of city objects as a string in the local storage
    localStorage.setItem("myCities", JSON.stringify(myCities));
} 

// Function for setting the cities array from local storage
function getCitiesFromLocalStorage() {
    // Parse the string version of the array from local storage back into an array of objects and set the myCities array equal to this array
    myCities = JSON.parse(localStorage.getItem("myCities"));
    // Add the methods back onto the objects because they are not stored in local storage
    myCities.forEach(function(city) {
        city.getCityInfo = getCityInfo;
        city.getCurrentTime = getCurrentTime;
        city.getCurrentWeather = getCurrentWeather;
    });
}

// Function for setting the page content to match the current state of the myCities array
function populatePageFromArray() {
    // Clear the current cities display
    $("#results").empty();
    destroyMap();
    // Create new display
    myCities.forEach(function(city) {
        // Get current time and weather information for each city
        // When the weather API call is returned and the city properties updated, display the city on page
        city.getCurrentTime();
        city.getCurrentWeather(function() {
            displayCityInfo(city);
        });
    });
}