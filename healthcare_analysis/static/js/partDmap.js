// Map is not displayin the data in the map but it reads the data in the flask


function mapChart(){
    let partDloc = "/partD"
    
    d3.json(partDloc).then(function(response){

        console.log(response.name);
        

        let partDmap = [{
            type: 'choropleth',
            locationmode: 'USA-states',
            locations: response.state,
            z:response.avg_cost_drug,
            text: response.state_name,
            zmin: 0,
            zmax: 1000,
            colorscale: 'Jet',
            colorbar: {
                title: 'Hundreds Count',
                thickness: 10,
            },
            
            marker: {
                line:{
                    color: 'rgb(255,255,255)',
                    width: 10
                }
            }
        }];

        let partDlayout = {
            title: 'Part D - Medicare Prescription Analysis',
            geo:{
                scope: 'usa',
                showlakes: true,
                lakecolor: 'rgb(255, 255, 255)',
            }

        };
       
        Plotly.newPlot("map", partDmap, partDlayout, {responsive: true})

    });
}

mapChart();
