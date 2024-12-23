const fs = require("fs");
const path = require("path");

const reportsDir = "cypress/reports/mocha";

fs.readdirSync(reportsDir).forEach((file) => {
  const filePath = path.join(reportsDir, file);
  if (file.endsWith(".json")) {
    const content = fs.readFileSync(filePath, "utf8").trim();
    try {
      JSON.parse(content); // Validate JSON syntax
      console.log(`Valid file: ${filePath}`);
    } catch {
      console.log(`Invalid file detected: ${filePath}. Deleting...`);
      fs.unlinkSync(filePath); // Delete invalid files
    }
  }
});
console.log("Validation complete.");
