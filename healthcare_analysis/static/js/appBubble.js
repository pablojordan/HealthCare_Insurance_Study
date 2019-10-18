function bubbleCharts(){
    let bubbleLoc = "/diagnosis"

    d3.json(bubbleLoc).then(function(response){

        console.log(bubbleLoc);
        
        let bubble = {
            x: response.drg_count,
            y: response.avg_pay_drg,
            mode: 'markers',
            text: response.drg_definition,
            hovertemplate: '<br>Avg Payment</b>: $%{y:,.2f}' + '<br>Diagnosis Count</b>: %{x:,}<b>' + '<br>Diagnosis</b>: %{text}' + '<br>Diagnosis Sales</b>: $%{marker.color:,.2f}',
            marker: {
                color: response.drg_total_payments,
                size: response.avg_pay_drg,
                sizeref: 8,
                sizemode: 'area',
                colorscale: "Jet"

            }         
        };

        let bubbleChart = [bubble];
        var layoutBubble = {
            title: "<b>Medicare Severity-Diagnosis Group (MSDRG) Analysis</b>",
            showlegend: false,
            xaxis:{zeroline:false, hoverformat: '.2f', title: 'Number of MSDRG'},
            yaxis:{zeroline:false, hoverformat: '.2r', title: 'Average payment per MSDRG'},
            height: 600,
            width: 1000,
        };

        Plotly.newPlot("bubblePlot", bubbleChart, layoutBubble, {responsive: true})
    })
}


bubbleCharts();