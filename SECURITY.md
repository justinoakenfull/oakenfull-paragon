# GitHub Token Security Guide

## Overview
This guide explains how we obfuscate the GitHub Personal Access Token using basic encryption with local files.

## ⚠️ Important Security Note
**Client-side encryption is NOT truly secure** - it only provides obfuscation. Anyone with access to your built JavaScript can potentially extract the token. For production applications, consider backend-based solutions.

### Current Implementation
The current implementation uses simple XOR encryption which is:
- ✅ TypeScript compatible with all target configurations
- ✅ No external dependencies
- ✅ Fast and lightweight
- ✅ Sufficient for token obfuscation

## Simple Client-Side Encryption (Implemented)

### Setup
1. Generate an encryption key:
```bash
# Generate a random key
openssl rand -base64 32
```

2. Add to your `.env` file:
```bash
REACT_APP_ENCRYPTION_KEY=your-generated-key-here
REACT_APP_GITHUB_TOKEN=your-encrypted-token-here
```

3. Encrypt your token:
```bash
node scripts/encrypt-token.js ghp_your_actual_github_token_here
```

### How it works
- Your GitHub token is XOR encrypted with a key
- The encrypted token is stored in environment variables
- The app decrypts it at runtime

### Security Measures Applied
1. **Token Encryption**: XOR encryption with environment key
2. **Error Handling**: Graceful failure if decryption fails
3. **Rate Limiting**: Already implemented
4. **Request Cancellation**: Prevents token exposure in network logs

### Usage
```bash
# Encrypt your token
node scripts/encrypt-token.js ghp_your_token_here

# The script will output the encrypted token to add to your .env file
```

## Best Practices

1. **Never commit tokens to version control**
2. **Use different tokens for different environments**
3. **Set minimal required permissions on tokens**
4. **Rotate tokens regularly**
5. **Consider using GitHub Apps for production**
6. **Monitor token usage in GitHub settings**

## Environment Variables Needed
```bash
# .env
REACT_APP_GITHUB_TOKEN=encrypted_token_here
REACT_APP_ENCRYPTION_KEY=your_encryption_key_here
```

## Testing
After setup, test that the encryption works:
```bash
npm start
# Check browser console for any decryption errors
```

Remember: This is obfuscation, not true security. For production apps, implement a backend proxy or use GitHub Apps.
