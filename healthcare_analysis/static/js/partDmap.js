// Map is not displayin the data in the map but it reads the data in the flask

function mapChart(){
    let partDloc = "/partD"
    
    d3.json(partDloc).then(function(response){

        state_abbr = []
        drug_cost = []
        drug_name = []
        drug_count = []
        nameState = []

        for (var i=0; i<response.length; i++){
            let state_name = response[i].name

            nameState.push(state_name);
        }

        for (var i=0; i<response.length; i++){
            let drug_most = response[i].total_drug_count

            drug_count.push(drug_most);
        }


        for (var i=0; i<response.length; i++){
            let state = response[i].provider_state

            state_abbr.push(state);
        }

        for (var i=0; i<response.length; i++){
            let drug = response[i].avg_cost_drug
            drug_cost.push(drug);
        }

        for (var i=0; i<response.length; i++){
            let name = response[i].drug_name
            drug_name.push(name);
        }

         console.log("state", state_abbr)
         console.log("drug cost", nameState)

        for (var i=0; i<response.length; i++){

        let partDmap = [{
            type: 'choropleth',
            locationmode: 'USA-states',
            locations: state_abbr,
            z:drug_cost,
            text: nameState,
            zmin: 0,
            zmax: 1000,
            colorscale: 'Bluered',
            hovertemplate: '<br>Avg Drug Cost</b>: $%{z:,.2f}' + '<br>State Name</b>: %{text}',
            colorbar: {
                title: 'Hundreds Count',
                thickness: 10,
            },
            
            marker: {
                line:{
                    color: 'black',
                    width: 1
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
    }
    });
}

mapChart();
