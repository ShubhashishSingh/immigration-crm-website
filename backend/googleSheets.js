const { google } = require("googleapis");

const auth = new google.auth.GoogleAuth({
  keyFile: "google-sheet-key.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});

async function addLeadToSheet(data) {
  const client = await auth.getClient();

  const sheets = google.sheets({
    version: "v4",
    auth: client
  });

  await sheets.spreadsheets.values.append({
    spreadsheetId: "1lqRLc-oeQ4fs_lPqEXmOicjg8jxc76BR60p4ry4K5mk",
    range: "Sheet1!A:I",
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [[
        new Date().toLocaleString(),
        data.type || "",
        data.name || "",
        data.phone || "",
        data.email || "",
        data.service || "",
        data.country || "",
        data.message || "",
        data.cv || ""
      ]]
    }
  });
}

module.exports = addLeadToSheet;