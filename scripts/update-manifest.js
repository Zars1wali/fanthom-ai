import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const manifestPath = path.join(__dirname, '../src/routes/manifest.ts');
let content = fs.readFileSync(manifestPath, 'utf8');
content = content.replace(/status:\s*'planned'/g, "status: 'built'");
fs.writeFileSync(manifestPath, content, 'utf8');
console.log('Manifest statuses updated successfully to built.');
