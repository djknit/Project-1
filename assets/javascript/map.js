var isMapInitialized = false;
var myMap;

// Function to initialize map
function mapCity(city) {

    console.log("map " + city.name);

    if (isMapInitialized === false) {
        myMap = L.map('my-map').setView([city.latitude, city.longitude], 10);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> <strong><a href="https://www.mapbox.com/map-feedback/" target="_blank">Improve this map</a></strong>',
            tileSize: 512,
            maxZoom: 18,
            zoomOffset: -1,
            id: 'mapbox/streets-v11',
            accessToken: 'pk.eyJ1IjoiZGprbml0IiwiYSI6ImNqbW5yMHhkazB3cDgzd3IycGhyYmIxYnUifQ.jkNXJCCslDL_zyRkU8lB6g'
        }).addTo(myMap);

        isMapInitialized = true;
    }
    else {
        myMap.setView([city.latitude, city.longitude], 10);
    }

    // Make new marker using city coordinates and with a title attribute of the city name and add it to the map
    var newMarker = L.marker([city.latitude, city.longitude], {title: city.name}).addTo(myMap);
}

// Function for removing map
function destroyMap() {
    if (isMapInitialized) {
        myMap.remove();
        isMapInitialized = false;
    }
}
