#!/usr/bin/env node

// Token encryption utility script
// Usage: node scripts/encrypt-token.js YOUR_GITHUB_TOKEN

const fs = require('fs');
const path = require('path');

// Load environment variables from .env.local
function loadEnvFile() {
    const envPath = path.join(__dirname, '..', '.env.local');
    if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        const lines = envContent.split('\n');
        for (const line of lines) {
            const trimmed = line.trim();
            if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
                const [key, ...valueParts] = trimmed.split('=');
                const value = valueParts.join('=');
                process.env[key] = value;
            }
        }
    }
}

// Load environment variables
loadEnvFile();

const ENCRYPTION_KEY = process.env.REACT_APP_ENCRYPTION_KEY;

// Check if encryption key is available
if (!ENCRYPTION_KEY) {
    console.error('REACT_APP_ENCRYPTION_KEY not found in .env.local file');
    console.error('Please make sure you have REACT_APP_ENCRYPTION_KEY set in your .env.local file');
    process.exit(1);
}

if (ENCRYPTION_KEY.length < 8) {
    console.error('Encryption key seems too short. Please use a longer key.');
    process.exit(1);
}

function encryptToken(token) {
    if (!token || typeof token !== 'string') {
        throw new Error('Token must be a non-empty string');
    }
    if (!ENCRYPTION_KEY || typeof ENCRYPTION_KEY !== 'string') {
        throw new Error('Encryption key must be a non-empty string');
    }

    let encrypted = '';
    for (let i = 0; i < token.length; i++) {
        const keyChar = ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
        const tokenChar = token.charCodeAt(i);
        encrypted += String.fromCharCode(tokenChar ^ keyChar);
    }
    return Buffer.from(encrypted).toString('base64');
}

function decryptToken(encryptedToken) {
    try {
        if (!encryptedToken || typeof encryptedToken !== 'string') {
            throw new Error('Encrypted token must be a non-empty string');
        }
        if (!ENCRYPTION_KEY || typeof ENCRYPTION_KEY !== 'string') {
            throw new Error('Encryption key must be a non-empty string');
        }

        const encrypted = Buffer.from(encryptedToken, 'base64').toString();
        let decrypted = '';
        for (let i = 0; i < encrypted.length; i++) {
            const keyChar = ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
            const encryptedChar = encrypted.charCodeAt(i);
            decrypted += String.fromCharCode(encryptedChar ^ keyChar);
        }
        return decrypted;
    } catch (error) {
        throw new Error('Failed to decrypt token: ' + error.message);
    }
}

// Get token from command line arguments
const token = process.argv[2];

if (!token) {
    console.error('Usage: node scripts/encrypt-token.js YOUR_GITHUB_TOKEN');
    process.exit(1);
}

if (token.length < 10) {
    console.error('Token seems too short. Please provide a valid GitHub token.');
    process.exit(1);
}

console.log('Encrypting GitHub token...\n');

try {
    const encrypted = encryptToken(token);
    console.log('Encrypted token:');
    console.log(encrypted);
    console.log('\n Add this to your .env file:');
    console.log(`REACT_APP_GITHUB_TOKEN=${encrypted}`);
    console.log(`REACT_APP_ENCRYPTION_KEY=${ENCRYPTION_KEY}`);

    // Verify it can be decrypted
    const decrypted = decryptToken(encrypted);
    if (decrypted === token) {
        console.log('\nVerification successful - token can be decrypted correctly');
    } else {
        console.log('\nVerification failed - decryption mismatch');
    }
} catch (error) {
    console.error('Encryption failed:', error.message);
    process.exit(1);
}
