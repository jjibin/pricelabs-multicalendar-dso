const fs = require("fs");
const path = require("path");

const reportsDir = "cypress/reports/mochawesome";

fs.readdirSync(reportsDir).forEach((file) => {
  const filePath = path.join(reportsDir, file);
  if (file.endsWith(".json")) {
    const content = fs.readFileSync(filePath, "utf8").trim();
    if (!content || content === "{}") {
      console.log(`Deleting empty or invalid file: ${filePath}`);
      fs.unlinkSync(filePath);
    }
  }
});
console.log("Empty or invalid reports cleaned successfully.");
