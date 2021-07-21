

var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
});

L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);

var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(url).then(function (response) {

    console.log(response);

    function addRadius(magnitude) {

        return magnitude * 2


    };

    function colorDepth(depth) {

        if (depth >= 90) {

            return "#FF0000"
        }

        else if (depth >= 70) {

            return "#FFA500"
        }

        else if (depth >= 50) {
            return "#FF7F50"
        }

        else if (depth >= 30) {
            return "#FFD700"
        }


        else if (depth >= 10) {
            return "#98FB98"
        }

        else if (depth >= -10) {
            return "#00FF00"
        }


    };

    function buildStyle(features) {

        return {
            fillColor: colorDepth(features.geometry.coordinates[2]),
            radius: addRadius(features.properties.mag),
            opacity: 1,
            fillOpacity: 1,
            weight: 0

        }
    }





    // Create a GeoJSON layer containing the features array on the earthquakeData object
    // Run the onEachFeature function once for each piece of data in the array
    L.geoJSON(response, {
        onEachFeature: function (feature,layer){layer.bindPopup("Magnitude " + feature.properties.mag + "<br>" + "Coordinates " + feature.geometry.coordinates[2] 
            )},
            pointToLayer: function (feature, latlng) {
                return L.circleMarker(latlng);
            },
            style: buildStyle
            

    }).addTo(myMap);










});
