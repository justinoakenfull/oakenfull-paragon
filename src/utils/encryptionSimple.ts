// Simple and compatible encryption utility

const ENCRYPTION_KEY = process.env.REACT_APP_ENCRYPTION_KEY;

if (!ENCRYPTION_KEY) {
    throw new Error("Encryption key is not set");
}

export const encryptTokenSimple = (token: string): string => {
    let encrypted = '';
    for (let i = 0; i < token.length; i++) {
        const keyChar = ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
        const tokenChar = token.charCodeAt(i);
        encrypted += String.fromCharCode(tokenChar ^ keyChar);
    }
    return btoa(encrypted);
};

export const decryptTokenSimple = (encryptedToken: string): string => {
    try {
        const encrypted = atob(encryptedToken);
        let decrypted = '';
        for (let i = 0; i < encrypted.length; i++) {
            const keyChar = ENCRYPTION_KEY.charCodeAt(i % ENCRYPTION_KEY.length);
            const encryptedChar = encrypted.charCodeAt(i);
            decrypted += String.fromCharCode(encryptedChar ^ keyChar);
        }
        return decrypted;
    } catch (error) {
        throw new Error('Failed to decrypt token');
    }
};

// Test function to verify encryption/decryption works
export const testEncryption = (testToken: string): boolean => {
    try {
        const encrypted = encryptTokenSimple(testToken);
        const decrypted = decryptTokenSimple(encrypted);
        return decrypted === testToken;
    } catch (error) {
        return false;
    }
};

// Export the simple version as the default
export const encryptToken = encryptTokenSimple;
export const decryptToken = decryptTokenSimple;
