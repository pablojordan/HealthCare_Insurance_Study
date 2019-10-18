function uninsuredMap(){

    let url="/partD";
    
    d3.json(url).then(function(data){
    
      console.log("uninsured url", url);
      console.log("data", data);
      // Create a map object
    
      let myMap = L.map("map"), {
        center: [37.09, -95.71]
        zoom: 4
      });

      L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.streets-basic",
        accessToken: API_KEY
      }).addTo(myMap);
    
      
      
      function getColor(d){
        return d > 20 ? '#d73027' :
               d > 15  ? '#fc8d59' :
               d > 10 ? '#fee08b' :
               d > 5  ? '#d9ef8b' :
                '#91cf60'
      }
    
      var location=[]
        for (var i=0; i<data.length; i++){
            location=[data[i].Latitude, data[i].Longitude]
            console.log(location)
    
            L.circle(location, {
              fillOpacity: 1,
              color: "white",
              fillColor: getColor(data[i].change),
              // Setting our circle's radius equal to the output of our markerSize function
              // This will make our marker's size proportionate to its population
              radius: data[i].change*10000
          }).bindPopup("<h1 align=center>" + data[i].State + "</h1> <hr> <h3>Uninsured Rate Change: " + data[i].change + "%</h3>").addTo(myMap);
        }
     });
    
    }
    
    uninsuredMap();
    
    