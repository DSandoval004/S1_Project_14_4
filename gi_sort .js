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
// DVARG: Global variable to be used throughout th project
var tableData = [],
      dataCategories = [],
      sortIndex = 0,
      sortDirection = 1;
// DDOES: Event listener to run anonumous function when the page is loaded
window.addEventListener('load', function () {
      // DFUNC: Function to be run
      defineDataArray();
      writeTableData();
      defineColumns();
});
// DFUNC: Stores the table and sorts it
function defineDataArray() {
      // DVARA: Gets all the table rows in the sortable table
      var tableRows = document.querySelectorAll('table.sortable tbody tr');
      // DLOOP: Loops through the tableRow array
      for (var i = 0; i < tableRows.length; i++) {
            // DVARL: Local variable for the for loop
            var rowCells = tableRows[i].children,
                  rowValues = [];
            // DLOOP: Loops through the rowCells array
            for (var k = 0; k < rowCells.length; k++) {
                  // DVARS: Gets the cell text of the rowCells array
                  var cellText = rowCells[k].textContent;
                  // DVARA: Adds the cellText to the rowValues array
                  rowValues.push(cellText);
            }
            // DVARA: Adds the rowValues array to the tableData array
            tableData.push(rowValues);
      }
      // DVARA: Sorts the tableData array
      tableData.sort(dataSort2D);
};
// DFUNC: Function to write out the table
function writeTableData() {
      // DVARL: local variables to be used in the function
      var newTableBody = document.createElement('tbody'),
            tbody = document.getElementById('sortable').childNodes[7];
      // DLOOP: loops through the tableData array
      for (var tr = 0; tr < tableData.length; tr++) {
            // DVARO: Creates the tr element
            var trN = document.createElement('tr');
            // DLOOP: Loops through the tableData array's array
            for (var td = 0; td < tableData[tr].length; td++) {
                  // DVARL: Local variable for this loop
                  var tdN = document.createElement('td'),
                        tdText = tableData[tr][td];
                  // DDOES: Applies the tdText to the tdN element
                  tdN.innerHTML = tdText;
                  // DVARO: Adds the tdN elment as a child to the trN element
                  trN.appendChild(tdN)
            }
            // DDOES: Adds the trN elment as a child to the newTableBody element
            newTableBody.appendChild(trN)
      }
      // DDOES: gets the sortable table and replaces it's tbody with the newTableBody
      document.getElementById('sortable').replaceChild(newTableBody, tbody);
};
// DFUNC: creates the style for the columns
function defineColumns() {
      // DVARL: local vriables for the function
      var styleSheets = document.createElement('style'),
            thInThePage = document.querySelectorAll('table.sortable thead tr th');
      // DDOES: Applies the stylesheet to the head of the documnent
      document.head.appendChild(styleSheets);
      // DDOES: Creates style for the new stylesheet and applies them
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
      // DLOOP: Loops through the th in the page
      for (var i = 0; i < thInThePage.length; i++) {
            // DVARS: gets the HTML from the nodes
            var thText = thInThePage[i].innerHTML
            // DVARA: adds the thText to the dataCategories array
            dataCategories.push(thText);
            // DDOES: When the th are clicked on the browser runs the function columnSort
            thInThePage[i].addEventListener('click', columnSort);
      }
};
// DFUNC: sorts the table based on the column selected
function columnSort(e) {
      // DVARL: Local variables for the columnSort function
      var columnText = e.target.innerHTML,
            columnIndex = dataCategories.indexOf(columnText),
            columnNumber = columnIndex + 1;
      // DIFDO: if the columnIndex matches sortIndex it then multiples sortDirection by -1, if not it sets the sortIndex equal to columnIndex
      if (columnIndex == sortIndex) {
            sortDirection *= -1;
      } else {
            sortIndex = columnIndex;
      }
      // DDOES: Deletes the last styleRule in the stylesheet
      document.styleSheets[document.styleSheets.length - 1].deleteRule(2);
      // DIFDO: if sorDirction equals 1 it inserts a stylerule, else it inserts a different styleRule
      if (sortDirection == 1) {
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
      // DDOES: Sorts the tableData array with the dataSort2D as the callback function
      tableData.sort(dataSort2D);
      // DFUNC: runs the writeTableData function
      writeTableData();
};
// DFUNC: code given to us by the book
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