const fs = require("fs");

// scrapp data export
module.exports = function exportData(data, filename = "output.json") {
  fs.writeFileSync(filename, JSON.stringify({ content: data }, null, 2));
  console.log("Data exported to", filename);
};
