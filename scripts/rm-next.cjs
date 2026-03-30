/**
 * Delete `.next` (cross-platform). Use when dev fails with EPERM on Windows
 * (OneDrive / AV locking files under the repo).
 */
const fs = require("fs");
const path = require("path");

const nextDir = path.join(__dirname, "..", ".next");
if (fs.existsSync(nextDir)) {
  fs.rmSync(nextDir, { recursive: true, force: true });
  process.stdout.write("Removed .next\n");
}
