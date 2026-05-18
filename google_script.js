/**
 * GOOGLE APPS SCRIPT FOR LOCUS CAFE
 * 
 * 1. Open your Google Sheet.
 * 2. Go to Extensions > Apps Script.
 * 3. Delete any existing code and paste this entire file.
 * 4. Update the SHEET_NAMES below if your sheet names differ.
 * 5. Click "Deploy" > "New Deployment" (Top Right).
 * 6. Select "Web app" as the type.
 * 7. Set "Execute as" to "Me".
 * 8. Set "Who has access" to "Anyone".
 * 9. Click Deploy, Authorize access, and copy the Web App URL.
 * 10. Paste the URL into the SCRIPT_URL variable in KitchenDashboard.jsx & ReceptionDashboard.jsx.
 */

const RESERVATION_SHEET_NAME = "Form Responses 1"; // Make sure this matches your Reservation sheet tab
const ORDERS_SHEET_NAME = "Orders"; // Make sure you have a sheet tab named "Orders" for the billing/kitchen

function doGet(e) {
  try {
    const action = e.parameter.action;
    
    if (action === 'getDashboardData') {
      return ContentService.createTextOutput(JSON.stringify({
        reservations: getReservations(),
        orders: getOrders()
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ error: 'Invalid action' })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ error: error.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const action = data.action;
    
    if (action === 'updateOrderStatus') {
      return updateOrderStatus(data);
    } else if (action === 'updatePaymentStatus') {
      return updatePaymentStatus(data);
    } else if (action === 'createOrder') {
      return createOrder(data);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'Invalid action' })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

function createOrder(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ORDERS_SHEET_NAME);
  if (!sheet) return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'Sheet not found' })).setMimeType(ContentService.MimeType.JSON);
  
  const timestamp = new Date().toISOString();
  // Columns: A=Timestamp, B=Table, C=Items, D=Total, E=Status, F=PaidStatus, G=CustomerName
  sheet.appendRow([timestamp, data.tableNo || 'Walk-in', data.items, data.totalAmount, 'New', 'Unpaid', data.name || '']);
  
  return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
}

function getReservations() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(RESERVATION_SHEET_NAME);
  if (!sheet) return [];
  
  const data = sheet.getDataRange().getDisplayValues(); // getDisplayValues formats dates nicely
  const reservations = [];
  
  // Start from row 1 (skipping header row 0)
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (!row[0]) continue; // Skip empty rows
    
    reservations.push({
      timestamp: row[0] || '',
      name: row[1] || '',
      phone: row[2] || '',
      people: row[3] || '',
      date: row[4] || '',
      time: row[5] || '',
      tableNo: row[6] || ''
    });
  }
  return reservations.reverse(); // Newest first
}

function getOrders() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ORDERS_SHEET_NAME);
  if (!sheet) return [];
  
  const data = sheet.getDataRange().getDisplayValues();
  const orders = [];
  
  // Assuming Columns: A=Timestamp, B=Table, C=Items, D=Total, E=Status, F=PaidStatus
  // Start from row 1 (skipping header row 0)
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (!row[0]) continue; 
    
    orders.push({
      rowId: i + 1, // Store the exact row number for updates
      timestamp: row[0] || '',
      tableNo: row[1] || '',
      items: row[2] || '',
      totalAmount: row[3] || '',
      status: row[4] || 'New',
      paidStatus: row[5] || 'Unpaid'
    });
  }
  return orders.reverse(); // Newest first
}

function updateOrderStatus(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ORDERS_SHEET_NAME);
  if (!sheet) return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'Sheet not found' })).setMimeType(ContentService.MimeType.JSON);
  
  const rowId = data.rowId;
  const newStatus = data.status;
  
  // Assuming Status is Column E (5)
  sheet.getRange(rowId, 5).setValue(newStatus); 
  
  return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
}

function updatePaymentStatus(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(ORDERS_SHEET_NAME);
  if (!sheet) return ContentService.createTextOutput(JSON.stringify({ success: false, error: 'Sheet not found' })).setMimeType(ContentService.MimeType.JSON);
  
  const rowId = data.rowId;
  const newStatus = data.paidStatus;
  
  // Assuming Paid Status is Column F (6)
  sheet.getRange(rowId, 6).setValue(newStatus); 
  
  return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
}

// Function to handle CORS options request from React
function doOptions(e) {
  return ContentService.createTextOutput("")
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Trigger this function on Form Submit to send a confirmation email.
 * 1. Go to Triggers (the clock icon on the left panel in Apps Script)
 * 2. Click "Add Trigger"
 * 3. Choose which function to run: onFormSubmit
 * 4. Select event source: From spreadsheet
 * 5. Select event type: On form submit
 * 6. Save!
 */
function onFormSubmit(e) {
  try {
    const responses = e.namedValues;
    if (!responses) return;
    
    // Extract fields (using Google Form header names)
    const email = responses['Email'] ? responses['Email'][0] : null;
    const name = responses['Name'] ? responses['Name'][0] : 'Guest';
    const date = responses['DATE'] ? responses['DATE'][0] : '';
    const time = responses['TIME'] ? responses['TIME'][0] : '';
    const tableNo = responses['TABLE NO'] ? responses['TABLE NO'][0] : 'Not specified';
    
    if (email) {
      const subject = "Reservation Confirmed - Cafe Locus";
      const body = `Hi ${name},\n\nYour reservation at Cafe Locus is confirmed!\n\nDate: ${date}\nTime: ${time}\nTable No: ${tableNo}\n\nWe look forward to hosting you.\n\nBest,\nThe Cafe Locus Team`;
      
      MailApp.sendEmail(email, subject, body);
    }
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
