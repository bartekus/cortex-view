import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const REQUIRED_FILES = [
    'src/root.tsx',
    'src/routes.ts',
    'src/entry.client.tsx',
    'src-tauri/tauri.conf.json',
    'spec/features.yaml'
];

console.log('Verifying repository contract...');

let missing = 0;
for (const file of REQUIRED_FILES) {
    if (!fs.existsSync(path.resolve(process.cwd(), file))) {
        console.error(`❌ Missing: ${file}`);
        missing++;
    } else {
        console.log(`✅ Found: ${file}`);
    }
}

if (missing > 0) {
    console.error(`Repository contract failed. ${missing} files missing.`);
    process.exit(1);
} else {
    console.log('Repository contract satisfied.');
    process.exit(0);
}
