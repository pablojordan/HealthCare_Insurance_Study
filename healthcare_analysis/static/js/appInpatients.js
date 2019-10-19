// Reference https://plot.ly/javascript/axes/

// It shows only one graph when i select the state the idea is to generate as the graph in the reference wiht the line charts
// when the page load it does not show the name of the states in the legends but no in the drop down menu
// change the scale of the secondary axis
//

function barChart(state1,state2){
    var inpatientLoc1 = "/totalPrescribedIn/" + state1
    var inpatientLoc2 = "/totalPrescribedIn2/" + state2
    d3.json(inpatientLoc1).then(function(data1){
        d3.json(inpatientLoc2).then(function(data2){

            console.log(data1);
            console.log(data2);

            let line1 = {
                x: data1.city, 
                y: data1.msdrg_total_count,
                // yaxis:"y2",
                name: `${state1}`,
                type: 'scatter',
                hovertemplate: '<br><b>Total # MSDRG</b>: %{y:,.2f}' 
            }

            let line2 = {
                x: data2.city, 
                y: data2.msdrg_total_count,
                // yaxis:'y2',
                name: `${state2}`,
                type: 'scatter',
                hovertemplate: '<br><b>Total # MSDRG</b>: %{y:,.2f}' 
            }

            let bar1 = {
                x: data1.city,
                y: data1.cost_per_treatment,
                name: `${state1}`,
                type: 'bar',
                text: data1.avg_charges,
                textpostion: 'auto',
                marker:{
                    color: '#80ffff',
                    opacity: 0.6,
                },
                hovertemplate: '<br><b>Avg Treatment Cost</b>: $%{y:,.2f}' + '<br><b>Avg Charges (5y)</b>: %{text}',
                };   


            let bar2 = {
                x: data2.city,
                y: data2.cost_per_treatment,
                name: `${state2}`,
                type: 'bar',
                text: data2.avg_charges,
                textpostion: 'auto',
                marker:{
                    color: '##264d00',
                    opacity: 0.6,
                },
                hovertemplate: '<br><b>Avg Treatment Cost</b>: $%{y:,.2f}' + '<br><b>Provider Sales (5y)</b>: $%{text:,.2f}',
            };

            let barChart = [line1, line2, bar1, bar2];
            let layoutBar = {
            barmode: 'group',
            title: "<b><b> Inpatients - Treatment Cost Analysis </b>",
            showlegend: true,
            xaxis: {
                tickangle:-45

            },
            yaxis: {
                tickson: "boundaries",
                ticklen: 15,
                showdividers:true,
                dividercolor: 'grey',
                dividerwidth: 1,
                tickangle: -45
            },
            bargap: 0.05,

            yaxis:{zeroline:false, hoverformat: '.10r', title: 'Avg Treatment Cost'} 
            
        }; 

        Plotly.newPlot('bar', barChart, layoutBar, {responsive: true})
 
        });

    });      

}


function init() {
    // Grap a reference to the dropdown select element
    var selector1 = d3.select("#state1");
    var selector2 = d3.select("#state2");

    d3.json("/states1").then((stateName1) => {
        stateName1.forEach((state1) => {
           selector1
            .append("option")
            .text(state1)
            .property("value", state1);
        });


        d3.json("/states2").then((stateName2) => {
            stateName2.forEach((state2) => {
                selector2
                    .append("option")
                    .text(state2)
                    .property("value", state2)
            });

        // Use the 2th state from the list to build the initial bar chart
            const firstState1 = stateName1[0];
            const firstState2 = stateName2[2]

            barChart(firstState1, firstState2);

        });
        // barChart(firstState1, firstState2);
    });


    
}

// function optionChanged(newState1, newState2){
//     // Fetch a new data each time a new state is selected
//     console.log(newState1,newState2);
//     barChart(newState1, newState2);
// }

var button=d3.select("#stateIn")
    button.on("click",function(){
        var state1 = d3.select("#state1").property("value")
        var state2 = d3.select("#state2").property("value")
    
    console.log(state1);
    console.log(state2);

    barChart(state1,state2)

    })

// Initialize the dashboardh
init();


