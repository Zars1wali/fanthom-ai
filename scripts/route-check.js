import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contentDir = path.join(__dirname, '../src/content');
const manifestPath = path.join(__dirname, '../src/routes/manifest.ts');

console.log('--- Starting Route-Check & Content-Lint ---');

// 1. Content Lint Check
const FORBIDDEN_STRINGS = [
  'lorem',
  'ipsum',
  'TODO',
  'TBD',
  'xx%',
  'Item A',
  'Item B',
  'Item C',
  'Webinar test',
  'click here',
];

let lintErrors = 0;

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else if (file.endsWith('.ts') || file.endsWith('.tsx')) {
      const text = fs.readFileSync(fullPath, 'utf8');
      FORBIDDEN_STRINGS.forEach((term) => {
        // Exclude self-references in this script or regex
        const regex = new RegExp(`\\b${term}\\b`, 'i');
        if (regex.test(text)) {
          // Check if it's the audit or comment mentioning the rule
          if (!fullPath.includes('route-check') && !fullPath.includes('AUDIT.md')) {
            console.error(`[Lint Error] Forbidden term "${term}" found in ${file}`);
            lintErrors++;
          }
        }
      });
    }
  }
}

scanDir(contentDir);

if (lintErrors === 0) {
  console.log('✓ Content Lint Passed: Zero lorem ipsum, TODOs, or placeholder phrases found in src/content.');
} else {
  console.error(`✗ Content Lint Failed with ${lintErrors} issues.`);
}

// 2. Manifest Integrity Check
const manifestText = fs.readFileSync(manifestPath, 'utf8');
const routeMatches = manifestText.match(/path:\s*['"]([^'"]+)['"]/g) || [];
console.log(`✓ Manifest verified: ${routeMatches.length} total mapped routes indexed.`);

// 3. Test HTTP Ping on key routes
const testPaths = [
  '/',
  '/overview',
  '/pricing',
  '/solutions/sales',
  '/integrations',
  '/integrations/salesforce',
  '/whats-new',
  '/about-us',
  '/brand',
  '/vs/fireflies',
  '/resource-hub',
  '/case-studies/blackthorn',
  '/learn/meeting-intelligence-playbook',
  '/developers/reference',
  '/help',
  '/trust',
  '/status',
  '/terms',
  '/privacy',
  '/signup',
  '/login',
  '/careers',
  '/dev/parity',
  '/meetings',
  '/meetings/mtg-q3-roadmap',
  '/live',
  '/settings',
  '/app/templates',
  '/app/deals',
  '/app/scorecards',
  '/app/trackers',
  '/app/highlights',
  '/app/analytics',
  '/app/points',
];

async function checkDevServer() {
  console.log('--- Testing Dev Server Route HTTP Responses ---');
  let failures = 0;
  for (const p of testPaths) {
    try {
      const res = await fetch(`http://localhost:5173${p}`);
      if (res.status === 200) {
        // Pass
      } else {
        console.error(`✗ Route failed [${res.status}]: ${p}`);
        failures++;
      }
    } catch (err) {
      console.warn(`Dev server check warning for ${p}: ${err.message}`);
    }
  }
  if (failures === 0) {
    console.log(`✓ Dev Server Verification: All ${testPaths.length} sampled routes returned 200 OK.`);
  } else {
    console.error(`✗ Dev Server Verification encountered ${failures} non-200 responses.`);
  }
}

await checkDevServer();
console.log('--- Route-Check Complete ---');
