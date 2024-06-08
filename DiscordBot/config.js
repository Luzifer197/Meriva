const crypto = require('crypto');

// Verschlüsselungsschlüssel (z. B. aus Umgebungsvariable oder Konstante)
const encryptionKey = process.env.ENCRYPTION_KEY || 'myencryptionkey';

// Funktion zum Verschlüsseln des Tokens
function encryptToken(token) {
    const cipher = crypto.createCipher('aes-256-cbc', encryptionKey);
    let encryptedToken = cipher.update(token, 'utf8', 'hex');
    encryptedToken += cipher.final('hex');
    return encryptedToken;
}

// Funktion zum Entschlüsseln des Tokens
function decryptToken(encryptedToken) {
    const decipher = crypto.createDecipher('aes-256-cbc', encryptionKey);
    let decryptedToken = decipher.update(encryptedToken, 'hex', 'utf8');
    decryptedToken += decipher.final('utf8');
    return decryptedToken;
}

// Exportiere die verschlüsselten Tokens
module.exports = {
    DISCORD_TOKEN: "f7a9fc776a84afa158e1126dd4f70f269acbb263d6d69541bf4eb2fc403b298f26aeacc43c44955330b327c10e2337c108f237ef0a61c218b5963202d8308cd8fe30736d79e27416bcc068c2741f91a6",
    CLIENTSECRET: "04f5ba49facd7db35f1df1002e258e2d753de6a00f328d957c704ccc7e2fcd830609f968b1acc6340dbb33f353f20b27",
    CLIENTID: "2c5bd3894bd568def76ef8640cf22821650f162a142eccc0615c3a6588a63295",
    BOTURL: "https://discord.com/oauth2/authorize?client_id=1249092102659506279&permissions=8&integration_type=0&scope=bot",
    APPID: "2c5bd3894bd568def76ef8640cf22821650f162a142eccc0615c3a6588a63295",
    PUBLICKEY: "123a3b6390f99e8b1146468f294ed236ea1a889ee119049eaeed6798300de93fdb8337846ab244817472c7fdeac68abeba04426ce02620aea626db2a3e2c59ac3915715d799f79ebf7ef0ee368ae80b5"
};
