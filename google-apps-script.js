// Replace this with your Google Sheet ID
// You can get this from your sheet's URL: https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';

// Handle CORS preflight requests
function doOptions(e) {
  return ContentService.createTextOutput()
    .setMimeType(ContentService.MimeType.JSON)
    .setContent(JSON.stringify({ status: 'success' }))
    .addHeader('Access-Control-Allow-Origin', '*')
    .addHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    .addHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function doPost(e) {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  
  // Add a new row with the submission data
  sheet.appendRow([
    data.timestamp,
    data.name,
    data.email,
    data.imageUrl,
    data.mailingList
  ]);
  
  // Get the last row number
  const lastRow = sheet.getLastRow();
  
  // Add the image formula to display the image in the sheet
  const imageCell = sheet.getRange(lastRow, 4); // Column D (4) for the image
  const imageFormula = `=IMAGE("${data.imageUrl}")`;
  imageCell.setFormula(imageFormula);
  
  // Adjust row height to better display the image
  sheet.setRowHeight(lastRow, 100);
  
  // Return response with CORS headers
  return ContentService.createTextOutput(JSON.stringify({ status: 'success' }))
    .setMimeType(ContentService.MimeType.JSON)
    .addHeader('Access-Control-Allow-Origin', '*');
}
