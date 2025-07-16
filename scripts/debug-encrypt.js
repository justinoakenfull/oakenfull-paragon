#!/usr/bin/env node

// Debug version of the encryption script
// Usage: node scripts/debug-encrypt.js YOUR_GITHUB_TOKEN

const fs = require('fs');
const path = require('path');

console.log('Debug Information:');
console.log('Current working directory:', process.cwd());
console.log('Script location:', __dirname);

// Load environment variables from .env.local
function loadEnvFile() {
    const envPath = path.join(__dirname, '..', '.env.local');
    console.log('Looking for .env.local at:', envPath);

    if (fs.existsSync(envPath)) {
        console.log('.env.local file found');
        const envContent = fs.readFileSync(envPath, 'utf8');
        console.log('File content:');
        console.log(envContent);
        console.log('---');

        const lines = envContent.split('\n');
        for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
                const [key, ...valueParts] = trimmed.split('=');
                const value = valueParts.join('=');
                process.env[key] = value;
                console.log(`Set ${key} = ${value.substring(0, 10)}...`);
            }
        }
    } else {
        console.log('.env.local file not found');
    }
}

// Load environment variables
loadEnvFile();

const ENCRYPTION_KEY = process.env.REACT_APP_ENCRYPTION_KEY;

console.log('\nEncryption Key Info:');
console.log('Key exists:', !!ENCRYPTION_KEY);
console.log('Key type:', typeof ENCRYPTION_KEY);
console.log('Key length:', ENCRYPTION_KEY ? ENCRYPTION_KEY.length : 'N/A');
console.log('Key preview:', ENCRYPTION_KEY ? ENCRYPTION_KEY.substring(0, 10) + '...' : 'N/A');

// Get token from command line arguments
const token = process.argv[2];

console.log('\nToken Info:');
console.log('Token provided:', !!token);
console.log('Token type:', typeof token);
console.log('Token length:', token ? token.length : 'N/A');
console.log('Token preview:', token ? token.substring(0, 10) + '...' : 'N/A');

if (!token) {
    console.error('\nNo token provided');
    console.error('Usage: node scripts/debug-encrypt.js YOUR_GITHUB_TOKEN');
    process.exit(1);
}

if (!ENCRYPTION_KEY) {
    console.error('\nNo encryption key found');
    process.exit(1);
}

console.log('\nAttempting encryption...');

try {
    function encryptToken(token) {
        let encrypted = '';
        for (let i = 0; i < token.length; i++) {
            const keyChar = ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
            const tokenChar = token.charCodeAt(i);
            encrypted += String.fromCharCode(tokenChar ^ keyChar);
        }
        return Buffer.from(encrypted).toString('base64');
    }

    const encrypted = encryptToken(token);
    console.log('Encryption successful');
    console.log('Encrypted token:', encrypted);
} catch (error) {
    console.error('Encryption failed:', error.message);
    console.error('Stack:', error.stack);
}
