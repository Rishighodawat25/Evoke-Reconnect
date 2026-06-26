/**
 * EVOKE Reconnect – Google Apps Script Webhook
 * ═══════════════════════════════════════════════════════════════════════
 *
 * SETUP:
 * 1. Open Google Sheets → Extensions → Apps Script
 * 2. Paste this entire file
 * 3. Click Deploy → New Deployment → Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the Web App URL → paste into VITE_SHEETS_ENDPOINT in Vercel
 *
 * SHEET STRUCTURE (auto-created):
 * Sheet: "Analytics"
 *   Columns: Timestamp | Event | Slug | Data
 *
 * Sheet: "Responses"
 *   Columns: Timestamp | Slug | Response | Objection | WhatsApp Clicked
 *
 * ═══════════════════════════════════════════════════════════════════════
 */

const SPREADSHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();

function doPost(e) {
  try {
    const payload = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

    // Ensure sheets exist
    const analyticsSheet = getOrCreateSheet(ss, 'Analytics', [
      'Timestamp', 'Event', 'Slug', 'Data'
    ]);
    const responsesSheet = getOrCreateSheet(ss, 'Responses', [
      'Timestamp', 'Slug', 'Response', 'Objection', 'WhatsApp Clicked'
    ]);

    const ts = payload.timestamp || new Date().toISOString();

    // Log every event to Analytics
    analyticsSheet.appendRow([
      ts,
      payload.event,
      payload.slug,
      JSON.stringify(payload)
    ]);

    // For response/objection/whatsapp events – update Responses sheet
    if (['response', 'objection', 'whatsapp_click'].includes(payload.event)) {
      upsertResponse(responsesSheet, payload);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('EVOKE Reconnect Webhook is running.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function getOrCreateSheet(ss, name, headers) {
  let sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    sheet.appendRow(headers);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
  }
  return sheet;
}

function upsertResponse(sheet, payload) {
  const data = sheet.getDataRange().getValues();
  const slugCol = 1; // 0-indexed → column B (slug)

  // Find existing row for this slug
  for (let i = 1; i < data.length; i++) {
    if (data[i][slugCol] === payload.slug) {
      const row = i + 1;
      if (payload.event === 'response') {
        sheet.getRange(row, 3).setValue(payload.response);
      } else if (payload.event === 'objection') {
        sheet.getRange(row, 4).setValue(payload.objection);
      } else if (payload.event === 'whatsapp_click') {
        sheet.getRange(row, 5).setValue('Yes');
      }
      return;
    }
  }

  // No existing row → create one
  sheet.appendRow([
    payload.timestamp || new Date().toISOString(),
    payload.slug,
    payload.event === 'response' ? payload.response : '',
    payload.event === 'objection' ? payload.objection : '',
    payload.event === 'whatsapp_click' ? 'Yes' : '',
  ]);
}
