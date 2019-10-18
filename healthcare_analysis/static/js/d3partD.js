// @TODO: YOUR CODE HERE!
let svgWidth = 900;
let svgHeight = 600;

let margin = {
    top: 30,
    right: 40,
    bottom: 150,
    left: 150
};

let width = svgWidth - margin.left - margin.right;
let height = svgHeight - margin.top - margin.bottom;

// Create a SVG wrapper, append an SVG grou that will hold the chart

let svg = d3
    .select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

// Append a SVG Group

let chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`)
    

    // Initial Parameters

let chosenXAxis = "drug_count_most_consumed";

let chosenYaxis = "avg_cost_drug";

function xScale(liveData, chosenXAxis) {
    // create scales
    let xLinearScale = d3.scaleLinear()
      .domain([d3.min(liveData, d => d[chosenXAxis]) * 0.8,
        d3.max(liveData, d => d[chosenXAxis]) * 1.2
      ])
      .range([0, width]);

  
    return xLinearScale;
}

function yScale(liveData, chosenYaxis) {
    // create scales
    let yLinearScale = d3.scaleLinear()
      .domain([d3.min(liveData, d => d[chosenYaxis]) * 0.8,
        d3.max(liveData, d => d[chosenYaxis]) * 1.2
      ])
      .range([height,0]);
  
    return yLinearScale;
}

// function used for updating xAxis let upon click on axis label
function renderAxesX(newXScale, xAxis) {
    let bottomAxis = d3.axisBottom(newXScale);
  
    xAxis.transition()
      .duration(1000)
      .call(bottomAxis);
  
    return xAxis;
}

// function used for updating yAxis let upon click on axis label
function renderAxesY(newYScale, yAxis) {
    let leftAxis = d3.axisLeft(newYScale);
    yAxis.transition()
      .duration(1000)
      .call(leftAxis);
  
    return yAxis;
}


// function used for updating circles group with a transition to
// new circles

function renderCircles(circlesGroup, newXScale, chosenXAxis,newYScale, chosenYaxis) {

    circlesGroup.transition()
      .duration(1000)
      .attr("cx", xx => newXScale(xx[chosenXAxis]))
      .attr("cy", yy => newYScale(yy[chosenYaxis]));
  
    return circlesGroup;
}

// Function to render state abbreviation 
function renderStateAbbr(stateAbbr, newXScale, chosenXAxis,newYScale, chosenYaxis) {
    
    stateAbbr.transition()
    .duration(1000)
    .attr("x", xxx => newXScale(xxx[chosenXAxis]))
    .attr("y", yyy => newYScale(yyy[chosenYaxis]));

    return stateAbbr;
}

// Function used to update circles group with new tooltip

function updateToolTip(chosenXAxis, chosenYaxis, circlesGroup) {
    if (chosenXAxis == "drug_count_most_consumed"){
        var labelx = "Most Drug Consumed: ";
        
    }

    else if(chosenXAxis == "drug_claim_count") {
        var labelx = "Claims Count:";
        
    }

    else {
        var labelx = "Supply Count: ";
    }

    // choosing y labels

    if (chosenYaxis == "avg_cost_drug"){
        var labely = "Avg Drug Cost: ";
    }

    else if(chosenYaxis == "total_drug_count") {
        var labely = "Total Drugs: ";
    }

    else {
        var labely = "Drug Cost: ";
    }

    // Creating the tooltip 
    
    var toolTip = d3.tip()
        .attr("class", "d3-tip") // get fromat from d3Style.css
        // .attr("text-anchor", "middle")
        .style("font-size", "8px")
        // .style("font-weight", "bold")
        // .style("fill", "black")
        // .style("opacity", "0.8")
        // .offset([10,-30])
        .html(function(tip){return(`${tip.name}<br>${labelx} ${formatAxis(tip[chosenXAxis], chosenXAxis)} <br> 
        ${labely} ${formatAxis(tip[chosenYaxis], chosenYaxis)} `) // 
        });

    circlesGroup.call(toolTip);

    circlesGroup.on("mouseover", function(data) {
        toolTip.show(data);
    })

    // on mouse out event
        .on("mouseout", function (data, index) {
            toolTip.hide(data);
        });

    return circlesGroup;
}

// function to format x tip
function formatAxis(axisValue, chosenXAxis, chosenYaxis) {
    
    // Make the style of adding % and $ where needed
    if (chosenXAxis == "drug_count_most_consumed"){
        return `${axisValue}`;
        
    }

    else if(chosenXAxis == "drug_claim_count") {
        return `${axisValue}`;
        
    }

    else if(chosenXAxis == "drug_supply_count"){
        return `${axisValue}`;
    }

    // choosing y labels

    else if(chosenYaxis == "avg_cost_drug"){
        return `${axisValue}`;
    }

    else if(chosenYaxis == "total_drug_count") {
        return `${axisValue}`;
    }

    else {
        return `${axisValue}`;
    }

}

    // Retrieve data from the CSV file and execute everything below
// csvFile = "../data/CLEAN_part_d_Data.csv"
// csvFile = "assets/data/data.csv"
// d3.csv(csvFile).then(function(liveData, err) {   --- take out the function 
function scatterPartD(){
    
    let d3url = "/partDscatter"
    d3.json(d3url).then(function(liveData, err) {
        if (err) throw err;
        console.log(liveData);
        // parse data
        liveData.forEach(function(data) {
            data.drug_count_most_consumed = +data.drug_count_most_consumed;
            data.total_drug_count = +data.total_drug_count;
            data.drug_claim_count = +data.drug_claim_count;
            data.drug_supply_count = +data.drug_supply_count;
            data.drug_cost = +data.drug_cost;
            data.avg_cost_drug = +data.avg_cost_drug;
        });
        
        // xLinearScale & yLinearScale function above csv import
        let xLinearScale = xScale(liveData, chosenXAxis);

        let yLinearScale = yScale(liveData, chosenYaxis);

        // Create initial axis functions
        let bottomAxis = d3.axisBottom(xLinearScale);
        let leftAxis = d3.axisLeft(yLinearScale);

        // append x axis

        let xAxis = chartGroup.append("g")
            .classed("x-axis", true)
            .attr("transform", `translate(0, ${height})`)
            .call(bottomAxis);

        // append y axis
        let yAxis = chartGroup.append("g")
            .classed("y-axis", true)
            .call(leftAxis);
            
        // append initial circles

        let circlesGroup = chartGroup.selectAll("circle")
        .data(liveData)
        .enter()
        .append("circle")
        .attr("class", "stateCircle")
        .attr("cx", xx => xLinearScale(xx[chosenXAxis]))
        .attr("cy", yy => yLinearScale(yy[chosenYaxis]))
        .attr("r", 12)
        // .attr("fill", "#00008B")
        .attr("opacity", "0.8");
    
        let stateAbbr = chartGroup.selectAll("abbr")
        .data(liveData)
        .enter()
        .append("text")
        .text(d => d.abbr)
        .attr("class", "stateText")  // get format from d3Style.css
        .attr("cx", xx => xLinearScale(xx[chosenXAxis]))
        .attr("cy", yy => yLinearScale(yy[chosenYaxis]))
        // .style("text-anchor", "middle")
        .attr("font-size", "8px")
        // .attr("font-weight", "bold")
        // .attr("fill", "white");


        
        // Create group for 3 x - axis labels
        let labelsGroupX = chartGroup.append("g")
            .attr("transform", `translate(${width / 2}, ${height + 20})`);

        let povertyLabel = labelsGroupX.append("text")
            .attr("x",0)
            .attr("y", 20)
            .attr("value", "drug_count_most_consumed")
            .classed("active", true)
            .text("Most Drug Consumed");

        let ageLabel = labelsGroupX.append("text")
            .attr("x",0)
            .attr("y", 50)
            .attr("value", "drug_claim_count")
            .classed("inactive", true)
            .text("Drug Claim Count");

        let houseLabel = labelsGroupX.append("text")
            .attr("x",0)
            .attr("y", 80)
            .attr("value", "drug_supply_count")
            .classed("inactive", true)
            .text("Drug Supply Count");

        
        // Append y axis and Create group for 3 y - axis labels
        let labelsGroupY = chartGroup.append("g")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height / 2))

        let healthLabel = labelsGroupY.append("text")
            .attr("value", "avg_cost_drug")
            .attr("dx", "-10em")
            .attr("dy", "-2em")
            .classed("active", true)
            .text("Avg Drug Cost");

        let smokesLabel = labelsGroupY.append("text")
            .attr("value", "total_drug_count")
            .attr("dx", "-10em")
            .attr("dy", "-4em")
            .classed("inactive", true)
            .text("Total Drugs Count");

        let obeseLabel = labelsGroupY.append("text")
            .attr("value", "drug_cost")
            .attr("dx", "-10em")
            .attr("dy", "-6em")
            .classed("inactive", true)
            .text("Drug Cost");

    // x axis labels event listener
        labelsGroupX.selectAll("text")
            .on("click", function() {
            // get value of selection
                let xValue = d3.select(this).attr("value");
                if (xValue !== chosenXAxis) {

                    // replaces chosenXAxis with value
                    chosenXAxis = xValue;

                    // functions here found above csv import
                    // updates x scale for new data
                    xLinearScale = xScale(liveData, chosenXAxis);

                    // updates x axis with transition
                    xAxis = renderAxesX(xLinearScale, xAxis);

                    // updates circles with new x values
                    circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYaxis);
                    
                    // updates tooltips with new info
                    circlesGroup = updateToolTip(chosenXAxis,chosenYaxis, circlesGroup);

                    // updates state abbreviate with new info
                    stateAbbr = renderStateAbbr(stateAbbr, xLinearScale, chosenXAxis, yLinearScale, chosenYaxis); 

                    // changes classes to change bold text
                    if (chosenXAxis === "drug_count_most_consumed") {
                        ageLabel
                            .classed("active", true)
                            .classed("inactive", false);
                        povertyLabel
                            .classed("active", false)
                            .classed("inactive", true);
                        houseLabel
                            .classed("active", false)
                            .classed("inactive", true);
                    }

                    else if(chosenXAxis === "drug_claim_count") {
                        houseLabel
                            .classed("active", true)
                            .classed("inactive", false);
                        povertyLabel
                            .classed("active", false)
                            .classed("inactive", true);
                        ageLabel
                            .classed("active", false)
                            .classed("inactive", true);
                    } 

                    else {
                        houseLabel
                            .classed("active", false)
                            .classed("inactive", true);
                        povertyLabel
                            .classed("active", true)
                            .classed("inactive", false);
                        ageLabel
                            .classed("active", false)
                            .classed("inactive", true);
                    }
                }
            })
        
        //   // y axis labels event listener
        labelsGroupY.selectAll("text")
        .on("click", function() {
        // get value of selection
            let yValue = d3.select(this).attr("value");
            if (yValue !== chosenYaxis) {

                // replaces chosenXAxis with value
                chosenYaxis = yValue;

                // functions here found above csv import
                // updates y scale for new data
                yLinearScale = yScale(liveData, chosenYaxis);

                // updates y axis with transition
                yAxis = renderAxesY(yLinearScale, yAxis);

                // updates circles with new y values
                circlesGroup = renderCircles(circlesGroup, xLinearScale, chosenXAxis, yLinearScale, chosenYaxis);
                
                // updates tooltips with new info
                circlesGroup = updateToolTip(chosenXAxis, chosenYaxis, circlesGroup);

                // updates state abbreaviation wiht new y values
                stateAbbr = renderStateAbbr(stateAbbr, xLinearScale, chosenXAxis, yLinearScale, chosenYaxis); 
                // changes classes to change bold text
                if (chosenYaxis === "avg_cost_drug") {
                    smokesLabel
                        .classed("active", true)
                        .classed("inactive", false);
                    healthLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    obeseLabel
                        .classed("active", false)
                        .classed("inactive", true);
                }

                else if(chosenYaxis === "total_drug_count") {
                    smokesLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    healthLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    obeseLabel
                        .classed("active", true)
                        .classed("inactive", false);
                } 

                else {
                    smokesLabel
                        .classed("active", false)
                        .classed("inactive", true);
                    healthLabel
                        .classed("active", true)
                        .classed("inactive", false);
                    obeseLabel
                        .classed("active", false)
                        .classed("inactive", true);
                }
            }
        })
            
    }).catch(function(error) {
    console.log(error);
    });
}

scatterPartD();

