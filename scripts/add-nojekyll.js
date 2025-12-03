const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '..', 'out');
const filePath = path.join(outDir, '.nojekyll');

try {
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }
  fs.writeFileSync(filePath, '');
  console.log('Created out/.nojekyll');
} catch (err) {
  console.error('Failed to create out/.nojekyll', err);
  process.exit(1);
}


