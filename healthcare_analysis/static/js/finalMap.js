
// Create a map object
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 4
  });
  
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets-basic",
    accessToken: API_KEY
  }).addTo(myMap);


  function partDmap(){
      let mapLoc ="/partD"
        
      d3.json(mapLoc).then(successHandle).catch(errorHandle)

      function successHandle(response){
          console.log(response)
          var total_drugConsumed_markers = []
          var latlong = [] 
          for (var resp = 0; resp < response.length; resp++){
            //   var lat=response[resp].latitude
            //   var long=response[resp].longitude
            //   latlong.push([lat,long])
            //   latlong=[response[resp].latitude,response[resp].longitude]             
              latlong.push(response[resp].latitude)
              latlong.push(response[resp].longitude)
              total_drugConsumed = response[resp].drug_consumed
              total_drugConsumed_markers.push(
                  L.circle(latlong,{
                      stroke: false,
                      fillOpacity: 0.75,
                      color: "grey",
                      fillColor: "red",
                      radius: (total_drugConsumed)*20000
                  }).bindPopup("<h1>" + response[resp].drug_name + "</h1> <hr> <h3>Drug Avg Cost: " + response[resp].avg_cost_drug + "</h3>" + "<hr> <h3>Total Drug Consumed: " + response[resp].drug_consumed + "</h3>" +"<hr> <h3>Specialty: " + response[resp].specialty + "</h3>")
                 )
                 console.log(latlong)
          }
          console.log(latlong)
      }

      function errorHandle(error){
        console.log(`error is :`,{error})
    }   
  }

  function init(){
    partDmap()
  }

  init()

// function uninsuredMap(){

//     let url="/partD";
    
//     d3.json(url).then(function(data){
    
//       console.log("uninsured url", url);
//       console.log("data", data);
//       // Create a map object
    
//       let myMap = L.map("map"), {
//         center: [37.09, -95.71]
//         zoom: 4
//       });

//       L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//         attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//         maxZoom: 18,
//         id: "mapbox.streets-basic",
//         accessToken: API_KEY
//       }).addTo(myMap);
    
      
      
//       function getColor(d){
//         return d > 20 ? '#d73027' :
//                d > 15  ? '#fc8d59' :
//                d > 10 ? '#fee08b' :
//                d > 5  ? '#d9ef8b' :
//                 '#91cf60'
//       }
    
//       var location=[]
//         for (var i=0; i<data.length; i++){
//             location=[data[i].Latitude, data[i].Longitude]
//             console.log(location)
    
//             L.circle(location, {
//               fillOpacity: 1,
//               color: "white",
//               fillColor: getColor(data[i].change),
//               // Setting our circle's radius equal to the output of our markerSize function
//               // This will make our marker's size proportionate to its population
//               radius: data[i].change*10000
//           }).bindPopup("<h1 align=center>" + data[i].State + "</h1> <hr> <h3>Uninsured Rate Change: " + data[i].change + "%</h3>").addTo(myMap);
//         }
//      });
    
//     }
    
//     uninsuredMap();
    
    



// // // Create a map object
// // var myMap = L.map("map", {
// //     center: [37.09, -95.71],
// //     zoom: 3
// //   });
  
// //   L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
// //     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
// //     maxZoom: 18,
// //     id: "mapbox.streets-basic",
// //     accessToken: API_KEY
// //   }).addTo(myMap);
  
  
  
  
// //   // Create a map object
// //   var myMap = L.map("map", {
// //     center: [15.5994, -28.6731],
// //     zoom: 3
// //   });
  
// //   L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
// //     attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
// //     maxZoom: 18,
// //     id: "mapbox.streets-basic",
// //     accessToken: API_KEY
// //   }).addTo(myMap);
  
// //   // Country data
// //   var countries = [
// //     {
// //       name: "Brazil",
// //       location: [-14.2350, -51.9253],
// //       points: 227
// //     },
// //     {
// //       name: "Germany",
// //       location: [51.1657, 10.4515],
// //       points: 218
// //     },
// //     {
// //       name: "Italy",
// //       location: [41.8719, 12.5675],
// //       points: 156
// //     },
// //     {
// //       name: "Argentina",
// //       location: [-38.4161, -63.6167],
// //       points: 140
// //     },
// //     {
// //       name: "Spain",
// //       location: [40.4637, -3.7492],
// //       points: 99
// //     },
// //     {
// //       name: "England",
// //       location: [52.355, 1.1743],
// //       points: 98
// //     },
// //     {
// //       name: "France",
// //       location: [46.2276, 2.2137],
// //       points: 96
// //     },
// //     {
// //       name: "Netherlands",
// //       location: [52.1326, 5.2913],
// //       points: 93
// //     },
// //     {
// //       name: "Uruguay",
// //       location: [-32.4228, -55.7658],
// //       points: 72
// //     },
// //     {
// //       name: "Sweden",
// //       location: [60.1282, 18.6435],
// //       points: 61
// //     }
// //   ];
  
  
// //   // Loop through the cities array and create one marker for each city object
// //   for (var i = 0; i < countries.length; i++) {
  
// //     // Conditionals for countries points
// //     var color = "";
// //     if (countries[i].points > 200) {
// //       color = "yellow";
// //     }
// //     else if (countries[i].points > 100) {
// //       color = "blue";
// //     }
// //     else if (countries[i].points > 90) {
// //       color = "green";
// //     }
// //     else {
// //       color = "red";
// //     }
  
// //     // Add circles to map
// //     L.circle(countries[i].location, {
// //       fillOpacity: 0.75,
// //       color: "white",
// //       fillColor: color,
// //       // Adjust radius
// //       radius: countries[i].points * 1500
// //     }).bindPopup("<h1>" + countries[i].name + "</h1> <hr> <h3>Points: " + countries[i].points + "</h3>").addTo(myMap);
// //   }
  
