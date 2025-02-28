import * as eccrypto from "eccrypto-js";

// Generate ECC Key Pair
export function generateKeyPair() {
    const privateKey = eccrypto.generatePrivate();
    const publicKey = eccrypto.getPublic(privateKey);
    return { privateKey, publicKey };
}

// Derive Shared Secret
export async function getSharedSecret(privateKey, remotePublicKey) {
    const receivedKey = new Uint8Array(remotePublicKey);
    const sharedSecret = await eccrypto.derive(privateKey, receivedKey);
    return Buffer.from(sharedSecret).toString("hex"); // Convert to hex string
}
