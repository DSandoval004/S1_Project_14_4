"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 12
   Case Problem 4

   Author: Diego Sandoval
   Date:   April 5, 2019 (04/05/19)
   
   Filename: gi_sort.js
   
   Global Variables:
   tableData
      An 2-dimensional array of the data found in the body of the web table
      
   dataCategories
      An array of the column titles found the head of the web table
      
   sortIndex
      The index number of the column by which the web table should be
      sorted where 0 = 1st column, 1 = 2nd column, etc.
      
   sortDirection
      A value indicating direction of the sorting where a value of 1 sorts 
      the data in ascending order and a value of -1 sorts the data in descending order
	
   
   
   Functions List:   
   defineDataArray()
      Extracts values from the body of the web table and stores them in the
      tableData array
      
   writeTableData()
      Writes the sorted data into the table rows and cells       
      
   defineColumns()
      Extracts values form the column heads of the web table and stores 
      them in the dataCategories array; also sets up the onclick event
      handlers for the column heads so that the table can be sorted by
      clicking a table heading cell.
           
   columnSort(e)
      Event handler function that sorts the table data when a column
      heading is clicked  
   
   dataSort2D(a, b)
      Compare function used to sort numeric and alphabetical data from
      a 2-dimensional array 
    

*/
// DVARG:
var tableData = [],
      dataCategories = [],
      sortIndex = 0,
      sortDirection = 1;
// DDOES:
window.addEventListener('load', defineDataArray && writeTableData); // && writeTableData
// DFUNC:
function defineDataArray() {
      // DVARA:
      var tableRows = document.querySelectorAll('table#sortable tbody tr');
      // DLOOP:
      for (var i = 0; i < tableRows.length; i++) {
            // DVARL:
            var rowCells = tableRows[i].cells,
                  rowValues = [];
            // DLOOP:
            for (var k = 0; k < rowCells.length; k++) {
                  var cellText = rowCells[k].childNodes[0];
                  rowValues.push(cellText);
            }
            tableData.push(rowValues);
      }
      // DFUNC:
      tableData.sort(dataSort2D);
};
// DFUNC:
function writeTableData() {
      // DVARO:
      var newTableBody = document.createElement('tbody'),
            trN = document.createElement('tr'),
            tdN = document.createElement('td'),
            tbody = document.getElementById('sortable').childNodes[7];
      console.log(tbody)
      // DLOOP:
      for (var tr = 0; tr < tableData.length; tr++) {
            // DLOOP:
            console.log(tableData)
            for (var td = 0; td < tableData[tr].length; td++) {
                  tdN.nodeValue = `${tableData[tr][td]}`;
                  trN.appendChild(tdN)
            }
            // DDOES:
            newTableBody.appendChild(trN)
      }
      document.getElementById('sortable').replaceChild(newTableBody, tbody);
};






function dataSort2D(a, b) {
      if (isNaN(parseFloat(a[sortIndex])) === false) {
            return (a[sortIndex] - b[sortIndex]) * sortDirection;
      } else {
            var astring = a[sortIndex].toLowerCase();
            var bstring = b[sortIndex].toLowerCase();

            if (bstring > astring) return -sortDirection;
            if (bstring < astring) return sortDirection;
            return 0;
      }
}