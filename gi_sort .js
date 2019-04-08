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
window.addEventListener('load', function () {
      defineDataArray();
      writeTableData();
      defineColumns();
});
// DFUNC:
function defineDataArray() {
      // DVARA:
      var tableRows = document.querySelectorAll('table.sortable tbody tr');
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
      tableData.sort(function (a, b) {
            if (isNaN(parseFloat(a[sortIndex])) === false) {
                  return (a[sortIndex] - b[sortIndex]) * sortDirection;
            } else {
                  var astring = a[sortIndex];
                  var bstring = b[sortIndex];

                  if (bstring > astring) return -sortDirection;
                  if (bstring < astring) return sortDirection;
                  return 0;
            }
      });
};
// DFUNC:
function writeTableData() {
      // DVARO:
      var newTableBody = document.createElement('tbody'),
            tbody = document.getElementById('sortable').childNodes[7];
      for (var tr = 0; tr < tableData.length; tr++) {
            // DVARO:
            var trN = document.createElement('tr');
            // DLOOP:
            for (var td = 0; td < tableData[tr].length; td++) {
                  // DVARL:
                  var tdN = document.createElement('td'),
                        tdText = tableData[tr][td];
                  // DDOES:
                  tdN.appendChild(tdText)
                  trN.appendChild(tdN)
            }
            // DDOES:
            newTableBody.appendChild(trN)
      }
      // DDOES:
      document.getElementById('sortable').replaceChild(newTableBody, tbody);
};
// DFUNC:
function defineColumns() {
      // DVARO:
      var styleSheets = document.createElement('style'),
            thInThePage = document.querySelectorAll('table.sortable thead tr th');
      // DDOES:
      document.head.appendChild(styleSheets);
      // DDOES:
      document.styleSheets[document.styleSheets.length - 1].insertRule(
            "table.sortable thead tr th { \
                  cursor: pointer; \
            }", 0
      );
      document.styleSheets[document.styleSheets.length - 1].insertRule(
            "table.sortable thead tr th::after { \
                  content: '\\00a0'; \
                  font-family: monospace; \
                  margin-left: 5px; \
            }", 1
      );
      document.styleSheets[document.styleSheets.length - 1].insertRule(
            "table.sortable thead tr th:nth-of-type(1)::after { \
                  content: '\\25b2'; \
            }", 2
      );
      // DLOOP:
      for (var i = 0; i < thInThePage.length; i++) {
            // DVARS:
            var thText = thInThePage[i].innerHTML
            // DVARA:
            dataCategories.push(thText);
            // DDOES:
            thInThePage[i].addEventListener('click', columnSort);
      }
};
// DFUNC:
function columnSort(e) {
      // DVARL:
      var columnText = e.target.innerHTML,
            columnIndex = dataCategories.indexOf(columnText),
            columnNumber = columnIndex + 1,
            columnStyles = document.styleSheets[document.styleSheets.length - 1].cssRules[document.styleSheets[document.styleSheets.length - 1].cssRules - 1];
      // DIFDO:
      if (columnIndex == sortIndex) {
            sortDirection *= -1;
      }
      // DDOES:
      document.styleSheets[document.styleSheets.length - 1].deleteRule(2);
      if (sortDirection === 1) {
            document.styleSheets[document.styleSheets.length - 1].insertRule(
                  `table.sortable thead tr th:nth-of-type(${columnNumber})::after { \
                        content: '\\25b2'; \
                  }`, 2
            )
      } else {
            document.styleSheets[document.styleSheets.length - 1].insertRule(
                  `table.sortable thead tr th:nth-of-type(${columnNumber})::after { \
                        content: '\\25bc'; \
                  }`, 2
            )
      };
      // DDOES: 
      tableData.sort(function (a, b) {
            if (isNaN(parseFloat(a[sortIndex])) === false) {
                  return (a[sortIndex] - b[sortIndex]) * sortDirection;
            } else {
                  var astring = a[sortIndex];
                  var bstring = b[sortIndex];

                  if (bstring > astring) return -sortDirection;
                  if (bstring < astring) return sortDirection;
                  return 0;
            }
      });
      // DFUNC:
      writeTableData();
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