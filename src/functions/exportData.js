// import file system
import fs from "fs";

// scrapp data export
export function exportData(data, filename = "output.json") {
  fs.writeFileSync(filename, JSON.stringify({ content: data }, null, 2));
  console.log("Data exported to", filename);
};