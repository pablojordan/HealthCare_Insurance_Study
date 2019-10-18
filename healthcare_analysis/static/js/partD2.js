function partDmap(){
// Link 
let partD = "/partD";


// Perform a GET request to the query URL
d3.json(partD,function(data) {
  
     // Once we get a response, send the data.features object to the createFeatures function
     createFeatures(data.features);
})

// Add color to the legend. Source used:https://leafletjs.com/examples/choropleth/
// https://earthquake.usgs.gov/learn/topics/shakingsimulations/colors.php

function getColor(d) {
	return d > 600 ? '#ff0000' :
	       d > 450  ? '#ff8c00' :
	       d > 300  ? '#90ee90' :
	       d > 150  ? '#6495ed' :
	       d > 50  ? '#f0f8ff' :
	                '#FFFFFF' 
}
function createFeatures(prescriptionData) {
        // Define a function we want to run once for each feature in the features array
        // Give each feature a popup describing the place and time of the earthquake
    function onEachFeature(feature,layer){
        layer.bindPopup("<h3 align=center>" + feature.state_name +
        "</h3><hr><p> Drug Name: " + feature.drug_name + "</p>" + "<p> Avg Drug Cost: " + feature.avg_cost_drug + "<p>"
        + "<p> Number consumed: " + feature.drug_consumed + "<p>" + "<p> Specialty Provided: "+ feature.specialty)
    }

    // function onEachFeature(feature, layer) {
    //     layer.bindPopup("<h2 align=center>" + feature.properties.place +
    //     "</h2><hr><h3>" + new Date(feature.properties.time) + "</h3>"+ `<h3>Mag:+${feature.properties.mag}</h3>`
    //     +`<h3>Type:+${feature.properties.type}</h3>`
    //     +`<h3>Rms:+${feature.properties.rms}</h3>`)
    //   }
    
    let prescription = L.geoJson(prescriptionData, {
        onEachFeature: onEachFeature,

        pointToLayer: function (feature, latlong){
            var markersFormat = {
            radius: (feature.properties.mag)*15000,  
            fillColor: getColor(feature.avg_cost_drug),
            stroke: false,
            color: "orange",
            fillOpacity: 1,
            }

            return L.circle(latlong,markersFormat)
        
        }

    });

     // // Sending our earthquakes layer to the createMap function
    createMap(prescription);

}

function createMap(prescription) {

    // Define streetmap and darkmap layers
    var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.satellite",
    accessToken: API_KEY
    });

    var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
    });

  
    var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
      attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
      maxZoom: 18,
      id: "mapbox.dark",
      accessToken: API_KEY
    });
  
    var outdoors = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.outdoors",
        accessToken: API_KEY
    });

    // Define a baseMaps object to hold our base layers
    var baseMaps = {
      "Street Map": streetmap,
      "Satellite Map": satellitemap,
      "Outdoor Map": outdoors,
      "Dark Map": darkmap
    };
  
    // Create overlay object to hold our overlay layer
    var overlayMaps = {
      Prescriptions: prescription
    };
  
    // Create our map, giving it the streetmap and earthquakes layers to display on load
    var myMap = L.map("partD", {
      center: [
        37.09, -95.71
      ],
      zoom: 5,
      layers: [streetmap, prescription]
    });
  
    // Create a layer control
    // Pass in our baseMaps and overlayMaps
    // Add the layer control to the map
    L.control.layers(baseMaps, overlayMaps, {
      collapse: false
    }).addTo(myMap);
  
  
    var legend = L.control({position: 'bottomright'});

    legend.onAdd = function () {
    
        var div = L.DomUtil.create('div', 'info legend'),
            size = avg_cost_drug;
    
        for (var i = 0; i < size.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(size[i] + 1) + '"></i> ' + 
        + size[i] + (size[i + 1] ? ' - ' + size[i + 1] + '<br>' : ' + ');
        }
    
        return div;
    };
    
    legend.addTo(myMap);
  
  }
}

partDmap();