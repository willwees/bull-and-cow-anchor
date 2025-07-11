import { Keypair } from "@solana/web3.js";
import * as fs from "fs";
import bs58 from "bs58";

// Replace this with your base58 private key (from backpack, phantom, etc)
const PRIVATE_KEY = "YOUR_PRIVATE_KEY_HERE";

function generateKeypairFromBase58(privateKey: string): void {
  try {
    // Decode base58 private key to Uint8Array
    const secretKeyBytes = bs58.decode(privateKey);

    // Create keypair from the secret key bytes
    const keypair = Keypair.fromSecretKey(secretKeyBytes);

    // Create the secret key array (this is what Solana CLI format expects)
    const secretKeyArray = Array.from(keypair.secretKey);

    // Write to file as just the array
    const filename = "wallet-keypair.json";
    fs.writeFileSync(filename, JSON.stringify(secretKeyArray, null, 2));

    console.log("✅ Keypair converted successfully!");
    console.log("📁 Saved to:", filename);
    console.log("🔑 Public Key:", keypair.publicKey.toString());
    console.log("📝 Secret Key Array Length:", keypair.secretKey.length);
    console.log("📋 File format: Array of 64 numbers (Solana CLI compatible)");
  } catch (error) {
    console.error("❌ Error converting keypair:", error);
    console.error("💡 Make sure your private key is a valid base58 string");
  }
}

// Run the script
if (PRIVATE_KEY === "YOUR_PRIVATE_KEY_HERE") {
  console.log(
    "⚠️  Please replace PRIVATE_KEY with your actual base58 private key",
  );
  console.log("🔍 This can be from Phantom, Solflare, or any other wallet");
  console.log("📝 The output will be a JSON array compatible with Solana CLI");
} else {
  generateKeypairFromBase58(PRIVATE_KEY);
}