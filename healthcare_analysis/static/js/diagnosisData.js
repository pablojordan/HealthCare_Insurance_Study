
function diagnosisTable(){
    let tableLoc = "/diagnosisTable"

    d3.json(tableLoc).then(function(response){
        
        let tableData = response;

        // Get the reference to the table body
        let tbody = d3.select("tbody");


            // // Use Arrow Functions to build table 
            function buildTable(tableData){
                //Start by celaring existing data
                tbody.html("");
                // Loop thru data
                tableData.forEach(dataEntry => {
                    var row = tbody.append("tr");
                    Object.entries(dataEntry).forEach(([key, value]) => {
                    var cell = row.append("td");
                    cell.text(value);
                    });
                });
            }     
            

        buildTable(tableData);

    })
}

// //////////////// Filter data from the table //////////////
// Source: https://stackoverflow.com/questions/51187477/how-to-filter-a-html-table-using-simple-javascript
function myFunction() {
    const filter = document.querySelector('#myInput').value.toUpperCase();
    const trs = document.querySelectorAll('#diagnosis-table tr:not(.header)');
    trs.forEach(tr => tr.style.display = [...tr.children].find(td => td.innerHTML.toUpperCase().includes(filter)) ? '' : 'none');
}


diagnosisTable();


// // // from data.js
// // var tableData = data;

// // // YOUR CODE HERE!

// // // Get the reference to the table body
// // var tbody = d3.select("tbody");

// // /////////// Option 1 - Short version to add Table to HTML //////////////////

// // // // Use Arrow Functions to build table 
// // function buildTable(tableData){
// //     //Start by celaring existing data
// //     tbody.html("");
// //     // Loop thru data
// //     tableData.forEach(dataEntry => {
// //         var row = tbody.append("tr");
// //         Object.entries(dataEntry).forEach(([key, value]) => {
// //         var cell = row.append("td");
// //         cell.text(value);
// //         });
// //     });
// // }

 
// // // //////////////// Filter data from the table //////////////
// // // Source: https://stackoverflow.com/questions/51187477/how-to-filter-a-html-table-using-simple-javascript
// // function myFunction() {
// //     const filter = document.querySelector('#myInput').value.toUpperCase();
// //     const trs = document.querySelectorAll('#ufo-table tr:not(.header)');
// //     trs.forEach(tr => tr.style.display = [...tr.children].find(td => td.innerHTML.toUpperCase().includes(filter)) ? '' : 'none');
// //   }

// // buildTable(tableData);

