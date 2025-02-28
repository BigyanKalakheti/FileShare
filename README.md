# 📁 P2P Secure File Sharing

A cryptographically secure peer-to-peer (P2P) file-sharing application using **WebRTC**, **AES encryption**, **RC4 stream cipher**, and **ECC** for secure file transfers.

## 🚀 Features

- 🔒 **End-to-End Encryption**: Uses **AES** for file encryption and **ECC** for secure key exchange.
- 📡 **Peer-to-Peer Communication**: No central server needed for file transfers.
- 🔑 **Real-time Encrypted Messaging**: Uses **RC4** to encrypt and decrypt chat messages.
- 📜 **WebRTC Integration**: Ensures direct peer-to-peer connectivity.
- 🔌 **Socket.io for Signaling**: Establishes a connection between peers.

## 📦 Tech Stack

- **Frontend**: React, Next.js
- **Backend**: Node.js, Socket.io
- **Encryption**: AES (Block Cipher), RC4 (Stream Cipher), ECC (Elliptic Curve Cryptography)
- **Peer-to-Peer Communication**: WebRTC

## 🛠 Installation

1. Clone the repository:

   ```git clone https://github.com/BigyanKalakheti/FileShare.git```
   ```cd FileShare ```

2. Install dependencies:

``npm install``

3. Set up environment variables:

Create a .env file in the root directory:
    ```NEXT_PUBLIC_SOCKET_SERVER_URL=<your_socket_server_url>```

4. Start the application:
    ```npm run dev```

## 🚀 Encryption Workflow
Key Exchange:
ECC is used for exchanging AES encryption keys securely.
File Encryption:
Files are encrypted using AES-256 before transmission.
Message Encryption:
Chat messages are encrypted using RC4 before being sent over the network.