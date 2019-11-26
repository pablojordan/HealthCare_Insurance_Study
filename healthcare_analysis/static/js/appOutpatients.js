// Reference https://plot.ly/javascript/axes/

// It shows only one graph when i select the state the idea is to generate as the graph in the reference wiht the line charts
// when the page load it does not show the name of the states in the legends but no in the drop down menu
// change the scale of the secondary axis
//

function barChart2(state1,state2){
    var outpatientLoc1 = "/totalPrescribedOut/" + state1
    var outpatientLoc2 = "/totalPrescribedOut2/" + state2
    d3.json(outpatientLoc1).then(function(data1){
        d3.json(outpatientLoc2).then(function(data2){

            console.log(data1);
            console.log(data2);

            let lineOut1 = {
                x: data1.city, 
                y: data1.apc_total_count,
                // yaxis:"y2",
                name: `${state1}`,
                type: 'scatter',
                hovertemplate: '<br><b>Total # APC</b>: %{y:,.2f}' 
            }

            let lineOut2 = {
                x: data2.city, 
                y: data2.apc_total_count,
                // yaxis:'y2',
                name: `${state2}`,
                type: 'scatter',
                hovertemplate: '<br><b>Total # APC</b>: %{y:,.2f}' 
            }

            let barOut1 = {
                x: data1.city,
                y: data1.cost_per_treatment,
                name: `${state1}`,
                type: 'bar',
                text: data1.avg_charges,
                textpostion: 'auto',
                marker:{
                    color: '#00b33c',
                    opacity: 0.6,
                },
                hovertemplate: '<br><b>Avg Treatment Cost</b>: $%{y:,.2f}' + '<br><b>Provider Sales (5y)</b>: %{text}',
                };   


            let barOut2 = {
                x: data2.city,
                y: data2.cost_per_treatment,
                name: `${state2}`,
                type: 'bar',
                text: data2.avg_charges,
                textpostion: 'auto',
                marker:{
                    color: '#0000e6',
                    opacity: 0.6,
                },
                hovertemplate: '<br><b>Avg Treatment Cost</b>: $%{y:,.2f}' + '<br><b>Provider Sales (5y)</b>: $%{text:,.2f}',
            };

            let barChartOut = [lineOut1, lineOut2, barOut1, barOut2];
            let layoutBarOut = {
            barmode: 'group',
            title: "<b><b> Outpatients - Treatment Cost Analysis </b>",
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

        Plotly.newPlot('bar2', barChartOut, layoutBarOut, {responsive: true})
 
        });

    });      

}


function init() {
    // Grap a reference to the dropdown select element
    var selector1 = d3.select("#stateOut1");
    var selector2 = d3.select("#stateOut2");

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

            barChart2(firstState1, firstState2);

        });
        // barChart(firstState1, firstState2);
    });


    
}

// function optionChanged(newState1, newState2){
//     // Fetch a new data each time a new state is selected
//     console.log(newState1,newState2);
//     barChart(newState1, newState2);
// }

var button=d3.select("#stateOut")
    button.on("click",function(){
        var state1 = d3.select("#stateOut1").property("value")
        var state2 = d3.select("#stateOut2").property("value")
    
    console.log(state1);
    console.log(state2);

    barChart2(state1,state2)

    })

// Initialize the dashboardh
init();


