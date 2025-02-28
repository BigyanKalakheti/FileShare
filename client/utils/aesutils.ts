import CryptoJS from "crypto-js";



// export function decryptFile(cipherText: string, key: string): Uint8Array {
//     const decrypted = CryptoJS.AES.decrypt(cipherText, CryptoJS.enc.Utf8.parse(key), {
//       mode: CryptoJS.mode.CBC,
//       padding: CryptoJS.pad.Pkcs7,
//       iv: CryptoJS.enc.Utf8.parse("1234567890123456"), // Ensure IV matches encryption
//     });
  
//     // Convert WordArray to Uint8Array (Fixed)
//     return new Uint8Array(decrypted.words.length * 4).map(
//       (_, i) => (decrypted.words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff
//     );
//   }
  
export function encryptFile(fileBuffer: ArrayBuffer, key: string): string {
  const wordArray = CryptoJS.lib.WordArray.create(new Uint8Array(fileBuffer)); // Convert to WordArray
  const encrypted = CryptoJS.AES.encrypt(wordArray, CryptoJS.enc.Utf8.parse(key), {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv: CryptoJS.enc.Utf8.parse("1234567890123456"), // 16-byte IV (change in production)
  });
  return encrypted.toString();
}


export function decryptFile(cipherText: string, key: string): Uint8Array {
  const decrypted = CryptoJS.AES.decrypt(cipherText, CryptoJS.enc.Utf8.parse(key), {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv: CryptoJS.enc.Utf8.parse("1234567890123456"),
  });

  return wordArrayToUint8Array(decrypted);
}

// Helper function to convert CryptoJS WordArray to Uint8Array
function wordArrayToUint8Array(wordArray: CryptoJS.lib.WordArray): Uint8Array {
  const words = wordArray.words;
  const sigBytes = wordArray.sigBytes;
  const u8 = new Uint8Array(sigBytes);

  for (let i = 0; i < sigBytes; i++) {
    u8[i] = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
  }

  return u8;
}
