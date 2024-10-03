function myFunction() {
  // Sorts all data
  var sheet = SpreadsheetApp.getActiveSheet(); 
  var row = sheet.getRange("A2"); 
  var lastColumn = sheet.getLastColumn();
  var range = row.offset(0, 0, 1, lastColumn);
  
  var cells = range.getValues()[0]; 
  var teamCell = sheet.getRange("A11").getValue();
  var nameCell = sheet.getRange("A8").getValue();
  var teamNameCell = sheet.getRange("A14").getValue();
  var qualCell = sheet.getRange("A17").getValue();
  var dataRange = sheet.getRange("A20:A").getValues().filter(String);
  var dataCell1 = dataRange.join("\n");
  for (var i = 0; i < cells.length; i++) {
    Logger.log(i);
    if (cells[i] === teamCell) { 
    var columnIndex = i + 1;
    var numRows = sheet.getLastRow() - 1; // subtract 1 to exclude header row
    var columnRange = sheet.getRange(2, columnIndex, numRows, 1);
    Logger.log(columnRange);
    var lastCell = columnRange.getValues().filter(String).length;
    var nextCell = columnRange.offset(lastCell, 0, 1, 1);
    nextCell.setValue("Qual " + qualCell + " (" + nameCell + ")");
    var adjacentCell = nextCell.offset(0, 1, 1, 1);
    adjacentCell.setValue(dataCell1);
    //sheet.deleteColumn(1);
    var columnA = sheet.getRange("A:A");
    columnA.clearContent();
    return;
    }
  }

  var columnA = sheet.getRange("A1:1");
  columnA.clearContent();

  var startColumnIndex = 12;
  var teams = sheet.getRange(1, startColumnIndex, 1, sheet.getLastColumn() - startColumnIndex + 1).getValues()[0];
  var lastTeamColumnIndex = startColumnIndex + teams.lastIndexOf("") - 1;
  if (lastTeamColumnIndex < startColumnIndex) {
    lastTeamColumnIndex = startColumnIndex;
  }
  var newTeamColumnIndex = lastTeamColumnIndex + 3;
  
  var rowIndex = range.getRow();
  var cell = sheet.getRange(rowIndex, newTeamColumnIndex);
  cell.setValue(teamCell);
  var adjacentCell = cell.offset(0, 1);
  adjacentCell.setValue(teamNameCell);


  rowIndex += 1;
  var dataCellColumnIndex = newTeamColumnIndex + 1;
  var dataCellRow = rowIndex;
  var dataCell = sheet.getRange(dataCellRow, dataCellColumnIndex);
  dataCell.setValue(dataCell1);
  var adjacentCell = dataCell.offset(0, -1);
  adjacentCell.setValue("Qual " + qualCell + " (" + nameCell + ")");
}
